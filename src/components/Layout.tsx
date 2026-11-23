import React, { useState } from 'react';
import { ChevronRight, Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, X } from 'lucide-react';
import { FIRM_INFO, buildWhatsAppHref, getSiteAssetUrl } from '../data/firm';
import { trackWhatsAppClick, type CookieConsentLevel } from '../utils/analytics';
import type { BreadcrumbItem, RouteMatch } from '../utils/router';

export function FirmLogo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={getSiteAssetUrl('/assets/aistudio/Carreira_advogados_bfc86dee.svg')}
      alt="Carreira Advocacia"
      className={`w-auto select-none brightness-0 invert ${
        compact ? 'h-14 sm:h-16' : 'h-16 sm:h-[68px] lg:h-[78px]'
      }`}
    />
  );
}

interface SiteHeaderProps {
  currentRoute: RouteMatch;
  onNavigate: (path: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', path: '/', matchPages: ['home'] },
  { label: 'O Escritório', path: '/escritorio', matchPages: ['office'] },
  {
    label: 'Áreas de Atuação',
    path: '/areas-de-atuacao',
    matchPages: ['areas-index', 'area-detail'],
  },
  { label: 'Equipe', path: '/equipe', matchPages: ['team-index', 'team-detail'] },
  { label: 'Blog', path: '/blog', matchPages: ['blog-index', 'blog-detail'] },
  { label: 'Contato', path: '/contato', matchPages: ['contact'] },
];

export function SiteHeader({ currentRoute, onNavigate }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#082144] text-white border-b border-[#7F99B2]/20">
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8 h-[76px] lg:h-[88px] flex items-center justify-between gap-6">
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          aria-label="Carreira Advocacia — Página Inicial"
          className="whitespace-nowrap shrink-0 flex items-center py-1"
        >
          <FirmLogo />
        </a>

        <nav
          aria-label="Navegação Principal"
          className="hidden lg:flex items-center gap-7 text-[13.5px] font-normal text-[#D2D7DB]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.matchPages.includes(currentRoute.page);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b ${
                  isActive
                    ? 'text-white border-[#7F99B2]'
                    : 'border-transparent hover:text-white hover:border-[#7F99B2]/60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contato"
            onClick={(e) => handleLinkClick(e, '/contato')}
            className="hidden lg:inline-flex items-center justify-center bg-[#39586D] hover:bg-[#2C4156] text-white text-[13px] font-medium px-5 py-2.5 rounded-[4px] border border-[#7F99B2]/45 transition-colors whitespace-nowrap shrink-0"
          >
            Fale conosco
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[4px] border border-[#D2D7DB]/25 text-white hover:border-[#7F99B2] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#082144] border-t border-[#7F99B2]/20 px-6 py-4 space-y-1.5">
          <nav aria-label="Navegação Mobile" className="flex flex-col gap-1 text-[14px] font-normal">
            {NAV_ITEMS.map((item) => {
              const isActive = item.matchPages.includes(currentRoute.page);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`py-2.5 px-3 rounded-[4px] transition-colors ${
                    isActive
                      ? 'bg-[#2C4156] text-white'
                      : 'text-[#D2D7DB] hover:bg-[#2C4156]/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <a
            href="/contato"
            onClick={(e) => handleLinkClick(e, '/contato')}
            className="block text-center w-full mt-2 bg-[#F7F7F7] hover:bg-white text-[#082144] text-[14px] font-medium py-3 rounded-[4px] transition-colors"
          >
            Fale conosco
          </a>
        </div>
      )}
    </header>
  );
}

interface PageHeroBannerProps {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function PageHeroBanner({
  eyebrow,
  titlePrefix,
  titleHighlight,
  subtitle,
  breadcrumbs,
  onNavigate,
}: PageHeroBannerProps) {
  return (
    <section className="relative bg-[#082144] text-white overflow-hidden border-b border-[#7F99B2]/20">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <img
          src={FIRM_INFO.heroBackdrop}
          alt=""
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#082144]/95 via-[#082144]/90 to-[#2C4156]/80" />
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#D2D7DB]">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={crumb.path} className="inline-flex items-center gap-1.5">
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#7F99B2]" aria-hidden="true" />}
                  {isLast ? (
                    <span className="text-white font-medium">{crumb.label}</span>
                  ) : (
                    <a
                      href={crumb.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(crumb.path);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <p className="text-[11px] font-medium tracking-[0.16em] text-[#7F99B2] uppercase mb-2.5">
          {eyebrow}
        </p>
        <h1 className="font-display text-[34px] sm:text-[42px] lg:text-[46px] font-normal leading-[1.12] text-white max-w-[820px] text-balance">
          {titlePrefix}{' '}
          {titleHighlight && <span className="italic text-[#7F99B2]">{titleHighlight}</span>}
        </h1>
        {subtitle && (
          <p className="mt-4 text-[15px] font-light leading-[1.6] text-[#D2D7DB] max-w-[680px]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

interface SiteFooterProps {
  onNavigate: (path: string) => void;
  onOpenCookieSettings: () => void;
}

export function SiteFooter({ onNavigate, onOpenCookieSettings }: SiteFooterProps) {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#082144] border-t border-[#7F99B2]/20 text-[#D2D7DB]">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#7F99B2]/20">
          <div className="md:col-span-5 space-y-3">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              aria-label="Carreira Advocacia — Página Inicial"
              className="inline-block"
            >
              <FirmLogo compact />
            </a>
            <p className="text-[13.5px] font-light leading-relaxed text-[#D2D7DB] max-w-[360px]">
              {FIRM_INFO.name} — atuação jurídica técnica, ética e personalizada em{' '}
              {FIRM_INFO.cityState}.
            </p>
            <p className="text-[12px] font-medium tracking-[0.08em] text-[#7F99B2]">
              Sociedade de Advogados · {FIRM_INFO.oabSocietyNumber}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-[13.5px] font-light">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#7F99B2] mb-3">
              Institucional
            </p>
            <div className="flex flex-col gap-2">
              <a href="/" onClick={(e) => handleLink(e, '/')} className="hover:text-white">
                Home
              </a>
              <a
                href="/escritorio"
                onClick={(e) => handleLink(e, '/escritorio')}
                className="hover:text-white"
              >
                O Escritório
              </a>
              <a
                href="/areas-de-atuacao"
                onClick={(e) => handleLink(e, '/areas-de-atuacao')}
                className="hover:text-white"
              >
                Áreas de Atuação
              </a>
              <a
                href="/equipe"
                onClick={(e) => handleLink(e, '/equipe')}
                className="hover:text-white"
              >
                Equipe
              </a>
              <a
                href="/blog"
                onClick={(e) => handleLink(e, '/blog')}
                className="hover:text-white"
              >
                Blog
              </a>
              <a
                href="/contato"
                onClick={(e) => handleLink(e, '/contato')}
                className="hover:text-white"
              >
                Contato
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3 text-[13.5px] font-light">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#7F99B2] mb-3">
              Unidade Bauru/SP
            </p>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#7F99B2] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{FIRM_INFO.addressLine}</span>
            </div>
            <div className="flex items-center gap-2.5 tabular-nums">
              <Phone className="w-4 h-4 text-[#7F99B2] shrink-0" aria-hidden="true" />
              <a href={FIRM_INFO.phoneHref} className="hover:text-white transition-colors">
                {FIRM_INFO.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#7F99B2] shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${FIRM_INFO.email.replace(/^\[E-MAIL:\s*|\]$/g, '')}`}
                className="hover:text-white transition-colors"
              >
                {FIRM_INFO.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#98A1AA]">
          <p>
            © {new Date().getFullYear()} {FIRM_INFO.name}. Conteúdo exclusivamente informativo
            (Provimento 205/2021 OAB).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="/politica-de-privacidade"
              onClick={(e) => handleLink(e, '/politica-de-privacidade')}
              className="hover:text-white transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos-de-uso"
              onClick={(e) => handleLink(e, '/termos-de-uso')}
              className="hover:text-white transition-colors"
            >
              Termos de Uso
            </a>
            <button
              type="button"
              onClick={onOpenCookieSettings}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Preferências de Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('floating_button')}
      aria-label="Falar pelo WhatsApp com Carreira Advocacia"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 bg-[#082144] hover:bg-[#2C4156] text-white border border-[#7F99B2] px-4 py-3 rounded-full shadow-[0_12px_32px_rgba(8,33,68,0.38)] transition-colors"
    >
      <MessageCircle className="w-5 h-5 text-[#7F99B2] shrink-0" aria-hidden="true" />
      <span className="text-[13px] font-medium whitespace-nowrap hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}

interface CookieBannerProps {
  visible: boolean;
  onConsent: (level: Exclude<CookieConsentLevel, null>) => void;
  onNavigate: (path: string) => void;
}

export function CookieConsentBanner({ visible, onConsent, onNavigate }: CookieBannerProps) {
  if (!visible) return null;

  return (
    <aside
      aria-label="Aviso de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-[460px] z-50 bg-[#082144] text-white border border-[#7F99B2]/35 rounded-[6px] p-5 shadow-2xl"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#7F99B2] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-[12.5px] font-light leading-relaxed text-[#D2D7DB]">
          <p className="font-medium text-white mb-1">Privacidade e Cookies (LGPD)</p>
          <p className="mb-3">
            Utilizamos cookies essenciais para o funcionamento do site e, mediante seu
            consentimento, métricas agregadas de acesso (GA4). Consulte nossa{' '}
            <a
              href="/politica-de-privacidade"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/politica-de-privacidade');
              }}
              className="underline text-white hover:text-[#7F99B2]"
            >
              Política de Privacidade
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onConsent('accepted')}
              className="bg-[#F7F7F7] hover:bg-white text-[#082144] text-[12px] font-medium px-4 py-2 rounded-[4px] transition-colors cursor-pointer"
            >
              Aceitar todos
            </button>
            <button
              type="button"
              onClick={() => onConsent('essential')}
              className="border border-[#D2D7DB]/35 hover:border-white/70 text-white text-[12px] font-normal px-4 py-2 rounded-[4px] transition-colors cursor-pointer"
            >
              Apenas essenciais
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
