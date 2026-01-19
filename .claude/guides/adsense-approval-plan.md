# AdSense Approval Plan

## Executive Summary

The blog was rejected from AdSense, likely due to **weak E-E-A-T signals** (Experience, Expertise, Authoritativeness, Trustworthiness). Since we don't have individual expert authors, we'll establish credibility through **company authority**, **source transparency**, and **editorial methodology**.

---

## Current State Assessment

### What's Already Good ✅

| Requirement | Status | Details |
|-------------|--------|---------|
| Content quantity | ✅ Pass | 22 articles (requires 15-25) |
| Content depth | ✅ Pass | Average 4,010 words (requires 800-1500+) |
| Original content | ✅ Pass | No duplicates, original research |
| Legal pages | ✅ Pass | About, Contact, Privacy, Terms, Legal Notice, Cookies |
| Company legitimacy | ✅ Pass | Real company (Roques OÜ), real address, real contact |
| HTTPS | ✅ Pass | Site uses HTTPS |
| Mobile-friendly | ✅ Pass | Responsive design |
| Empty categories | ✅ Pass | Already hidden from crawlers/users |

### Issues to Fix ❌

| Issue | Impact | Solution |
|-------|--------|----------|
| No visible content methodology | HIGH | Add "How we create content" section |
| No source citations on articles | HIGH | Add sources section to each article |
| No editorial standards shown | HIGH | Create editorial transparency |
| Generic author with no context | MEDIUM | Strengthen "Equipo Invoo" credibility |
| No content disclaimers | MEDIUM | Add educational disclaimers |
| No related articles | MEDIUM | Add engagement signals |
| JSON-LD lacks organization depth | LOW | Enhance structured data |

---

## Strategy: Company Authority + Source Transparency

Instead of fake individual authors, we establish credibility through:

1. **Editorial Methodology** - Show HOW content is created
2. **Source Citations** - Show WHERE information comes from
3. **Official References** - Link to AEAT, BOE, official docs
4. **Educational Positioning** - Clear about what we are and aren't
5. **Company Transparency** - Real company, real mission

---

## Implementation Plan

### Phase 1: Editorial Methodology (Critical)

**Goal:** Show users and Google how content is created and verified

#### 1.1 Create "Nuestra Metodología" Page

**File:** `src/app/[locale]/metodologia/page.tsx`

**Content sections:**
1. **Cómo creamos nuestro contenido**
   - Research process (official sources first)
   - Verification steps
   - Update frequency

2. **Nuestras fuentes**
   - AEAT (Agencia Tributaria)
   - BOE (Boletín Oficial del Estado)
   - Seguridad Social
   - Official regulations and circulares

3. **Nuestro compromiso**
   - Accuracy over speed
   - Regular updates when regulations change
   - Clear dating of all content

4. **Limitaciones**
   - Educational content, not professional advice
   - Recommend consulting with gestoría/asesor for specific cases

**Translations:** Add to both `messages/es.json` and `messages/en.json`

#### 1.2 Add Methodology Link to Footer

**File:** `src/components/Footer.tsx`

Add link to methodology page in the "Recursos" or "Legal" section.

#### 1.3 Update About Page

**File:** `src/app/[locale]/about/page.tsx`

**Add new section: "Nuestro enfoque editorial"**
- Brief version of methodology
- Link to full methodology page
- Emphasize: "Contenido basado en fuentes oficiales españolas"

---

### Phase 2: Article Source Citations (Critical)

**Goal:** Every article shows its sources prominently

#### 2.1 Create ArticleSources Component

**File:** `src/components/blog/ArticleSources.tsx`

**Displays:**
- Section title: "Fuentes y referencias"
- List of official sources used
- Links to AEAT, BOE, etc.
- Last verified date

**Example output:**
```
📚 Fuentes y referencias

Este artículo está basado en:
• AEAT - Agencia Tributaria (aeat.es)
• BOE - Real Decreto 1007/2023 (Verifactu)
• Seguridad Social - Cotizaciones 2026

Última verificación: Enero 2026
```

#### 2.2 Create ArticleDisclaimer Component

**File:** `src/components/blog/ArticleDisclaimer.tsx`

**Displays:**
```
ℹ️ Aviso importante

Este contenido es informativo y educativo. La normativa fiscal puede cambiar
y cada situación es única. Recomendamos consultar con un asesor fiscal o
gestoría para tu caso específico.
```

#### 2.3 Add Sources to Article Frontmatter

**Update blog frontmatter schema to support:**
```yaml
---
title: "Verifactu 2025-2026: Guía Completa"
# ... existing fields ...
sources:
  - name: "AEAT - Agencia Tributaria"
    url: "https://sede.agenciatributaria.gob.es"
  - name: "BOE - Real Decreto 1007/2023"
    url: "https://www.boe.es/eli/es/rd/2023/11/08/1007"
lastVerified: "2026-01-15"
---
```

