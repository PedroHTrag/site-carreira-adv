import type { PageSeoMetadata } from './router';

function upsertMetaTag(
  selector: string,
  attributes: Record<string, string>,
  content: string
): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    for (const [k, v] of Object.entries(attributes)) {
      el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applyDocumentSeo(metadata: PageSeoMetadata): void {
  if (typeof document === 'undefined') return;

  document.title = metadata.title;

  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://carreiraadvocacia.adv.br';
  const canonicalUrl = `${origin}${metadata.canonicalPath}`;

  upsertMetaTag('meta[name="description"]', { name: 'description' }, metadata.description);
  upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, metadata.title);
  upsertMetaTag(
    'meta[property="og:description"]',
    { property: 'og:description' },
    metadata.description
  );
  upsertMetaTag('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
  upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, metadata.title);
  upsertMetaTag(
    'meta[name="twitter:description"]',
    { name: 'twitter:description' },
    metadata.description
  );

  let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
}
