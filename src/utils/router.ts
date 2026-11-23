import { BLOG_POSTS, getBlogPostBySlug, type BlogPost } from '../data/blog';
import { FIRM_INFO } from '../data/firm';
import { PRACTICE_AREAS, getPracticeAreaBySlug } from '../data/practiceAreas';
import { getTeamMemberBySlug } from '../data/team';

export type RouteMatch =
  | { page: 'home' }
  | { page: 'office' }
  | { page: 'areas-index' }
  | { page: 'area-detail'; slug: string }
  | { page: 'team-index' }
  | { page: 'team-detail'; slug: string }
  | { page: 'blog-index' }
  | { page: 'blog-detail'; slug: string }
  | { page: 'contact' }
  | { page: 'privacy' }
  | { page: 'terms' };

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface PageSeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  breadcrumbs: BreadcrumbItem[];
  jsonLd: Record<string, unknown>;
}

export function normalizePath(pathname: string): string {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function parseRoute(pathname: string): RouteMatch {
  const path = normalizePath(pathname);

  if (path === '/') return { page: 'home' };
  if (path === '/escritorio') return { page: 'office' };
  if (path === '/areas-de-atuacao') return { page: 'areas-index' };
  if (path.startsWith('/areas-de-atuacao/')) {
    const slug = path.replace('/areas-de-atuacao/', '');
    if (getPracticeAreaBySlug(slug)) {
      return { page: 'area-detail', slug };
    }
    return { page: 'areas-index' };
  }
  if (path === '/equipe') return { page: 'team-index' };
  if (path.startsWith('/equipe/')) {
    const slug = path.replace('/equipe/', '');
    if (getTeamMemberBySlug(slug)) {
      return { page: 'team-detail', slug };
    }
    return { page: 'team-index' };
  }
  if (path === '/blog') return { page: 'blog-index' };
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    if (getBlogPostBySlug(slug)) {
      return { page: 'blog-detail', slug };
    }
    return { page: 'blog-index' };
  }
  if (path === '/contato') return { page: 'contact' };
  if (path === '/politica-de-privacidade') return { page: 'privacy' };
  if (path === '/termos-de-uso') return { page: 'terms' };

  return { page: 'home' };
}

export interface BlogFilterResult {
  items: BlogPost[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export function filterAndPaginateBlogPosts(options: {
  query?: string;
  categorySlug?: string;
  page?: number;
  pageSize?: number;
  posts?: BlogPost[];
}): BlogFilterResult {
  const {
    query = '',
    categorySlug = 'todas',
    page = 1,
    pageSize = 3,
    posts = BLOG_POSTS,
  } = options;

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = posts.filter((post) => {
    const matchesCategory =
      !categorySlug || categorySlug === 'todas' || post.categorySlug === categorySlug;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const inTitle = post.title.toLowerCase().includes(normalizedQuery);
    const inExcerpt = post.excerpt.toLowerCase().includes(normalizedQuery);
    const inSections = post.sections.some(
      (sec) =>
        sec.heading.toLowerCase().includes(normalizedQuery) ||
        sec.paragraphs.some((p) => p.toLowerCase().includes(normalizedQuery))
    );
    return inTitle || inExcerpt || inSections;
  });

  const sorted = [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    totalItems,
    totalPages,
    currentPage,
  };
}

export function buildPageMetadata(
  route: RouteMatch,
  origin = 'https://carreiraadvocacia.adv.br'
): PageSeoMetadata {
  const baseOrgNode = {
    '@type': ['LegalService', 'Attorney'],
    '@id': `${origin}/#organization`,
    name: FIRM_INFO.name,
    url: origin,
    telephone: FIRM_INFO.phoneDisplay,
    email: FIRM_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: FIRM_INFO.streetAddress,
      addressLocality: 'Bauru',
      addressRegion: 'SP',
      postalCode: FIRM_INFO.postalCode,
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Bauru' },
      { '@type': 'AdministrativeArea', name: 'São Paulo' },
    ],
    knowsAbout: PRACTICE_AREAS.map((area) => area.title),
  };

  let title = `${FIRM_INFO.name} | Advocacia em Bauru/SP`;
  let description =
    'Escritório de advocacia em Bauru/SP com atuação informativa, consultiva e contenciosa em Direito Cível, Direito Trabalhista e Direito Previdenciário.';
  let canonicalPath = '/';
  let breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];
  const extraNodes: Record<string, unknown>[] = [];

