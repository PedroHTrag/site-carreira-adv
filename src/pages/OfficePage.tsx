import { CheckCircle2 } from 'lucide-react';
import { PageHeroBanner } from '../components/Layout';
import { FIRM_INFO, OFFICE_CONTENT } from '../data/firm';
import type { BreadcrumbItem } from '../utils/router';

interface OfficePageProps {
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function OfficePage({ breadcrumbs, onNavigate }: OfficePageProps) {
  return (
    <>
      <PageHeroBanner
        eyebrow={`01 · ESSÊNCIA DA MARCA · ${FIRM_INFO.cityState}`}
        titlePrefix="Sobre o Escritório"
        titleHighlight="Carreira Advocacia"
        subtitle="Atuação jurídica técnica, ética e personalizada em Bauru e região."
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      {/* História & Declaração de Posicionamento */}
      <section aria-label="História e Posicionamento" className="bg-white py-14 lg:py-16">
        <div className="max-w-[1060px] mx-auto px-6 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase">
                TRAJETÓRIA EM BAURU/SP
              </p>
              <h2 className="font-display text-[30px] sm:text-[34px] font-normal text-[#082144] leading-[1.15]">
                {OFFICE_CONTENT.historyTitle}
              </h2>
              {OFFICE_CONTENT.historyParagraphs.map((paragraph, index) => (
                <p key={index} className="text-[15px] font-light leading-[1.7] text-[#2C4156]">
                  {paragraph}
                </p>
              ))}
              <p className="text-[12.5px] font-medium tracking-[0.04em] text-[#082144] pt-2">
                Registro Institucional: {FIRM_INFO.oabSocietyNumber}
              </p>
            </div>
            <div className="lg:col-span-5">
              <figure className="bg-[#F7F7F7] rounded-[6px] border border-[#D2D7DB] overflow-hidden shadow-[0_12px_32px_rgba(8,33,68,0.06)]">
                <img
                  src={OFFICE_CONTENT.photos[0].src}
                  alt={OFFICE_CONTENT.photos[0].alt}
                  className="w-full aspect-[16/10] object-cover"
                />
                <figcaption className="px-4 py-3 text-[12px] font-light text-[#2C4156]">
                  {OFFICE_CONTENT.photos[0].caption}
                </figcaption>
              </figure>
            </div>
          </div>

          <blockquote className="bg-[#082144] text-white rounded-[6px] px-7 sm:px-10 py-8 border border-[#7F99B2]/25">
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#7F99B2] uppercase mb-2">
              DECLARAÇÃO DE POSICIONAMENTO
            </p>
            <p className="font-display italic text-[20px] sm:text-[23px] font-normal leading-[1.4] text-[#F7F7F7]">
              “{OFFICE_CONTENT.positioningStatement}”
            </p>
          </blockquote>
        </div>
      </section>

      {/* Propósito, Missão e Visão */}
      <section aria-label="Propósito, Missão e Visão" className="bg-[#F7F7F7] py-14 lg:py-16 border-y border-[#D2D7DB]">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-[6px] border border-[#D2D7DB] p-7 shadow-[0_10px_28px_rgba(8,33,68,0.05)]">
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
                01 · PROPÓSITO
              </p>
              <h2 className="font-display text-[24px] font-normal text-[#082144] mb-3">
                Propósito
              </h2>
              <p className="text-[14.5px] font-light leading-[1.65] text-[#2C4156]">
                “{OFFICE_CONTENT.purpose}”
              </p>
            </article>

            <article className="bg-white rounded-[6px] border border-[#D2D7DB] p-7 shadow-[0_10px_28px_rgba(8,33,68,0.05)]">
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
                02 · MISSÃO
              </p>
              <h2 className="font-display text-[24px] font-normal text-[#082144] mb-3">
                Missão
              </h2>
              <p className="text-[14.5px] font-light leading-[1.65] text-[#2C4156]">
                “{OFFICE_CONTENT.mission}”
              </p>
            </article>

            <article className="bg-white rounded-[6px] border border-[#D2D7DB] p-7 shadow-[0_10px_28px_rgba(8,33,68,0.05)]">
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
                03 · VISÃO
              </p>
              <h2 className="font-display text-[24px] font-normal text-[#082144] mb-3">
                Visão
              </h2>
              <p className="text-[14.5px] font-light leading-[1.65] text-[#2C4156]">
                “{OFFICE_CONTENT.vision}”
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Valores Institucionais & Princípios Inegociáveis */}
      <section aria-label="Valores e Princípios" className="bg-white py-14 lg:py-16 border-b border-[#D2D7DB]">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
                VALORES INSTITUCIONAIS
              </p>
              <h2 className="font-display text-[28px] font-normal text-[#082144] mb-6">
                Conduta e Compromisso Ético
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {OFFICE_CONTENT.valuesList.map((val) => (
                  <div
                    key={val.number}
                    className="p-5 rounded-[6px] border border-[#D2D7DB] bg-[#F7F7F7]"
                  >
                    <h3 className="font-display text-[19px] font-normal text-[#082144] mb-1.5">
                      <span className="text-[#39586D] mr-2 font-sans text-[12px] font-medium">
                        {val.number}
                      </span>
                      {val.title}
                    </h3>
                    <p className="text-[13.5px] font-light leading-[1.6] text-[#2C4156]">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#2C4156] text-[#F7F7F7] rounded-[6px] p-7 shadow-[0_12px_30px_rgba(8,33,68,0.12)]">
              <p className="text-[11px] font-medium tracking-[0.16em] text-[#7F99B2] uppercase mb-4">
                PRINCÍPIOS INEGOCIÁVEIS
              </p>
              <ul className="space-y-4">
                {OFFICE_CONTENT.nonNegotiablePrinciples.map((principle, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 pb-3 border-b border-[#7F99B2]/20 last:border-b-0 last:pb-0"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#7F99B2] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span className="font-display text-[17px] font-normal leading-snug text-[#F7F7F7]">
                      {principle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais de Valor & Estrutura Física */}
      <section aria-label="Diferenciais e Estrutura" className="bg-[#F7F7F7] py-14 lg:py-16">
        <div className="max-w-[1060px] mx-auto px-6 space-y-12">
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase mb-2">
              DIFERENCIAIS DE VALOR
            </p>
            <h2 className="font-display text-[28px] font-normal text-[#082144] mb-6">
              Como Conduzimos o Atendimento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OFFICE_CONTENT.differentials.map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-[6px] border border-[#D2D7DB] bg-white"
                >
                  <h3 className="font-display text-[21px] font-normal text-[#082144] mb-2">
                    <span className="text-[#39586D] mr-2 font-sans text-[12px] font-medium">
                      {item.number}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-[14px] font-light leading-[1.65] text-[#2C4156]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-[28px] font-normal text-[#082144] mb-6">
              Estrutura Física em Bauru/SP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OFFICE_CONTENT.photos.map((photo) => (
                <figure
                  key={photo.id}
                  className="rounded-[6px] border border-[#D2D7DB] overflow-hidden bg-white shadow-[0_10px_28px_rgba(8,33,68,0.05)]"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <figcaption className="px-5 py-3.5 text-[13px] font-light text-[#2C4156]">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
