import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { PageHeroBanner } from '../components/Layout';
import { PracticeIcon } from '../components/PracticeIcon';
import { getBlogPostsByArea } from '../data/blog';
import { PRACTICE_AREAS, getPracticeAreaBySlug } from '../data/practiceAreas';
import { filterTeamByArea } from '../data/team';
import type { BreadcrumbItem } from '../utils/router';

interface AreasIndexPageProps {
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function AreasIndexPage({ breadcrumbs, onNavigate }: AreasIndexPageProps) {
  return (
    <>
      <PageHeroBanner
        eyebrow="ATUAÇÃO JURÍDICA · BAURU/SP"
        titlePrefix="Áreas de"
        titleHighlight="Atuação"
        subtitle="Conheça as frentes jurídicas atendidas pelo escritório Carreira Advocacia em Bauru e região."
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label="Catálogo de Áreas de Atuação" className="bg-white py-14 lg:py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((area) => (
              <article
                key={area.slug}
                className="group bg-white rounded-[6px] border border-[#D2D7DB] shadow-[0_12px_32px_rgba(8,33,68,0.05)] p-7 flex flex-col transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-[#F7F7F7] flex items-center justify-center mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#082144] group-hover:bg-[#39586D] text-white flex items-center justify-center transition-colors">
                    <PracticeIcon name={area.iconName} />
                  </div>
                </div>
                <h2 className="font-display text-[24px] font-normal text-[#082144] mb-2.5">
                  {area.title}
                </h2>
                <p className="text-[14px] font-light leading-[1.65] text-[#2C4156] mb-5 flex-1">
                  {area.shortDescription}
                </p>
                <a
                  href={`/areas-de-atuacao/${area.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/areas-de-atuacao/${area.slug}`);
                  }}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#082144] hover:text-[#39586D]"
                >
                  <span>Consultar detalhes da área</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

interface AreaDetailPageProps {
  slug: string;
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string, prefillSubject?: string) => void;
}

export function AreaDetailPage({ slug, breadcrumbs, onNavigate }: AreaDetailPageProps) {
  const area = getPracticeAreaBySlug(slug) || PRACTICE_AREAS[0];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const areaLawyers = filterTeamByArea(area.slug);
  const relatedPosts = getBlogPostsByArea(area.slug);

  return (
    <>
      <PageHeroBanner
        eyebrow="ÁREA DE ATUAÇÃO · BAURU/SP"
        titlePrefix={area.title}
        titleHighlight="em Bauru e Região"
        subtitle={area.shortDescription}
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label={`Detalhes sobre ${area.title}`} className="bg-white py-14 lg:py-16">
        <div className="max-w-[1060px] mx-auto px-6 space-y-12">
          {/* Descrição & Situações Atendidas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-display text-[30px] font-normal text-[#082144]">
                {area.localHeadline}
              </h2>
              {area.fullDescription.map((paragraph, idx) => (
                <p key={idx} className="text-[15px] font-light leading-[1.7] text-[#2C4156]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5 bg-[#F7F7F7] rounded-[6px] border border-[#D2D7DB] p-7">
              <h3 className="font-display text-[23px] font-normal text-[#082144] mb-4">
                Situações Atendidas
              </h3>
              <ul className="space-y-3 text-[14px] font-light leading-[1.6] text-[#2C4156]">
                {area.situations.map((situation, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#082144] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span className="text-[#2C4156]">{situation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Como Funciona o Atendimento */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
              FLUXO DE ATENDIMENTO
            </p>
            <h2 className="font-display text-[28px] font-normal text-[#082144] mb-6">
              Como Funciona o Atendimento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {area.workflowSteps.map((step) => (
                <div
                  key={step.title}
                  className="bg-white rounded-[6px] border border-[#D2D7DB] p-6 shadow-[0_10px_24px_rgba(8,33,68,0.04)]"
                >
                  <h3 className="font-display text-[19px] font-normal text-[#082144] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] font-light leading-[1.62] text-[#2C4156]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipe que Atua na Área + Artigos Relacionados */}
          {(areaLawyers.length > 0 || relatedPosts.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-[#D2D7DB]">
              {areaLawyers.length > 0 && (
                <div>
                  <h2 className="font-display text-[24px] font-normal text-[#082144] mb-4">
                    Advogados da Área
                  </h2>
                  <div className="space-y-3">
                    {areaLawyers.map((member) => (
                      <a
                        key={member.slug}
                        href={`/equipe/${member.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/equipe/${member.slug}`);
                        }}
                        className="flex items-center gap-4 p-3.5 rounded-[6px] border border-[#D2D7DB] hover:border-[#082144] transition-colors bg-[#F7F7F7]"
                      >
                        <img
                          src={member.photo}
                          alt={member.photoAlt}
                          loading="lazy"
                          className="w-14 h-14 rounded-full object-cover object-top shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-display text-[19px] font-normal text-[#082144] truncate">
                            {member.name}
                          </p>
                          <p className="text-[12.5px] font-light text-[#2C4156]">
                            {member.role} · {member.oab}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div>
                  <h2 className="font-display text-[24px] font-normal text-[#082144] mb-4">
                    Artigos Informativos Relacionados
                  </h2>
                  <div className="space-y-3">
                    {relatedPosts.map((post) => (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }}
                        className="block p-4 rounded-[6px] border border-[#D2D7DB] hover:border-[#082144] transition-colors bg-[#F7F7F7]"
                      >
                        <h3 className="font-display text-[19px] font-normal text-[#082144] mb-1">
                          {post.title}
                        </h3>
                        <p className="text-[13px] font-light text-[#2C4156]">{post.excerpt}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FAQ */}
          <div>
            <h2 className="font-display text-[28px] font-normal text-[#082144] mb-5">
              Perguntas Frequentes — {area.title}
            </h2>
            <div className="space-y-3">
              {area.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className="rounded-[6px] border border-[#D2D7DB] bg-[#F7F7F7] overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-medium text-[14.5px] text-[#082144] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#39586D] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-[14px] font-light leading-[1.68] text-[#2C4156]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA da Área */}
          <div className="bg-[#082144] rounded-xl p-8 sm:p-10 text-center text-white border border-[#7F99B2]/20">
            <h2 className="font-display text-[28px] font-normal mb-2">
              Atendimento em {area.title} em Bauru/SP
            </h2>
            <p className="text-[14.5px] font-light text-[#D2D7DB] max-w-[560px] mx-auto mb-6">
              Envie sua dúvida pelo formulário oficial para agendar uma análise documental com
              nossa equipe.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/contato', area.title)}
              className="bg-[#F7F7F7] hover:bg-white text-[#082144] text-[13.5px] font-medium px-7 py-3 rounded-[4px] transition-colors cursor-pointer"
            >
              Solicitar Atendimento em {area.title}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
