# Schema.org Structured Data Implementation

## Overview
Comprehensive schema.org structured data implementation for Invoo Next.js 15 static site.

## Implementation Date
December 11, 2025

## Changes Summary

### Phase 1: Updated schema.ts library (/src/lib/schema.ts)

#### Fixed
- All Organization schema email references now use `hello@invoo.es` consistently
- Renamed `generateSoftwareApplicationSchema()` to `generateWebApplicationSchema()` (more accurate for browser-based SaaS)
- Added backward compatibility alias for old function name
- Added `inLanguage: locale` property to all schema generators

#### New Schema Generators Added
- `generateCollectionPageSchema()` - For blog listing and category pages
- `generateContactPageSchema()` - For contact page
- Both follow 2025 best practices with proper required fields and XSS prevention

### Phase 2: Root Layout Global Schemas (/src/app/[locale]/layout.tsx)

#### Added
- Organization schema rendered in `<head>` section (global, appears on all pages)
- WebSite schema rendered in `<head>` section (global, appears on all pages)
- Both schemas use proper Next.js 15 pattern with XSS prevention (`replace(/</g, '\\u003c')`)
- Schemas are locale-aware and render with proper suppressHydrationWarning

### Phase 3: Updated Existing Page Schemas

#### Homepage (/src/app/[locale]/page.tsx)
- ✅ Updated from SoftwareApplication → WebApplication schema
- ✅ Includes proper locale and feature list

#### Pricing Page (/src/app/[locale]/pricing/page.tsx)
- ✅ Updated to WebApplication schema
- ✅ **Added** Product schema with multiple offers (Pro and Gestoría plans)
- ✅ Both schemas coexist with unique IDs

#### Blog Article Pages (/src/app/[locale]/blog/[category]/[slug]/page.tsx)
- ✅ **Added** BreadcrumbList schema alongside existing Article schema
- ✅ Proper navigation hierarchy for SEO

### Phase 4: Added Missing Page Schemas

#### Blog Listing (/src/app/[locale]/blog/page.tsx)
- ✅ **Added** CollectionPage schema

#### Blog Category (/src/app/[locale]/blog/[category]/page.tsx)
- ✅ **Added** CollectionPage schema with category-specific data

#### Contact Page (/src/app/[locale]/contact/page.tsx)
- ✅ **Added** ContactPage schema

#### Landing Pages
- ✅ /freelancers - **Added** WebApplication schema with audience targeting
- ✅ /gestorias - **Added** WebApplication schema with audience targeting
- ✅ /pymes - **Added** WebApplication schema with audience targeting

#### Legal Pages
- ✅ /privacy - **Added** WebPage schema
- ✅ /terms - **Added** WebPage schema
- ✅ /cookies - **Added** WebPage schema
- ✅ /legal-notice - **Added** WebPage schema

### Phase 5: Cleanup

#### Removed/Updated
- ✅ Renamed `scripts/inject-jsonld.mjs` → `scripts/inject-jsonld.mjs.deprecated`
- ✅ Updated `package.json` build:static script (removed post-build injection)
- ✅ Updated `JsonLd.tsx` component with accurate documentation
- ✅ Added XSS prevention directly in JsonLd component

## Technical Implementation Details

### XSS Prevention
All JSON-LD scripts use `.replace(/</g, '\\u003c')` to prevent XSS attacks by escaping `<` characters.

### Schema Rendering Pattern

**Global schemas (in layout.tsx head):**
\`\`\`tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
  }}
  suppressHydrationWarning
/>
\`\`\`

**Page-specific schemas (in page components body):**
\`\`\`tsx
<JsonLd data={schema} id="schema-id" />
\`\`\`

### Schema Linking
All schemas properly link to each other using `@id` references:
- Organization: `https://invoo.es/#organization`
- WebSite: `https://invoo.es/#website`
- WebApplication: `https://invoo.es/#software`
- Product: `https://invoo.es/#product`