#### 2.4 Update Article Page Layout

**File:** `src/app/[locale]/blog/[category]/[slug]/page.tsx`

**Add after article content:**
1. `<ArticleSources />` - Shows sources used
2. `<ArticleDisclaimer />` - Educational disclaimer
3. `<RelatedArticles />` - Engagement (Phase 3)

---

### Phase 3: Strengthen Author Identity (Important)

**Goal:** Make "Equipo Invoo" a credible editorial voice

#### 3.1 Update Author Display

**File:** `src/components/blog/ArticleHeader.tsx`

**Current:** Just shows "Equipo Invoo"

**Enhanced:**
- "Equipo Invoo"
- "Equipo editorial especializado en fiscalidad y facturación para autónomos"
- Small Invoo logo as avatar

#### 3.2 Create Team/Editorial Component

**File:** `src/components/about/EditorialTeam.tsx`

**For About page - displays:**
```
Equipo Editorial Invoo

Somos un equipo dedicado a simplificar la fiscalidad y facturación
para autónomos y pymes españolas. Nuestro contenido se basa en:

✓ Fuentes oficiales (AEAT, BOE, Seguridad Social)
✓ Normativa vigente actualizada
✓ Experiencia real con autónomos y gestorías

Todo nuestro contenido es revisado y actualizado regularmente
para reflejar los últimos cambios normativos.
```

#### 3.3 Update JSON-LD Schema

**File:** `src/lib/schema.ts`

**Enhance organization schema:**
```typescript
{
  "@type": "Organization",
  "name": "Invoo",
  "description": "Software de facturación para autónomos y pymes españolas",
  "knowsAbout": [
    "Facturación electrónica",
    "Verifactu",
    "TicketBAI",
    "Fiscalidad de autónomos",
    "Normativa AEAT"
  ],
  // ... existing fields
}
```

**Enhance article schema:**
```typescript
{
  "@type": "Article",
  "author": {
    "@type": "Organization",  // Changed from Person
    "name": "Equipo Invoo",
    "url": "https://invoo.es/es/about/",
    "description": "Equipo editorial especializado en fiscalidad y facturación"
  },
  "publisher": { "@id": ORGANIZATION_ID },
  "isBasedOn": sources.map(s => s.url),  // Source URLs
  "dateModified": lastVerified || updatedAt,
  // ... existing fields
}
```

---

### Phase 4: Related Articles (Important)

**Goal:** Improve engagement signals and internal linking

#### 4.1 Create Related Articles Utility

**File:** `src/lib/blog.ts` (add function)

```typescript
function getRelatedBlogPosts(
  currentPost: BlogPostMetadata,
  limit: number = 3
): BlogPostMetadata[]
```

**Algorithm:**
1. Same category + shared tags (highest priority)
2. Same category
3. Shared tags
4. Featured/Editor Pick bonus
5. Recent posts fallback

#### 4.2 Create RelatedArticles Component

**File:** `src/components/blog/RelatedArticles.tsx`

**Displays:**
- Section title: "Artículos relacionados"
- 3 article cards (responsive grid)
- Uses existing `ArticleCard` component

---

### Phase 5: Article Updates (Batch Work)

**Goal:** Add sources to existing articles

#### 5.1 Source Mapping by Category

| Category | Primary Sources |
|----------|-----------------|
| **Guías** (tax guides) | AEAT, BOE, Seguridad Social |
| **Comparaciones** | Product websites, pricing pages |
| **Consejos** | AEAT, professional best practices |
| **Análisis** | Original research, AEAT data |

#### 5.2 Update All 22 Articles

Add to each article frontmatter:
```yaml
sources:
  - name: "Source Name"
    url: "https://..."
lastVerified: "2026-01-XX"
```

**Priority articles (most YMYL):**
1. Verifactu guides
2. Modelo 303/130 guides
3. Cuotas autónomos
4. IRPF retención
5. Tarifa plana

---

## File Changes Summary

### New Files

| File | Description |
|------|-------------|
| `src/app/[locale]/metodologia/page.tsx` | Editorial methodology page |
| `src/components/blog/ArticleSources.tsx` | Sources citation component |
| `src/components/blog/ArticleDisclaimer.tsx` | Educational disclaimer |
| `src/components/blog/RelatedArticles.tsx` | Related articles component |
| `src/components/about/EditorialTeam.tsx` | Editorial team section |

### Modified Files

| File | Changes |
|------|---------|
| `src/types/blog.ts` | Add `sources` and `lastVerified` fields |
| `src/lib/blog.ts` | Parse new fields, add `getRelatedBlogPosts()` |
| `src/lib/schema.ts` | Enhance Organization and Article schemas |
| `src/app/[locale]/blog/[category]/[slug]/page.tsx` | Add Sources, Disclaimer, Related |
| `src/app/[locale]/about/page.tsx` | Add EditorialTeam section |
| `src/components/blog/ArticleHeader.tsx` | Enhanced author display |
| `src/components/Footer.tsx` | Add methodology link |
| `messages/es.json` | Add methodology, sources, disclaimer translations |
| `messages/en.json` | Add methodology, sources, disclaimer translations |
| `content/blog/**/*.md` | Add sources and lastVerified to all 22 articles |

