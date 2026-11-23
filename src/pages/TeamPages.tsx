import { useState } from 'react';
import { ArrowRight, BookOpen, GraduationCap, Languages, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { PageHeroBanner } from '../components/Layout';
import { getBlogPostsByAuthor } from '../data/blog';
import { buildWhatsAppHref } from '../data/firm';
import { PRACTICE_AREAS, getPracticeAreaBySlug } from '../data/practiceAreas';
import { filterTeamByArea, getTeamMemberBySlug, TEAM_MEMBERS } from '../data/team';
import { trackWhatsAppClick } from '../utils/analytics';
import type { BreadcrumbItem } from '../utils/router';

interface TeamIndexPageProps {
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function TeamIndexPage({ breadcrumbs, onNavigate }: TeamIndexPageProps) {
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const members = filterTeamByArea(selectedArea);

  return (
    <>
      <PageHeroBanner
        eyebrow="CORPO JURÍDICO · BAURU/SP"
        titlePrefix="Nossa"
        titleHighlight="Equipe"
        subtitle="Advogados inscritos na OAB/SP dedicados ao atendimento técnico, ético e próximo. Sócios listados primeiro."
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label="Listagem de Advogados" className="bg-white py-14 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-6">
          {/* Filtro por Área de Atuação */}
          <div className="mb-9">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#39586D] mb-3">
              Filtrar por área de atuação
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedArea('todas')}
                className={`px-4 py-2 text-[12.5px] font-medium rounded-[4px] border transition-colors cursor-pointer ${
                  selectedArea === 'todas'
                    ? 'bg-[#082144] border-[#082144] text-white'
                    : 'bg-[#F7F7F7] border-[#D2D7DB] text-[#2C4156] hover:border-[#082144]'
                }`}
              >
                Todas as áreas
              </button>
              {PRACTICE_AREAS.map((area) => (
                <button
                  key={area.slug}
                  type="button"
                  onClick={() => setSelectedArea(area.slug)}
                  className={`px-4 py-2 text-[12.5px] font-medium rounded-[4px] border transition-colors cursor-pointer ${
                    selectedArea === area.slug
                      ? 'bg-[#082144] border-[#082144] text-white'
                      : 'bg-[#F7F7F7] border-[#D2D7DB] text-[#2C4156] hover:border-[#082144]'
                  }`}
                >
                  {area.title}
                </button>
              ))}
            </div>
          </div>

          {/* Grade de Integrantes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member) => {
              const primaryArea = getPracticeAreaBySlug(member.primaryAreaSlug);
              return (
                <article
                  key={member.slug}
                  className="bg-white rounded-[6px] border border-[#D2D7DB] shadow-[0_12px_32px_rgba(8,33,68,0.05)] overflow-hidden flex flex-col"
                >
                  <a
                    href={`/equipe/${member.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/equipe/${member.slug}`);
                    }}
                    className="block aspect-[3/4] bg-[#082144] overflow-hidden"
                  >
                    <img
                      src={member.photo}
                      alt={member.photoAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                    />
                  </a>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#39586D] mb-1">
                      {member.role}
                    </p>
                    <h2 className="font-display text-[22px] font-normal text-[#082144] leading-snug mb-1">
                      <a
                        href={`/equipe/${member.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/equipe/${member.slug}`);
                        }}
                        className="hover:text-[#39586D] transition-colors"
                      >
                        {member.name}
                      </a>
                    </h2>
                    <p className="text-[12.5px] font-light text-[#2C4156] mb-2 tabular-nums">{member.oab}</p>
                    <p className="text-[13px] font-medium text-[#082144] mb-4">
                      Área principal: {primaryArea?.title}
                    </p>
                    <div className="mt-auto pt-3 border-t border-[#D2D7DB]/70">
                      <a
                        href={`/equipe/${member.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/equipe/${member.slug}`);
                        }}
                        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#082144] hover:text-[#39586D]"
                      >
                        <span>Ver perfil completo</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

interface TeamProfilePageProps {
  slug: string;
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string, prefillSubject?: string) => void;
}

export function TeamProfilePage({ slug, breadcrumbs, onNavigate }: TeamProfilePageProps) {
  const member = getTeamMemberBySlug(slug) || TEAM_MEMBERS[0];
  const authoredPosts = getBlogPostsByAuthor(member.slug);

  return (
    <>
      <PageHeroBanner
        eyebrow={`${member.role} · ${member.oab}`}
        titlePrefix={member.name}
        titleHighlight=""
        subtitle={member.shortBio}
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label={`Perfil de ${member.name}`} className="bg-white py-14 lg:py-16">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Cartão Lateral com Foto e Contato Direto */}
            <div className="lg:col-span-4 space-y-5">
              <div className="rounded-[6px] overflow-hidden border border-[#D2D7DB] shadow-[0_12px_32px_rgba(8,33,68,0.06)] bg-[#082144]">
                <img
                  src={member.photo}
                  alt={member.photoAlt}
                  className="w-full aspect-[3/4] object-cover object-top"
                />
              </div>

              <div className="bg-[#F7F7F7] rounded-[6px] border border-[#D2D7DB] p-6 space-y-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#39586D]">
                    REGISTRO PROFISSIONAL
                  </p>
                  <p className="text-[15px] font-medium text-[#082144] mt-0.5 tabular-nums">
                    {member.oab}
                  </p>
                </div>

                <div className="space-y-2 text-[13.5px] font-light">
                  <a
                    href={`mailto:${member.email.replace(/^\[E-MAIL:\s*|\]$/g, '')}`}
                    className="flex items-center gap-2 text-[#2C4156] hover:text-[#082144] transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#39586D] shrink-0" aria-hidden="true" />
                    <span>{member.email}</span>
                  </a>
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#2C4156] hover:text-[#082144] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#39586D] shrink-0" aria-hidden="true" />
                    <span>Perfil no LinkedIn</span>
                  </a>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onNavigate('/contato', `Atendimento com ${member.name}`)}
                    className="w-full bg-[#082144] hover:bg-[#2C4156] text-white text-[13px] font-medium py-3 px-4 rounded-[4px] transition-colors cursor-pointer"
                  >
                    Falar com este advogado
                  </button>
                  <a
                    href={buildWhatsAppHref(member.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`team_profile_${member.slug}`)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2C4156] hover:bg-[#39586D] text-white text-[13px] font-medium py-3 px-4 rounded-[4px] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#7F99B2]" aria-hidden="true" />
                    <span>WhatsApp Direto</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Conteúdo Biográfico e Acadêmico */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="font-display text-[28px] font-normal text-[#082144] mb-3">
                  Áreas de Atuação
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {member.areaSlugs.map((areaSlug) => {
                    const area = getPracticeAreaBySlug(areaSlug);
                    if (!area) return null;
                    return (
                      <a
                        key={area.slug}
                        href={`/areas-de-atuacao/${area.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/areas-de-atuacao/${area.slug}`);
                        }}
                        className="px-4 py-2 rounded-[4px] bg-[#F7F7F7] border border-[#D2D7DB] text-[13px] font-medium text-[#082144] hover:border-[#082144] hover:text-[#39586D] transition-colors"
                      >
                        {area.title}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-[28px] font-normal text-[#082144]">
                  Minibiografia
                </h2>
                {member.fullBio.map((para, idx) => (
                  <p key={idx} className="text-[15px] font-light leading-[1.7] text-[#2C4156]">
                    {para}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-[6px] bg-[#F7F7F7] border border-[#D2D7DB]">
                  <h3 className="font-display text-[22px] font-normal text-[#082144] flex items-center gap-2 mb-3">
                    <GraduationCap className="w-5 h-5 text-[#39586D]" aria-hidden="true" />
                    <span>Formação e Especializações</span>
                  </h3>
                  <ul className="space-y-2 text-[14px] font-light text-[#2C4156]">
                    {member.education.map((edu, idx) => (
                      <li key={idx}>• {edu}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-[6px] bg-[#F7F7F7] border border-[#D2D7DB]">
                    <h3 className="font-display text-[22px] font-normal text-[#082144] flex items-center gap-2 mb-3">
                      <Languages className="w-5 h-5 text-[#39586D]" aria-hidden="true" />
                      <span>Idiomas</span>
                    </h3>
                    <ul className="space-y-1.5 text-[14px] font-light text-[#2C4156]">
                      {member.languages.map((lang, idx) => (
                        <li key={idx}>• {lang}</li>
                      ))}
                    </ul>
                  </div>

                  {member.publications.length > 0 && (
                    <div className="p-6 rounded-[6px] bg-[#F7F7F7] border border-[#D2D7DB]">
                      <h3 className="font-display text-[22px] font-normal text-[#082144] flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-[#39586D]" aria-hidden="true" />
                        <span>Publicações e Participações</span>
                      </h3>
                      <ul className="space-y-1.5 text-[14px] font-light text-[#2C4156]">
                        {member.publications.map((pub, idx) => (
                          <li key={idx}>• {pub}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Artigos Escritos pelo Integrante */}
              <div className="pt-4 border-t border-[#D2D7DB]">
                <h2 className="font-display text-[26px] font-normal text-[#082144] mb-4">
                  Artigos Publicados no Blog
                </h2>
                {authoredPosts.length > 0 ? (
                  <div className="space-y-3">
                    {authoredPosts.map((post) => (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }}
                        className="block p-4 rounded-[6px] border border-[#D2D7DB] hover:border-[#082144] bg-[#F7F7F7] transition-colors"
                      >
                        <p className="text-[12px] text-[#39586D] font-medium mb-1">
                          {post.publishedAtDisplay} · {post.readingMinutes} min de leitura
                        </p>
                        <h3 className="font-display text-[20px] font-normal text-[#082144]">
                          {post.title}
                        </h3>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] font-light text-[#2C4156]">
                    Nenhum artigo cadastrado para este integrante até o momento.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
