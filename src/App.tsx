import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CookieConsentBanner,
  SiteFooter,
  SiteHeader,
  WhatsAppFloatButton,
} from './components/Layout';
import { AreaDetailPage, AreasIndexPage } from './pages/AreasPages';
import { BlogArticlePage, BlogIndexPage } from './pages/BlogPages';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { PrivacyPolicyPage, TermsOfUsePage } from './pages/LegalPages';
import { OfficePage } from './pages/OfficePage';
import { TeamIndexPage, TeamProfilePage } from './pages/TeamPages';
import {
  initGoogleAnalyticsAndSearchConsole,
  readStoredCookieConsent,
  saveCookieConsent,
  trackPageView,
  type CookieConsentLevel,
} from './utils/analytics';
import { buildPageMetadata, normalizePath, parseRoute } from './utils/router';
import { applyDocumentSeo } from './utils/seo';

function getCurrentPathname(): string {
  if (typeof window === 'undefined') return '/';
  const base = import.meta.env.BASE_URL;
  let pathname = window.location.pathname;
  if (base !== '/' && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length - 1);
  }
  return normalizePath(pathname);
}

export default function App() {
  const [pathname, setPathname] = useState<string>(getCurrentPathname);
  const [prefillSubject, setPrefillSubject] = useState<string | undefined>(undefined);
  const [cookieConsent, setCookieConsent] = useState<CookieConsentLevel>(readStoredCookieConsent);
  const [cookieBannerOpen, setCookieBannerOpen] = useState<boolean>(
    () => readStoredCookieConsent() === null
  );

  const currentRoute = useMemo(() => parseRoute(pathname), [pathname]);

  const pageMetadata = useMemo(() => {
    const origin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : 'https://carreiraadvocacia.adv.br';
    return buildPageMetadata(currentRoute, origin);
  }, [currentRoute]);

  const navigate = useCallback((targetPath: string, nextPrefillSubject?: string) => {
    const normalized = normalizePath(targetPath);
    setPrefillSubject(nextPrefillSubject);

    if (typeof window !== 'undefined') {
      if (normalizePath(window.location.pathname) !== normalized) {
        const base = import.meta.env.BASE_URL;
        const nextUrl = base === '/' ? normalized : `${base.replace(/\/$/, '')}${normalized}`;
        window.history.pushState({}, '', nextUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setPathname(normalized);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      setPathname(getCurrentPathname());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    applyDocumentSeo(pageMetadata);

    if (typeof document !== 'undefined') {
      const scriptId = 'cs-adv-jsonld';
      let jsonLdEl = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!jsonLdEl) {
        jsonLdEl = document.createElement('script');
        jsonLdEl.id = scriptId;
        jsonLdEl.type = 'application/ld+json';
        document.head.appendChild(jsonLdEl);
      }
      jsonLdEl.textContent = JSON.stringify(pageMetadata.jsonLd);
    }

    initGoogleAnalyticsAndSearchConsole(cookieConsent);
    trackPageView(pageMetadata.canonicalPath, pageMetadata.title);
  }, [pageMetadata, cookieConsent]);

  const handleCookieConsent = useCallback((level: Exclude<CookieConsentLevel, null>) => {
    saveCookieConsent(level);
    setCookieConsent(level);
    setCookieBannerOpen(false);
    initGoogleAnalyticsAndSearchConsole(level);
  }, []);

  const renderPage = () => {
    switch (currentRoute.page) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'office':
        return <OfficePage breadcrumbs={pageMetadata.breadcrumbs} onNavigate={navigate} />;
      case 'areas-index':
        return <AreasIndexPage breadcrumbs={pageMetadata.breadcrumbs} onNavigate={navigate} />;
      case 'area-detail':
        return (
          <AreaDetailPage
            slug={currentRoute.slug}
            breadcrumbs={pageMetadata.breadcrumbs}
            onNavigate={navigate}
          />
        );
      case 'team-index':
        return <TeamIndexPage breadcrumbs={pageMetadata.breadcrumbs} onNavigate={navigate} />;
      case 'team-detail':
        return (
          <TeamProfilePage
            slug={currentRoute.slug}
            breadcrumbs={pageMetadata.breadcrumbs}
            onNavigate={navigate}
          />
        );
      case 'blog-index':
        return <BlogIndexPage breadcrumbs={pageMetadata.breadcrumbs} onNavigate={navigate} />;
      case 'blog-detail':
        return (
          <BlogArticlePage
            slug={currentRoute.slug}
            breadcrumbs={pageMetadata.breadcrumbs}
            onNavigate={navigate}
          />
        );
      case 'contact':
        return (
          <ContactPage
            breadcrumbs={pageMetadata.breadcrumbs}
            prefillSubject={prefillSubject}
            onNavigate={navigate}
          />
        );
      case 'privacy':
        return <PrivacyPolicyPage breadcrumbs={pageMetadata.breadcrumbs} onNavigate={navigate} />;
      case 'terms':
        return <TermsOfUsePage breadcrumbs={pageMetadata.breadcrumbs} onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7] text-[#2C4156]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#082144] focus:text-white focus:px-4 focus:py-2 focus:rounded-[4px] focus:text-[13px] focus:font-medium"
      >
        Ir para o conteúdo principal
      </a>

      <SiteHeader currentRoute={currentRoute} onNavigate={navigate} />

      <main id="conteudo-principal" className="flex-1">
        {renderPage()}
      </main>

      <SiteFooter
        onNavigate={navigate}
        onOpenCookieSettings={() => setCookieBannerOpen(true)}
      />

      <WhatsAppFloatButton />

      <CookieConsentBanner
        visible={cookieBannerOpen}
        onConsent={handleCookieConsent}
        onNavigate={navigate}
      />
    </div>
  );
}