---

## Implementation Priority

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| **P0** | Create ArticleSources component | Low | Critical |
| **P0** | Create ArticleDisclaimer component | Low | Critical |
| **P0** | Add sources to top 10 YMYL articles | Medium | Critical |
| **P0** | Create Metodología page | Medium | High |
| **P1** | Update About page with editorial section | Low | High |
| **P1** | Enhance JSON-LD schemas | Low | Medium |
| **P1** | Create RelatedArticles component | Medium | Medium |
| **P2** | Add sources to remaining 12 articles | Medium | Medium |
| **P2** | Add methodology link to footer | Low | Low |

---

## Content Templates

### Sources Section Template (Spanish)
```markdown
## Fuentes y referencias

Este artículo está basado en documentación oficial:

- **AEAT** - [Agencia Tributaria](https://sede.agenciatributaria.gob.es)
- **BOE** - [Real Decreto 1007/2023](https://www.boe.es/eli/es/rd/2023/11/08/1007)
- **Seguridad Social** - [Bases y tipos de cotización](https://www.seg-social.es)

*Última verificación: Enero 2026*
```

### Disclaimer Template (Spanish)
```markdown
> **Aviso importante**: Este contenido es informativo y educativo, basado en
> la normativa vigente a fecha de publicación. La legislación fiscal puede
> cambiar y cada situación es única. Recomendamos consultar con un asesor
> fiscal o gestoría para tu caso específico.
```

### Methodology Page Outline
```markdown
# Nuestra Metodología Editorial

## Cómo creamos nuestro contenido

En Invoo, cada artículo sigue un proceso riguroso:

1. **Investigación** - Consultamos fuentes oficiales (AEAT, BOE, Seguridad Social)
2. **Redacción** - Traducimos la normativa a lenguaje claro y práctico
3. **Verificación** - Contrastamos con la legislación vigente
4. **Actualización** - Revisamos cuando hay cambios normativos

## Nuestras fuentes principales

- Agencia Tributaria (AEAT)
- Boletín Oficial del Estado (BOE)
- Tesorería General de la Seguridad Social
- Normativa autonómica (TicketBAI, etc.)

## Nuestro compromiso

- ✓ Precisión sobre velocidad
- ✓ Fuentes oficiales siempre citadas
- ✓ Fechas de verificación visibles
- ✓ Actualizaciones cuando cambia la normativa

## Limitaciones

Nuestro contenido es educativo e informativo. No sustituye el
asesoramiento profesional. Para tu situación específica,
recomendamos consultar con un asesor fiscal o gestoría.
```

---

## Testing Checklist

### Before Resubmitting to AdSense

- [ ] Metodología page exists and is linked from footer
- [ ] All P0 articles have sources section
- [ ] Disclaimer appears on all articles
- [ ] About page has editorial section
- [ ] JSON-LD validates (Google Rich Results Test)
- [ ] Related articles show on article pages
- [ ] `npm run build` succeeds
- [ ] Both ES and EN locales work
- [ ] Mobile layout works
- [ ] No console errors

### Content Verification

- [ ] All source URLs are valid and accessible
- [ ] lastVerified dates are recent (within 3 months)
- [ ] Disclaimer text is consistent across articles

---

## Timeline

| Phase | Tasks | Estimate |
|-------|-------|----------|
| Phase 1 | Metodología page + translations | 2 hours |
| Phase 2 | Sources + Disclaimer components | 2 hours |
| Phase 3 | Author/editorial enhancements | 1 hour |
| Phase 4 | Related articles | 1-2 hours |
| Phase 5 | Update 22 articles with sources | 2-3 hours |
| Testing | Validation and fixes | 1 hour |
| **Total** | | **9-11 hours** |

---

## Post-Implementation

### Wait Period

After implementing changes, wait **2-4 weeks** before resubmitting:
- Google needs to recrawl the site
- New structured data needs indexing
- Shows consistent content updates

### Resubmission Checklist

1. Verify all changes are deployed
2. Check Google Search Console for crawl errors
3. Validate structured data in Rich Results Test
4. Submit sitemap refresh in Search Console
5. Reapply to AdSense

---

## Why This Approach Works

| E-E-A-T Signal | How We Address It |
|----------------|-------------------|
| **Experience** | Company built for Spanish autónomos, understands their problems |
| **Expertise** | Content based on official sources, methodology transparent |
| **Authoritativeness** | Cites AEAT, BOE, official regulations directly |
| **Trustworthiness** | Real company, clear disclaimers, dated content, source links |

This approach is **honest** (no fake credentials), **sustainable** (easy to maintain), and **verifiable** (sources are clickable).