  switch (route.page) {
    case 'office':
      title = `O Escritório | ${FIRM_INFO.name} — Bauru/SP`;
      description =
        'Conheça a história, missão, valores e estrutura de atendimento do escritório Carreira Advocacia em Bauru/SP.';
      canonicalPath = '/escritorio';
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'O Escritório', path: '/escritorio' },
      ];
      break;

    case 'areas-index':
      title = `Áreas de Atuação em Bauru/SP | ${FIRM_INFO.shortName}`;
      description =
        'Atuação técnica em Direito Cível, Direito Trabalhista e Direito Previdenciário em Bauru e região.';
      canonicalPath = '/areas-de-atuacao';
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Áreas de Atuação', path: '/areas-de-atuacao' },
      ];
      break;

    case 'area-detail': {
      const area = getPracticeAreaBySlug(route.slug);
      if (area) {
        title = area.seoTitle;
        description = area.seoDescription;
        canonicalPath = `/areas-de-atuacao/${area.slug}`;
        breadcrumbs = [
          { label: 'Home', path: '/' },
          { label: 'Áreas de Atuação', path: '/areas-de-atuacao' },
          { label: area.title, path: canonicalPath },
        ];
        extraNodes.push({
          '@type': 'FAQPage',
          '@id': `${origin}${canonicalPath}#faq`,
          mainEntity: area.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        });
      }
      break;
    }

    case 'team-index':
      title = `Equipe Jurídica em Bauru/SP | ${FIRM_INFO.shortName}`;
      description =
        'Conheça os sócios e advogados associados do escritório Carreira Advocacia em Bauru/SP, suas especializações e registros na OAB/SP.';
      canonicalPath = '/equipe';
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Equipe', path: '/equipe' },
      ];
      break;

    case 'team-detail': {
      const member = getTeamMemberBySlug(route.slug);
      if (member) {
        title = `${member.name} (${member.oab}) | ${FIRM_INFO.shortName}`;
        description = member.shortBio;
        canonicalPath = `/equipe/${member.slug}`;
        breadcrumbs = [
          { label: 'Home', path: '/' },
          { label: 'Equipe', path: '/equipe' },
          { label: member.name, path: canonicalPath },
        ];
        extraNodes.push({
          '@type': 'Person',
          '@id': `${origin}${canonicalPath}#person`,
          name: member.name,
          jobTitle: member.role,
          description: member.shortBio,
          email: member.email,
          worksFor: { '@id': `${origin}/#organization` },
          knowsAbout: member.areaSlugs
            .map((slug) => getPracticeAreaBySlug(slug)?.title)
            .filter(Boolean),
        });
      }
      break;
    }

    case 'blog-index':
      title = `Blog Jurídico Informativo | ${FIRM_INFO.shortName} Bauru/SP`;
      description =
        'Artigos informativos sobre Direito Cível, Direito Trabalhista e Direito Previdenciário em linguagem clara e acessível.';
      canonicalPath = '/blog';
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Blog', path: '/blog' },
      ];
      break;

    case 'blog-detail': {
      const post = getBlogPostBySlug(route.slug);
      const author = post ? getTeamMemberBySlug(post.authorSlug) : undefined;
      if (post) {
        title = post.seoTitle;
        description = post.seoDescription;
        canonicalPath = `/blog/${post.slug}`;
        breadcrumbs = [
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/blog' },
          { label: post.title, path: canonicalPath },
        ];
        extraNodes.push({
          '@type': 'Article',
          '@id': `${origin}${canonicalPath}#article`,
          headline: post.title,
          description: post.seoDescription,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          inLanguage: 'pt-BR',
          author: author
            ? {
                '@type': 'Person',
                name: author.name,
                url: `${origin}/equipe/${author.slug}`,
              }
            : { '@id': `${origin}/#organization` },
          publisher: { '@id': `${origin}/#organization` },
          mainEntityOfPage: `${origin}${canonicalPath}`,
        });
      }
      break;
    }

    case 'contact':
      title = `Contato em Bauru/SP | ${FIRM_INFO.name}`;
      description =
        'Entre em contato com Carreira Advocacia em Bauru/SP por formulário, telefone, e-mail ou WhatsApp.';
      canonicalPath = '/contato';
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Contato', path: '/contato' },
      ];
      break;

    case 'privacy':
      title = `Política de Privacidade (LGPD) | ${FIRM_INFO.shortName}`;
      description =
        'Informações sobre tratamento de dados pessoais, direitos do titular e uso de cookies no site do escritório Carreira Advocacia.';
      canonicalPath = '/politica-de-privacidade';
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Política de Privacidade', path: '/politica-de-privacidade' },
      ];
      break;

    case 'terms':
      title = `Termos de Uso | ${FIRM_INFO.shortName}`;
      description =
        'Termos de Uso e caráter informativo do conteúdo jurídico publicado pelo escritório Carreira Advocacia em conformidade com a OAB.';
      canonicalPath = '/termos-de-uso';
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Termos de Uso', path: '/termos-de-uso' },
      ];
      break;

    case 'home':
    default:
      break;
  }

  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': `${origin}${canonicalPath}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${origin}${crumb.path}`,
    })),
  };

  return {
    title,
    description,
    canonicalPath,
    breadcrumbs,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [baseOrgNode, breadcrumbNode, ...extraNodes],
    },
  };
}
