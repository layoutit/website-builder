const APP_NAME = "LayoutIt!";
const APP_TITLE = "Bootstrap 5 Interface Builder | LayoutIt!";
const APP_DESCRIPTION =
  "LayoutIt! is a visual Bootstrap 5 interface builder for composing layouts, previewing markup, and exporting HTML or React code.";
const DEFAULT_SITE_URL = "https://build.layoutit.com";
const SOCIAL_IMAGE_WIDTH = "1826";
const SOCIAL_IMAGE_HEIGHT = "680";
const SOCIAL_IMAGE_ALT = "LayoutIt! interface builder preview";

function getSiteOrigin() {
  const rawSiteUrl = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
  const match = rawSiteUrl.match(/^https?:\/\/[^/]+(?:\/.*)?$/i);
  const siteUrl = match ? rawSiteUrl.replace(/\/$/, "") : DEFAULT_SITE_URL;

  return siteUrl.match(/^https?:\/\/[^/]+/i)?.[0] || DEFAULT_SITE_URL;
}

function setMeta(selector: string, attribute: "content" | "href", value: string) {
  const element = document.querySelector(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
}

export function applyDocumentMetadata() {
  const siteOrigin = getSiteOrigin();
  const canonicalUrl = `${siteOrigin}/`;
  const socialImageUrl = `${siteOrigin}/social.png`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: APP_NAME,
    description: APP_DESCRIPTION,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    image: socialImageUrl,
  };

  document.title = APP_TITLE;
  setMeta('meta[name="description"]', "content", APP_DESCRIPTION);
  setMeta('link[rel="canonical"]', "href", canonicalUrl);
  setMeta('meta[property="og:title"]', "content", APP_TITLE);
  setMeta('meta[property="og:description"]', "content", APP_DESCRIPTION);
  setMeta('meta[property="og:url"]', "content", canonicalUrl);
  setMeta('meta[property="og:site_name"]', "content", APP_NAME);
  setMeta('meta[property="og:image"]', "content", socialImageUrl);
  setMeta('meta[property="og:image:width"]', "content", SOCIAL_IMAGE_WIDTH);
  setMeta('meta[property="og:image:height"]', "content", SOCIAL_IMAGE_HEIGHT);
  setMeta('meta[property="og:image:alt"]', "content", SOCIAL_IMAGE_ALT);
  setMeta('meta[name="twitter:title"]', "content", APP_TITLE);
  setMeta('meta[name="twitter:description"]', "content", APP_DESCRIPTION);
  setMeta('meta[name="twitter:image"]', "content", socialImageUrl);
  setMeta('meta[name="twitter:image:alt"]', "content", SOCIAL_IMAGE_ALT);

  const schemaElement = document.querySelector(
    'script[type="application/ld+json"]'
  );

  if (schemaElement) {
    schemaElement.textContent = JSON.stringify(structuredData);
  }
}

export function syncQueryRobots() {
  const params = new URLSearchParams(window.location.search);
  const isSharedLayoutUrl = params.has("layout") || params.has("framework");
  const robotsElement = document.querySelector(
    'meta[name="robots"][data-layoutit-query-robots]'
  );

  if (robotsElement) {
    robotsElement.setAttribute(
      "content",
      isSharedLayoutUrl ? "noindex" : "index,follow"
    );
  }
}