## Schema Coverage by Page Type

| Page Type | Organization | WebSite | WebApplication | Product | Article | BreadcrumbList | CollectionPage | ContactPage | WebPage |
|-----------|--------------|---------|----------------|---------|---------|----------------|----------------|-------------|---------|
| Homepage | ✅ | ✅ | ✅ | | | | | | |
| Pricing | ✅ | ✅ | ✅ | ✅ | | | | | |
| Blog Listing | ✅ | ✅ | | | | | ✅ | | |
| Blog Category | ✅ | ✅ | | | | | ✅ | | |
| Blog Article | ✅ | ✅ | | | ✅ | ✅ | | | |
| Contact | ✅ | ✅ | | | | | | ✅ | |
| Freelancers | ✅ | ✅ | ✅ | | | | | | |
| Gestorías | ✅ | ✅ | ✅ | | | | | | |
| Pymes | ✅ | ✅ | ✅ | | | | | | |
| Legal Pages | ✅ | ✅ | | | | | | | ✅ |

## Compliance & Best Practices

### ✅ Following Google Guidelines
- No self-created AggregateRating (violates Google's policy)
- All schemas use proper `@type` definitions
- Proper use of `@id` for entity linking
- XSS-safe JSON-LD rendering

### ✅ 2025 Schema.org Standards
- `inLanguage` property on all locale-aware schemas
- Proper use of WebApplication over SoftwareApplication for SaaS
- Structured breadcrumb navigation
- CollectionPage for listings
- ContactPage for contact forms

### ✅ Technical Requirements Met
- TypeScript strict mode compliance
- Next.js 15 App Router compatible
- Static export compatible (no post-build scripts needed)
- Server-side rendering in layout and pages
- No client-side schema manipulation

## Build Verification

✅ Build completed successfully with no errors
✅ All 72 static pages generated
✅ JSON-LD schemas appear in generated HTML
✅ Both global (head) and page-specific (body) schemas render correctly

## Testing Recommendations

1. **Google Rich Results Test**: Validate key pages
   - Homepage: https://invoo.es/es/
   - Pricing: https://invoo.es/es/pricing/
   - Blog article: https://invoo.es/es/blog/[category]/[slug]/

2. **Schema.org Validator**: Verify JSON-LD structure
   - https://validator.schema.org/

3. **Google Search Console**: Monitor rich results coverage after deployment

## Future Enhancements (Optional)

- Add `FAQPage` schema to FAQ page (already exists in lib/schema.ts)
- Add `HowTo` schema for tutorial articles
- Add `VideoObject` schema when video content is added
- Monitor for new schema types from schema.org

## Files Modified

### Core Library
- `/src/lib/schema.ts` - Schema generators

### Layout & Components
- `/src/app/[locale]/layout.tsx` - Global schemas
- `/src/components/JsonLd.tsx` - Schema rendering component

### Pages Updated
- `/src/app/[locale]/page.tsx`
- `/src/app/[locale]/pricing/page.tsx`
- `/src/app/[locale]/blog/page.tsx`
- `/src/app/[locale]/blog/[category]/page.tsx`
- `/src/app/[locale]/blog/[category]/[slug]/page.tsx`
- `/src/app/[locale]/contact/page.tsx`
- `/src/app/[locale]/freelancers/page.tsx`
- `/src/app/[locale]/gestorias/page.tsx`
- `/src/app/[locale]/pymes/page.tsx`
- `/src/app/[locale]/privacy/page.tsx`
- `/src/app/[locale]/terms/page.tsx`
- `/src/app/[locale]/cookies/page.tsx`
- `/src/app/[locale]/legal-notice/page.tsx`

### Configuration
- `/package.json` - Removed post-build injection script

### Deprecated
- `/scripts/inject-jsonld.mjs.deprecated` - No longer used

---

**Status**: ✅ COMPLETE
**Next.js Build**: ✅ PASSING
**All Phases**: ✅ IMPLEMENTED
