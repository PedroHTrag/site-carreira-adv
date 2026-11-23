import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPageMetadata,
  filterAndPaginateBlogPosts,
  parseRoute,
} from './router';
import {
  INITIAL_CONTACT_FORM,
  formatContactReceipt,
  hasContactErrors,
  validateContactForm,
} from './contactValidation';
import { filterTeamByArea, getSortedTeamMembers } from '../data/team';
import { PRACTICE_AREAS } from '../data/practiceAreas';
import { FIRM_INFO } from '../data/firm';

test('parseRoute resolves all friendly institutional, area, team, blog, and legal routes', () => {
  assert.deepEqual(parseRoute('/'), { page: 'home' });
  assert.deepEqual(parseRoute('/escritorio'), { page: 'office' });
  assert.deepEqual(parseRoute('/areas-de-atuacao'), { page: 'areas-index' });
  assert.deepEqual(parseRoute('/areas-de-atuacao/direito-civel'), {
    page: 'area-detail',
    slug: 'direito-civel',
  });
  assert.deepEqual(parseRoute('/areas-de-atuacao/direito-trabalhista'), {
    page: 'area-detail',
    slug: 'direito-trabalhista',
  });
  assert.deepEqual(parseRoute('/areas-de-atuacao/direito-previdenciario'), {
    page: 'area-detail',
    slug: 'direito-previdenciario',
  });
  assert.deepEqual(parseRoute('/equipe/carreira-socio'), {
    page: 'team-detail',
    slug: 'carreira-socio',
  });
  assert.deepEqual(parseRoute('/equipe/socia-previdenciario'), {
    page: 'team-detail',
    slug: 'socia-previdenciario',
  });
  assert.deepEqual(parseRoute('/blog/planejamento-previdenciario-aposentadoria-inss'), {
    page: 'blog-detail',
    slug: 'planejamento-previdenciario-aposentadoria-inss',
  });
  assert.deepEqual(parseRoute('/contato'), { page: 'contact' });
  assert.deepEqual(parseRoute('/politica-de-privacidade'), { page: 'privacy' });
  assert.deepEqual(parseRoute('/termos-de-uso'), { page: 'terms' });
  assert.deepEqual(parseRoute('/areas-de-atuacao/inexistente'), { page: 'areas-index' });
});

test('practice areas contain only Direito Cível, Direito Trabalhista, and Direito Previdenciário', () => {
  assert.deepEqual(
    PRACTICE_AREAS.map((a) => a.slug),
    ['direito-civel', 'direito-trabalhista', 'direito-previdenciario']
  );
});

test('team sorting puts partners first and filters cleanly by practice area', () => {
  const sorted = getSortedTeamMembers();
  assert.equal(sorted.length, 4);
  assert.equal(sorted[0].isPartner, true);
  assert.equal(sorted[1].isPartner, true);
  assert.equal(sorted[2].isPartner, false);

  const civilMembers = filterTeamByArea('direito-civel');
  assert.equal(civilMembers.length, 3);
  assert.equal(civilMembers[0].isPartner, true);

  const prevMembers = filterTeamByArea('direito-previdenciario');
  assert.equal(prevMembers.length, 3);
  assert.equal(prevMembers[0].isPartner, true);
});

test('blog search, category filter, and pagination return deterministic results', () => {
  const all = filterAndPaginateBlogPosts({ pageSize: 2, page: 1 });
  assert.equal(all.totalItems, 3);
  assert.equal(all.totalPages, 2);
  assert.equal(all.items.length, 2);

  const page2 = filterAndPaginateBlogPosts({ pageSize: 2, page: 2 });
  assert.equal(page2.items.length, 1);

  const byCategory = filterAndPaginateBlogPosts({ categorySlug: 'direito-previdenciario' });
  assert.equal(byCategory.totalItems, 1);
  assert.equal(
    byCategory.items[0].slug,
    'planejamento-previdenciario-aposentadoria-inss'
  );

  const byQuery = filterAndPaginateBlogPosts({ query: 'CNIS' });
  assert.equal(byQuery.totalItems, 1);
});

test('contact validation enforces LGPD consent, anti-spam honeypot, and Brazilian phone/email format', () => {
  const emptyErrors = validateContactForm(INITIAL_CONTACT_FORM);
  assert.equal(hasContactErrors(emptyErrors), true);
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.phone);
  assert.ok(emptyErrors.message);
  assert.ok(emptyErrors.lgpdConsent);

  const spamErrors = validateContactForm({
    ...INITIAL_CONTACT_FORM,
    name: 'Robô Spam',
    email: 'spam@example.com',
    phone: '14999990000',
    message: 'Mensagem automatizada para teste.',
    lgpdConsent: true,
    companyWebsite: 'https://spam.example',
  });
  assert.ok(spamErrors.antiSpam);

  const validErrors = validateContactForm({
    name: 'Mariana Oliveira',
    email: 'mariana@exemplo.com.br',
    phone: '(14) 99123-4567',
    subject: 'Direito Previdenciário',
    message: 'Gostaria de agendar atendimento informativo sobre análise do CNIS.',
    lgpdConsent: true,
    companyWebsite: '',
  });
  assert.equal(hasContactErrors(validErrors), false);

  const receipt = formatContactReceipt(
    {
      name: '  Mariana Oliveira ',
      email: 'mariana@exemplo.com.br',
      phone: '(14) 99123-4567',
      subject: 'Direito Previdenciário',
      message: 'Gostaria de agendar atendimento.',
      lgpdConsent: true,
    },
    new Date('2026-11-22T14:00:00Z')
  );
  assert.match(receipt.protocol, /^CS-2026-\d{5}$/);
  assert.equal(receipt.name, 'Mariana Oliveira');
});

test('buildPageMetadata emits unique titles and required JSON-LD schemas for area, person, and article routes', () => {
  const areaMeta = buildPageMetadata({ page: 'area-detail', slug: 'direito-previdenciario' });
  const areaGraph = areaMeta.jsonLd['@graph'] as Record<string, unknown>[];
  assert.ok(areaMeta.title.includes('Bauru'));
  assert.equal(PRACTICE_AREAS.length, 3);
  assert.ok(areaGraph.some((node) => node['@type'] === 'FAQPage'));
  assert.ok(areaGraph.some((node) => node['@type'] === 'BreadcrumbList'));

  const memberMeta = buildPageMetadata({ page: 'team-detail', slug: 'carreira-socio' });
  const memberGraph = memberMeta.jsonLd['@graph'] as Record<string, unknown>[];
  assert.ok(memberGraph.some((node) => node['@type'] === 'Person'));

  const blogMeta = buildPageMetadata({
    page: 'blog-detail',
    slug: 'direito-trabalhista-bauru-rescisao-prazos',
  });
  const blogGraph = blogMeta.jsonLd['@graph'] as Record<string, unknown>[];
  assert.ok(blogGraph.some((node) => node['@type'] === 'Article'));

  const orgNode = blogGraph[0] as { name: string; address: { addressLocality: string } };
  assert.equal(FIRM_INFO.name, 'Carreira Advocacia');
  assert.equal(orgNode.name, 'Carreira Advocacia');
  assert.equal(orgNode.address.addressLocality, 'Bauru');
});
