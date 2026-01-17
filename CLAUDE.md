# CLAUDE.md

## What is Invoo?

Invoicing software for Spanish freelancers, small businesses, and accounting firms.

**Two business models:**

| Audience | Offer | Model |
|----------|-------|-------|
| Autónomos & Pymes | Invoicing + free gestoría dashboard | B2C SaaS |
| Gestorías | Enterprise platform (white-label, API, multi-client) | B2B SaaS |

**Positioning**: Simple, fast, stress-free invoicing—with your gestoría already connected.

**Differentiators**:
- Invoicing only (no CRM, no bloat—just simple, effective invoice generation)
- Fast, distraction-free UX
- Real-time gestoría collaboration included in price
- Verifactu + TicketBAI compliant
- Clear pricing (no surprises)
- Discount module built-in

---

## This Repository

Marketing website for SEO, LLM visibility, and user acquisition. The app is a separate repo.

**Content focus**: Educational Verifactu guides, competitor comparisons, autónomo pain points.

**Main competitors** (for comparison content): Holded, Quipu, Billin, Contasimple, Anfix, Factorial.

**Voice**: Spain Spanish (tuteo). Empathetic, specific, no fluff.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, static export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI**: Radix UI primitives, Framer Motion
- **i18n**: next-intl (Spanish + English)
- **Testing**: Playwright (E2E), Vitest (unit)
- **Deployment**: GitHub Pages

---

## Commands

```bash
npm run dev               # Dev server on localhost:5200 (Turbopack)
npm run build             # Production build
npm run lint              # ESLint
npm run test              # Playwright E2E tests
npm run test:ui           # Playwright with UI
npm run test:unit         # Vitest unit tests
npm run test:unit:watch   # Vitest watch mode
npm run test:unit:coverage # Vitest coverage
```

---

## Project Structure

```
src/
├── app/[locale]/        # Pages with i18n routing
├── components/          # React components
│   └── ui/              # Design system primitives
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (cn, seo, schema, blog)
├── styles/              # CSS variables and design tokens
└── types/               # TypeScript types
messages/                # Translation files (en.json, es.json)
content/
└── blog/                # Blog articles (markdown .md)
public/
└── blog/                # Blog images (WebP)
tests/                   # Playwright E2E tests
.claude/
├── agents/              # Specialized agents
└── guides/              # Workflow documentation
```

**Key dependencies**: lucide-react (icons), embla-carousel-react, class-variance-authority (cva), gray-matter, next-mdx-remote

---

## Key Patterns

### i18n
- Translations: `messages/es.json` and `messages/en.json`
- Server: `const t = await getTranslations({ locale })`
- Client: `const t = useTranslations('namespace')`
- Always call `setRequestLocale(locale)` before using translations in server components
- Key naming: `page.section.element` (e.g., `home.hero.title`)
- **Always add new keys to both files** — missing keys cause runtime errors

### Pages
```typescript
// src/app/[locale]/example/page.tsx
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return generatePageMetadata({
    locale,
    path: "/example",
    title: t("example.metadata.title"),
    description: t("example.metadata.description"),
  });
}

export default async function PageName({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-background-primary">
      <Navigation locale={locale} />
      {/* Content */}
      <Footer locale={locale} />
    </div>
  );
}
```

### Blog Articles
- Location: `/content/blog/[category]/[slug].md`
- Categories: `analisis`, `comparaciones`, `consejos`, `guias`, `formacion`, `casos-de-exito`, `invoo`
- Images: `/public/blog/` (WebP, 16:9 ratio)
- Spanish only—EN routes redirect to ES

**Frontmatter:**
```yaml
---
title: "Article Title"
excerpt: "Brief description for SEO"
publishedAt: "2026-01-17"
author: "Equipo Invoo"
tags: ["tag1", "tag2"]
readingTime: 12
featured: false
editorPick: false
coverImage: "/blog/image-name.webp"
keyTakeaways:
  - "Key point 1"
  - "Key point 2"
faq:                        # optional
  - question: "Question?"
    answer: "Answer text"
---
```

### Components
- PascalCase: `HeroSection.tsx`, `ArticleCard.tsx`
- UI primitives: `src/components/ui/`
- Use `cn()` for class merging: `className={cn('base', condition && 'conditional')}`

### Styling
- Tailwind CSS with semantic tokens (`bg-background-primary`, `text-label-primary`)
- Dark mode default, uses `next-themes`
- Typography classes: `text-title1-emphasized`, `text-body`, `text-callout`
- Border radius: buttons `rounded-[12px]`, cards `rounded-[16px]`
- Mobile-first: `max-md:`, `md:`, `lg:`, `xl:`

### Images
- Store in `/public/` or `/public/blog/`
- Use `getImagePath()` utility
- Always include descriptive `alt` text
- Prefer WebP format

### Accessibility
- Use semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`)
- All interactive elements must be keyboard accessible
- Color contrast: minimum 4.5:1 for text
- Form inputs need visible labels
- Use `aria-label` only when visible text isn't possible

---

## Agents

Specialized agents in `.claude/agents/`:

| Agent | Use For |
|-------|---------|
| `product-lead` | Feature specs, roadmap planning (outside codebase) |
| `marketing-lead` | Marketing site strategy, content calendar, conversion optimization |
| `growth-lead` | GTM strategy, acquisition, launch planning |
| `compliance-regulator` | Spanish tax/legal (AEAT, Verifactu, TicketBAI) |
| `content-writer` | Blog articles, SEO content |
| `nextjs-architect` | Architecture decisions, refactoring |
| `nextjs-developer` | Feature implementation |
| `code-reviewer` | Code reviews, security audits |
| `seo-specialist` | Technical SEO, keywords |
| `market-intelligence` | Competitor analysis, research |
| `design-leader` | UX decisions, design systems |

**Deploy proactively** when the task matches an agent's specialty. Run in parallel when independent.

---

## Guides

Workflow guides in `.claude/guides/`:

| Guide | Purpose |
|-------|---------|
| [article-creation.md](.claude/guides/article-creation.md) | Blog article workflow |
| [social-post-creation.md](.claude/guides/social-post-creation.md) | Social media posts |

---

## Workflow

### Create Article
See `article-creation.md` guide. Agents involved:
- `seo-specialist` → keyword research, structure
- `market-intelligence` → competitor analysis
- `content-writer` → draft article
- `compliance-regulator` → review (if tax/legal topic)
- `code-reviewer` → final check

### Create Calculator
Similar to articles, plus development:
- `seo-specialist` → keyword research
- `market-intelligence` → competitor tools analysis
- `nextjs-architect` → design component structure
- `nextjs-developer` → implement calculator
- `compliance-regulator` → validate formulas (if tax-related)
- `code-reviewer` → final check

### Update Website (pages, components, content)
Classic development flow:
- `market-intelligence` → research best practices
- `design-leader` → UX decisions
- `nextjs-architect` → plan implementation
- `nextjs-developer` → implement changes
- `code-reviewer` → final check

---

## Common Mistakes to Avoid

- **Missing `setRequestLocale(locale)`** before using translations in server components
- **Hardcoded Spanish text** instead of using translation keys
- **Missing `alt` text** on images
- **Wrong blog category** — must be one of the 7 defined categories
- **Forgetting `editorPick`** in article frontmatter
- **Using `px` values** instead of Tailwind spacing tokens
- **Skipping `npm run build`** before committing — catches type errors early
- **Not running agents in parallel** when tasks are independent

---

## Conventions

- Commit messages: imperative mood, concise (`feat: add pricing section`, `fix: broken link`)
- Run `npm run build` before committing to catch errors
