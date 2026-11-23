import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContactFormCard } from '../components/ContactFormCard';
import { PageHeroBanner } from '../components/Layout';
import { FIRM_INFO, buildWhatsAppHref } from '../data/firm';
import { trackWhatsAppClick } from '../utils/analytics';
import type { BreadcrumbItem } from '../utils/router';

interface ContactPageProps {
  breadcrumbs: BreadcrumbItem[];
  prefillSubject?: string;
  onNavigate: (path: string) => void;
}

export function ContactPage({ breadcrumbs, prefillSubject, onNavigate }: ContactPageProps) {
  return (
    <>
      <PageHeroBanner
        eyebrow={`ATENDIMENTO · ${FIRM_INFO.cityState}`}
        titlePrefix="Fale com o"
        titleHighlight="Escritório"
        subtitle="Canal oficial para solicitação de atendimento jurídico presencial em Bauru/SP ou por videoconferência."
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label="Formulário e Canais de Atendimento" className="bg-white py-14 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulário no Bloco Slate Blue */}
            <div className="lg:col-span-7">
              <ContactFormCard initialSubject={prefillSubject} onNavigate={onNavigate} />
            </div>

            {/* Informações NAP, Horário, WhatsApp e Mapa */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#F7F7F7] rounded-[6px] border border-[#D2D7DB] p-7 space-y-4">
                <p className="text-[11px] font-medium tracking-[0.16em] text-[#39586D] uppercase">
                  UNIDADE BAURU / SP
                </p>
                <h2 className="font-display text-[26px] font-normal text-[#082144]">
                  {FIRM_INFO.name}
                </h2>
                <p className="text-[12.5px] font-medium text-[#39586D]">
                  {FIRM_INFO.oabSocietyNumber}
                </p>

                <div className="space-y-3 text-[14px] font-light text-[#2C4156] pt-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#082144] shrink-0 mt-1" aria-hidden="true" />
                    <span>{FIRM_INFO.addressLine}</span>
                  </div>
                  <div className="flex items-center gap-2.5 tabular-nums">
                    <Phone className="w-4 h-4 text-[#082144] shrink-0" aria-hidden="true" />
                    <a href={FIRM_INFO.phoneHref} className="hover:text-[#39586D] transition-colors">
                      {FIRM_INFO.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#082144] shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${FIRM_INFO.email.replace(/^\[E-MAIL:\s*|\]$/g, '')}`}
                      className="hover:text-[#39586D] transition-colors break-all"
                    >
                      {FIRM_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#082144] shrink-0 mt-1" aria-hidden="true" />
                    <span>{FIRM_INFO.businessHours}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href={buildWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('contact_page_button')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#082144] hover:bg-[#2C4156] text-white text-[13.5px] font-medium py-3 px-5 rounded-[4px] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#7F99B2]" aria-hidden="true" />
                    <span>Atendimento via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Mapa Incorporado de Bauru/SP */}
              <div className="bg-white rounded-[6px] border border-[#D2D7DB] overflow-hidden shadow-[0_10px_28px_rgba(8,33,68,0.05)]">
                <div className="px-5 py-3.5 bg-[#082144] text-white flex items-center justify-between gap-3">
                  <span className="text-[12.5px] font-medium">
                    Localização — Centro, Bauru/SP
                  </span>
                  <a
                    href={FIRM_INFO.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] text-[#D2D7DB] hover:text-white transition-colors"
                  >
                    <span>Abrir mapa</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
                <iframe
                  title="Mapa de localização em Bauru/SP — Carreira Advocacia"
                  src={FIRM_INFO.mapEmbedUrl}
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[260px] border-0 bg-[#F7F7F7]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
