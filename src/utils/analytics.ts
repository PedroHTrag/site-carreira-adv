declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type CookieConsentLevel = 'accepted' | 'essential' | null;

const CONSENT_STORAGE_KEY = 'cs_adv_cookie_consent_v1';

export function readStoredCookieConsent(): CookieConsentLevel {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === 'accepted' || raw === 'essential') return raw;
    return null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(level: Exclude<CookieConsentLevel, null>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, level);
  } catch {
    // Ignore storage quota / privacy mode restrictions
  }
}

export function initGoogleAnalyticsAndSearchConsole(consent: CookieConsentLevel): void {
  if (typeof document === 'undefined') return;

  // Google Search Console verification tag (when configured via VITE_GSC_VERIFICATION)
  const gscCode = import.meta.env.VITE_GSC_VERIFICATION;
  if (gscCode && !document.querySelector('meta[name="google-site-verification"]')) {
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = gscCode;
    document.head.appendChild(meta);
  }

  // Google Analytics 4 only loads when measurement ID is provided and analytics cookies are accepted
  const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (!ga4Id || consent !== 'accepted') return;

  if (!document.querySelector(`script[data-ga4-id="${ga4Id}"]`)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    script.dataset.ga4Id = ga4Id;
    document.head.appendChild(script);
  }
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
}

export function trackWhatsAppClick(source: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: source,
    });
  } else {
    window.dataLayer.push({
      event: 'whatsapp_click',
      event_category: 'engagement',
      event_label: source,
    });
  }
}

export function trackFormSubmission(subject: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'contact_form',
      event_label: subject,
    });
  } else {
    window.dataLayer.push({
      event: 'generate_lead',
      event_category: 'contact_form',
      event_label: subject,
    });
  }
}
