/**
 * Blog Featured & Editor Pick Configuration
 *
 * This file controls which articles appear in the Featured carousel
 * and Editor Picks section on the blog page. Articles appear in the
 * exact order listed here (overrides default publishedAt sorting).
 *
 * To change what appears:
 * 1. Add/remove/reorder entries in the arrays below
 * 2. Each entry needs: { category: "category-slug", slug: "article-slug" }
 *
 * Featured carousel: max 5 slides recommended
 * Editor picks: exactly 4 articles (1 large + 3 small layout)
 *
 * NOTE: Invalid references (typos, deleted articles) will show warnings
 * in development mode and be silently skipped in production.
 */

/**
 * Valid blog categories - must match folder names in content/blog/
 */
export type ValidCategory =
  | "analisis"
  | "comparaciones"
  | "consejos"
  | "guias"
  | "formacion"
  | "casos-de-exito"
  | "invoo";

export interface ArticleReference {
  category: ValidCategory;
  slug: string;
}

/**
 * Featured articles for the carousel (max 5 recommended)
 * Order: first item = first slide
 */
export const featuredArticles: ArticleReference[] = [
  { category: "guias", slug: "tarifa-plana-autonomos-2026-guia-completa" },
  { category: "comparaciones", slug: "invoo-vs-holded-comparativa-2026" },
  { category: "guias", slug: "como-emitir-factura-rectificativa-guia" },
  { category: "guias", slug: "cuota-cero-autonomos-2026-comunidades-requisitos" },
  { category: "comparaciones", slug: "invoo-vs-quipu-comparativa-2026" },
];

/**
 * Editor pick articles (exactly 4 for the grid layout)
 * Order: first item = large card, items 2-4 = small cards on the right
 *
 * NOTE: Articles already in featuredArticles are automatically excluded
 * to prevent duplicates on the page.
 */
export const editorPickArticles: ArticleReference[] = [
  { category: "guias", slug: "modelo-303-vs-modelo-130-guia-autonomos" },
  { category: "guias", slug: "tramos-cuota-autonomos-2026-tabla-completa" },
  { category: "guias", slug: "retencion-irpf-factura-7-o-15-guia-autonomos" },
  { category: "guias", slug: "elegir-base-cotizacion-autonomos-2026" },
];
