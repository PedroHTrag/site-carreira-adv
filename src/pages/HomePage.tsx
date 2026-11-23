import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Shield,
  Users,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import { FIRM_INFO, HOME_PILLARS, OFFICE_CONTENT, buildWhatsAppHref } from '../data/firm';
import { PRACTICE_AREAS, getPracticeAreaBySlug } from '../data/practiceAreas';
import { getSortedTeamMembers, getTeamMemberBySlug } from '../data/team';
import { trackWhatsAppClick } from '../utils/analytics';
import { PracticeIcon } from '../components/PracticeIcon';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const teamMembers = getSortedTeamMembers();
  const coFounder = teamMembers[1];
  const latestPosts = [...BLOG_POSTS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  const renderPillarIcon = (iconName: 'scale' | 'users' | 'shield') => {
    switch (iconName) {
      case 'scale':
        return <Scale className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />;
      case 'users':
        return <Users className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />;
      case 'shield':
        return <Shield className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />;
    }
  };

  return (
    <>
      {/* SECTION 1: HERO BANNER */}
      <section
        aria-label="Apresentação do Escritório"
        className="relative bg-[#082144] text-white overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <img
            src={FIRM_INFO.heroBackdrop}
            alt=""
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-[#082144]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082144]/55 via-[#082144]/25 to-[#082144]/85" />
        </div>

        <div className="relative z-10 max-w-[920px] mx-auto px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-16">
          <motion.div
            className="text-center flex flex-col items-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEase }}
          >
            <h1 className="font-display text-[36px] sm:text-[46px] lg:text-[52px] font-normal leading-[1.12] tracking-[-0.01em] text-white max-w-[700px] text-balance mb-4 drop-shadow-[0_2px_16px_rgba(8,33,68,0.6)]">
              Advocacia <span className="italic text-[#7F99B2]">Técnica</span>, Ética e{' '}
              <span className="italic text-[#7F99B2]">Próxima</span> em Bauru.
            </h1>

            <p className="text-[15.5px] sm:text-[17px] font-light leading-[1.6] text-[#F7F7F7]/90 max-w-[520px] mb-8 drop-shadow-[0_1px_10px_rgba(8,33,68,0.6)]">
              Atuação em Direito Cível, Trabalhista e Previdenciário.
            </p>

            <a
              href="/contato"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contato');
              }}
              className="inline-flex items-center gap-2.5 bg-[#F7F7F7] hover:bg-white text-[#082144] text-[14px] font-medium px-8 py-3.5 rounded-[4px] shadow-[0_12px_28px_rgba(8,33,68,0.45)] transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>Agendar Atendimento</span>
              <ArrowRight className="w-4 h-4 text-[#39586D]" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Faixa Inferior NAP (Bauru/SP) */}
        <div className="relative z-10 border-t border-[#7F99B2]/20 bg-[#082144]/90 pb-20 sm:pb-24">
          <div className="max-w-[1100px] mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-[12.5px] font-light text-[#D2D7DB]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7F99B2] shrink-0" aria-hidden="true" />
              <span>{FIRM_INFO.addressLine}</span>
            </div>
            <a
              href={FIRM_INFO.phoneHref}
              className="flex items-center gap-2 hover:text-white transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#7F99B2] shrink-0" aria-hidden="true" />
              <span>{FIRM_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${FIRM_INFO.email.replace(/^\[E-MAIL:\s*|\]$/g, '')}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#7F99B2] shrink-0" aria-hidden="true" />
              <span>{FIRM_INFO.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: 3 CARDS SOBREPOSTOS */}
      <section aria-label="Pilares de Atuação" className="relative z-20 bg-[#F7F7F7] text-[#2C4156] pb-12">
        <div className="max-w-[1100px] mx-auto px-6 -mt-14 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOME_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="group bg-white rounded-[6px] shadow-[0_12px_34px_rgba(8,33,68,0.06)] border border-[#D2D7DB] px-7 py-9 text-center transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#F7F7F7] flex items-center justify-center mx-auto mb-5 transition-colors duration-200 group-hover:bg-[#D2D7DB]/45">
                  <div className="w-10 h-10 rounded-full bg-[#082144] group-hover:bg-[#39586D] text-white flex items-center justify-center transition-colors duration-200">
                    {renderPillarIcon(pillar.iconName)}
                  </div>
                </div>
                <h2 className="font-display text-[22px] font-normal text-[#082144] mb-3">
                  {pillar.title}
                </h2>
                <p className="text-[14px] font-light leading-[1.65] text-[#2C4156]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BREVE APRESENTAÇÃO DO ESCRITÓRIO */}
      <section
        aria-label="Sobre o Escritório Carreira Advocacia"
        className="relative z-10 bg-white pt-12 pb-16 border-y border-[#D2D7DB]/70"
      >
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
            <div className="lg:col-span-4 text-center flex flex-col items-center">
              <span className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2.5">
                PROPÓSITO E PRESENÇA LOCAL
              </span>
              <h2 className="font-display text-[26px] sm:text-[28px] font-normal leading-[1.2] text-[#082144] mb-4 text-balance">
                {OFFICE_CONTENT.historyTitle}
              </h2>
              <p className="text-[14px] font-light leading-[1.68] text-[#2C4156] mb-5 max-w-[350px]">
                {OFFICE_CONTENT.purpose} {OFFICE_CONTENT.historyParagraphs[1]}
              </p>
              <a
                href="/escritorio"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/escritorio');
                }}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#082144] hover:text-[#39586D] transition-colors py-1.5 px-3"
              >
                <span>Conheça nossa história</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-[300px] sm:w-[330px] h-[340px] flex items-end justify-center">
                <div
                  className="absolute top-6 w-[256px] h-[256px] rounded-full bg-[#F7F7F7] border border-[#D2D7DB]/70"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-10 left-2 z-20 flex flex-col items-start gap-3 pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="block w-14 h-3 rounded-full bg-[#082144] rotate-45" />
                  <span className="block w-3 h-3 rounded-full bg-[#7F99B2] ml-10 -mt-1" />
                  <span className="block w-5 h-5 rounded-full bg-[#39586D] mt-4 ml-1" />
                </div>
                <div className="relative z-10 w-[264px] h-[336px] flex items-end justify-center">
                  <img
                    src={coFounder.photo}
                    alt={coFounder.photoAlt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top brightness-[1.06] contrast-[1.05] mix-blend-multiply"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center flex flex-col items-center">
              <span className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2.5">
                NOSSO POSICIONAMENTO
              </span>
              <h2 className="font-display text-[26px] sm:text-[28px] font-normal leading-[1.2] text-[#082144] mb-4 text-balance">
                Assessoria jurídica <span className="italic">técnica, ética e personalizada</span>.
              </h2>
              <p className="text-[14px] font-light leading-[1.68] text-[#2C4156] mb-5 max-w-[350px]">
                {OFFICE_CONTENT.mission}
              </p>
              <a
                href="/contato"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contato');
                }}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#082144] hover:text-[#39586D] transition-colors py-1.5 px-3"
              >
                <span>Agendar atendimento</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: RESUMO DAS ÁREAS DE ATUAÇÃO (AZUL INSTITUCIONAL #082144) */}
      <section
        aria-label="Áreas de Atuação em Bauru"
        className="relative bg-[#082144] text-white py-16 lg:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <img
            src={FIRM_INFO.servicesBackdrop}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-12 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082144]/95 via-[#082144]/85 to-[#2C4156]/90" />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#7F99B2] uppercase mb-2">
                ATUAÇÃO JURÍDICA EM BAURU/SP
              </p>
              <h2 className="font-display text-[32px] sm:text-[36px] font-normal text-white">
                Áreas de Atuação
              </h2>
            </div>
            <a
              href="/areas-de-atuacao"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/areas-de-atuacao');
              }}
              className="border border-[#7F99B2]/45 hover:border-white text-white hover:text-[#D2D7DB] text-[12.5px] font-medium px-5 py-2.5 rounded-[4px] transition-colors whitespace-nowrap shrink-0"
            >
              Ver todas as áreas
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#7F99B2]/20">
            {PRACTICE_AREAS.map((area) => (
              <a
                key={area.slug}
                href={`/areas-de-atuacao/${area.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/areas-de-atuacao/${area.slug}`);
                }}
                className="group border-r border-b border-[#7F99B2]/20 px-6 py-9 flex flex-col items-center text-center hover:bg-[#2C4156]/35 transition-colors"
              >
                <div className="w-[68px] h-[68px] rounded-full bg-[#2C4156]/70 group-hover:bg-[#39586D] flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#39586D] group-hover:bg-[#7F99B2] text-white flex items-center justify-center transition-colors duration-200">
                    <PracticeIcon name={area.iconName} />
                  </div>
                </div>
                <h3 className="font-display text-[22px] font-normal text-white group-hover:text-[#7F99B2] transition-colors mb-2">
                  {area.title}
                </h3>
                <p className="text-[13.5px] font-light leading-[1.6] text-[#D2D7DB] mb-4 max-w-[290px]">
                  {area.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#7F99B2] group-hover:text-white transition-colors">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: DESTAQUE DA EQUIPE (4 INTEGRANTES) */}
      <section aria-label="Equipe Jurídica" className="bg-[#F7F7F7] py-16 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
                CORPO JURÍDICO
              </p>
              <h2 className="font-display text-[32px] sm:text-[36px] font-normal text-[#082144]">
                Nossa Equipe
              </h2>
            </div>
            <a
              href="/equipe"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/equipe');
              }}
              className="border border-[#082144]/35 hover:border-[#082144] hover:bg-[#082144] text-[#082144] hover:text-white text-[12.5px] font-medium px-5 py-2.5 rounded-[4px] transition-colors whitespace-nowrap shrink-0"
            >
              Ver equipe completa
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => {
              const primaryArea = getPracticeAreaBySlug(member.primaryAreaSlug);
              return (
                <article
                  key={member.slug}
                  className="bg-white rounded-[6px] border border-[#D2D7DB] shadow-[0_10px_28px_rgba(8,33,68,0.05)] overflow-hidden flex flex-col"
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
                    <h3 className="font-display text-[21px] font-normal text-[#082144] leading-snug mb-1">
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
                    </h3>
                    <p className="text-[12.5px] font-light text-[#2C4156] mb-3 tabular-nums">
                      {member.oab} · {primaryArea?.title}
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
                        <span>Ver perfil</span>
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

      {/* SECTION 6: ÚLTIMOS 3 ARTIGOS DO BLOG */}
      <section aria-label="Artigos Recentes do Blog" className="bg-white py-16 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
                CONTEÚDO INFORMATIVO
              </p>
              <h2 className="font-display text-[32px] sm:text-[36px] font-normal text-[#082144]">
                Últimos Artigos do Blog
              </h2>
            </div>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog');
              }}
              className="border border-[#082144]/35 hover:border-[#082144] hover:bg-[#082144] text-[#082144] hover:text-white text-[12.5px] font-medium px-5 py-2.5 rounded-[4px] transition-colors whitespace-nowrap shrink-0"
            >
              Acessar o Blog
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => {
              const category = getPracticeAreaBySlug(post.categorySlug);
              const author = getTeamMemberBySlug(post.authorSlug);
              return (
                <article
                  key={post.slug}
                  className="bg-white rounded-[6px] border border-[#D2D7DB] shadow-[0_10px_28px_rgba(8,33,68,0.05)] overflow-hidden flex flex-col"
                >
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/blog/${post.slug}`);
                    }}
                    className="block aspect-[16/9] bg-[#082144] overflow-hidden"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                    />
                  </a>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#39586D] mb-2.5">
                      <span className="font-medium text-[#082144]">{category?.title}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.readingMinutes} min
                      </span>
                    </div>
                    <h3 className="font-display text-[22px] font-normal text-[#082144] leading-snug mb-2.5">
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }}
                        className="hover:text-[#39586D] transition-colors"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-[14px] font-light leading-[1.62] text-[#2C4156] mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="pt-3 border-t border-[#D2D7DB]/70 flex items-center justify-between text-[12.5px] text-[#39586D]">
                      <span>{author?.name}</span>
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/blog/${post.slug}`);
                        }}
                        className="font-medium text-[#082144] hover:text-[#39586D]"
                      >
                        Ler artigo →
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA FINAL DE CONTATO */}
      <section aria-label="Canal de Contato" className="relative bg-white pb-16 pt-2">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="bg-[#082144] rounded-xl px-6 sm:px-12 py-10 sm:py-12 text-center shadow-[0_24px_54px_rgba(8,33,68,0.22)] border border-[#7F99B2]/20">
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#7F99B2] uppercase mb-2">
              ATENDIMENTO EM BAURU/SP E REGIÃO
            </p>
            <h2 className="font-display text-[30px] sm:text-[36px] font-normal text-white mb-3 text-balance">
              Analisamos seu caso com atenção e <span className="italic text-[#7F99B2]">orientamos cada etapa</span>.
            </h2>
            <p className="text-[14.5px] font-light text-[#D2D7DB] max-w-[580px] mx-auto mb-7 leading-relaxed">
              Entre em contato pelos nossos canais oficiais para agendar atendimento presencial em
              Bauru/SP ou por videoconferência.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contato"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contato');
                }}
                className="bg-[#F7F7F7] hover:bg-white text-[#082144] text-[13.5px] font-medium px-7 py-3 rounded-[4px] transition-colors"
              >
                Acessar Formulário de Contato
              </a>
              <a
                href={buildWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('home_final_cta')}
                className="inline-flex items-center gap-2 bg-[#2C4156] hover:bg-[#39586D] text-white border border-[#7F99B2]/40 text-[13.5px] font-medium px-7 py-3 rounded-[4px] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#7F99B2]" aria-hidden="true" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
