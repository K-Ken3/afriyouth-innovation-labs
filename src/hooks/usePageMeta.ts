import { useEffect } from "react";
import type { PageMeta } from "@/content/seo";

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Central SEO metadata. Each page passes a PageMeta object; Open Graph,
 * canonical and robots values are kept in sync without an extra dependency.
 */
export function usePageMeta(meta: PageMeta, options?: { noindex?: boolean; type?: "website" | "article" }): void {
  useEffect(() => {
    const fullTitle = `${meta.title} — AfriYouth Innovation Labs`;
    document.title = fullTitle;
    upsertMeta("name", "description", meta.description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:type", options?.type ?? "website");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "robots", options?.noindex ? "noindex, nofollow" : "index, follow");

    const url = new URL(meta.path, window.location.origin).toString();
    upsertMeta("property", "og:url", url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [meta, options?.noindex, options?.type]);
}
