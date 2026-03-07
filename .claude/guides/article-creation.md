# Article Creation Guide for Agents

> **Purpose**: Step-by-step workflow for creating blog articles for Invoo. This guide is the authoritative source for agents creating content.

---

## ⚠️ Invoo Status: Waiting List Mode

**CRITICAL:** Invoo is currently in **waiting list mode**. All CTAs must direct users to join the waiting list, NOT to try the product.

| ❌ DO NOT USE | ✅ USE INSTEAD |
|---------------|----------------|
| "Prueba gratis X días" | "Únete a la lista de espera" |
| "Free trial" | "Join the waiting list" |
| "Empieza gratis hoy" | "Únete a la lista de espera de Invoo" |
| "7/14 días gratis" | "Los primeros 100 usuarios ahorran 50% para siempre" |

**When Invoo goes live:** The free trial period will be **7 days** (not 14). Update CTAs accordingly when launched.

---

## Quick Reference

| Item | Value |
|------|-------|
| Content location | `/content/blog/[category]/[slug].md` or `.mdx` |
| Images location | `/public/blog/[image-name].webp` |
| Type definitions | `src/types/blog.ts` |
| Blog loader | `src/lib/blog.ts` |
| Supported format | Markdown (`.md`) or MDX (`.mdx`) for components |
| MDX components | PullQuote, InfoCard, AccordionGroup, Tables (see Section 6.5) |

---

## 1. Pre-Writing Checklist

Before writing any article:

- [ ] **Category selected** (see Section 3)
- [ ] **Target keyword identified** (Spanish, with search volume)
- [ ] **Unique angle defined** (what's different from competitors?)
- [ ] **Internal link opportunities** noted (existing articles to link to)
- [ ] **Cover image planned** (WebP format, descriptive name)

---

## 2. Critical Writing Rules ⚠️

> **READ THIS FIRST.** These rules prevent the most common content mistakes.

### Paragraph Structure

**Web readers scan, not read. Keep paragraphs short and focused.**

❌ **BAD - Too dense (5+ sentences, 100+ words):**
```markdown
Verifactu es obligatorio desde 2025 para todas las empresas que emitan facturas en España. Esta normativa afecta a autónomos, pymes y grandes empresas por igual. Si no lo cumples, las multas pueden llegar hasta €10,000 dependiendo de la gravedad del incumplimiento. La buena noticia es que entender qué necesitas hacer es más simple de lo que parece. En este artículo te vamos a explicar exactamente cómo prepararte sin complicaciones y sin gastar más de lo necesario.
```

✅ **GOOD - Scannable (2-3 sentences, 40-60 words):**
```markdown
Verifactu es obligatorio desde 2025 para todas las empresas que emitan facturas en España. Si no lo cumples, **las multas pueden llegar hasta €10,000**.

Pero no te asustes. En este artículo te explicamos exactamente cómo prepararte sin complicaciones.
```

✅ **EVEN BETTER - Vary paragraph length for rhythm:**
```markdown
Verifactu es obligatorio desde 2025. **Las multas pueden llegar hasta €10,000**.

Pero aquí está lo que nadie te cuenta: cumplir es más simple de lo que parece. No necesitas entender tecnología. No necesitas contratar consultores. Solo necesitas un software actualizado y saber qué fechas importan.

En esta guía te explicamos todo sin tecnicismos.
```

**Critical Rules:**
- **2-3 sentences per paragraph** (40-60 words ideal, 70 max)
- **Vary paragraph length deliberately**: 1 sentence for emphasis, 2-3 for development
- **Maximum 60 words per paragraph** — break longer blocks into multiple paragraphs
- **One idea per paragraph** — if you switch topics, start a new paragraph
- **Bold the key insight** in each paragraph (3-6 words max)
- **Use transitions** to create flow between paragraphs (pero, sin embargo, además, por eso, lo que muchos no saben)
- **White space is a feature** — embrace short paragraphs with breathing room

### Voice & Tone

| Principle | Description |
|-----------|-------------|
| **Claridad** | Explica conceptos complejos de forma simple |
| **Útil** | Resuelve problemas reales, no puro marketing |
| **Cercano** | Usa "tú", escribe como hablarías a un amigo |
| **Empático** | Reconoce la frustración con burocracia |
| **Humano** | Storytelling, ejemplos concretos, conexión emocional |

### Spanish Language Rules

- ✅ Use "tú" form (informal but professional)
- ✅ Spain Spanish (not Latin American)
- ✅ Technical terms in Spanish when natural
- ✅ Common terms: factura, autónomo, IVA, IRPF, Hacienda, gestoría
- ❌ Avoid overly formal or bureaucratic tone

### Scannability Requirements

**79% of users scan rather than read.** Make your content skimmable:

1. **Bold key phrases** in every section
   - A skimmer reading only bold text should understand the main points
   - Bold the **3-6 most important words** that convey the key takeaway

   **Examples:**
   ```markdown
   ✅ GOOD: "Si no lo cumples, **las multas pueden llegar hasta €10,000**."
   ✅ GOOD: "El alta en Hacienda debe hacerse **antes de iniciar tu actividad**."

   ❌ BAD (too much): "**Si no lo cumples, las multas pueden llegar hasta €10,000.**"
   ❌ BAD (nothing): "Si no lo cumples, las multas pueden llegar hasta 10000 euros."
   ```

2. **Headers every 200-400 words**
   - H2 for main sections
   - H3 for subsections
   - Headers should make sense as a standalone outline

3. **Visual breaks** (but avoid checklist overload)
   - Bullet lists for **lists only** (3+ related items)
   - **NOT for explanations** that need narrative flow
   - Blockquotes for key insights or quotes
   - `---` dividers between major sections
   - **Never stack 3+ bullet sections** without prose breaks

4. **Sentence length**
   - Target: 15-20 words per sentence
   - Max: 25 words (break longer sentences)
   - Short sentences (8-12 words) for emphasis and CTAs
   - Vary sentence length to create rhythm

5. **Content rhythm** (critical for readability)
   - **Mix prose with lists** — avoid "bullet fatigue"
   - Pattern: 2-3 paragraphs → visual break → 2-3 paragraphs
   - Use **storytelling to explain**, not just bullet points
   - Example: Instead of "✅ Ventaja 1", write "La mayor ventaja es X. Esto significa que..."

---

## 2.5. Common Readability Mistakes (AVOID THESE)

### Mistake 1: Checklist Overload

❌ **BAD - Feels like a to-do app, not editorial content:**
```markdown
## Tareas fiscales

✅ **Revisa todas las facturas emitidas.** Abre tu software y comprueba...
✅ **Identifica facturas pendientes.** Si tienes clientes morosos...
✅ **Comprueba las retenciones.** Si aplicas el 7%...
✅ **Registra todos los gastos.** Esto incluye la cuota mensual...
✅ **Aprovecha deducciones.** Si estabas pensando en comprar...
✅ **Revisa gastos proporcionales.** Si trabajas desde casa...
```

✅ **BETTER - Mix narrative with actionable steps:**
```markdown
## Tareas fiscales: qué revisar antes del 31 de diciembre

El primer paso es hacer inventario completo de facturas. Abre tu software y revisa que no falta ninguna por registrar. **Si tienes trabajos terminados que aún no has facturado**, decide estratégicamente: facturar en diciembre significa que cuenta para tu IRPF 2025.

Luego identifica facturas pendientes de cobro. Este dato es esencial para tu tesorería de enero.

**En gastos deducibles**, registra todo ahora:
- Cuota mensual de autónomos
- Seguro de salud y formación profesional
- Software y herramientas digitales
- Material de oficina y equipos

Si estabas pensando en comprar un ordenador nuevo o renovar tu móvil profesional, **hazlo antes del 31 de diciembre**. Esos gastos se deducen en 2025.
```

**Why it's better:** Narrative flow explains the "why", bullets organize the "what". Readers understand context, not just tasks.

### Mistake 2: Dense Comparison Blocks

❌ **BAD - 120+ word paragraphs explaining pricing:**
```markdown
El Plan Basic a 29€/mes es donde realmente empieza la propuesta seria de Holded para autónomos profesionales. Incluye 2 usuarios, 1,000 facturas al año (83 mensuales), 5 bancos sincronizados, y acceso a los módulos principales de la plataforma. Para la mayoría de autónomos serios que superan el volumen mínimo, este es el verdadero punto de entrada, no el Plus que aparece destacado en la página de precios. La diferencia de 14€ mensuales entre Plus y Basic representa 168€ anuales que muchos terminan pagando cuando descubren las limitaciones del plan inicial.
```

✅ **BETTER - Break into 2-3 focused paragraphs:**
```markdown
El **Plan Basic a €29/mes** es el verdadero punto de entrada. Incluye 2 usuarios, 1,000 facturas anuales (83/mes), y 5 bancos sincronizados.

La mayoría descubre que el Plus no es suficiente. **La diferencia de €14 mensuales representa €168 anuales** que terminas pagando cuando chocas con las limitaciones.

Para autónomos con volumen medio-alto, Basic es el mínimo realista.
```

### Mistake 3: Bullet Density Without Flow

❌ **BAD - Back-to-back bullet sections:**
```markdown
**Ventajas de Holded:**
- Ecosistema todo-en-uno con CRM, facturación e inventario integrados
- Sincronización bancaria automática con más de 300 entidades
- Módulos de proyectos y RRHH para equipos en crecimiento

**Desventajas de Holded:**
- Precio alto para autónomos simples que solo necesitan facturar
- Curva de aprendizaje pronunciada por la cantidad de funcionalidades
- Soporte premium cuesta €50/mes adicionales
```

✅ **BETTER - Mix prose with bullets:**
```markdown
## Las ventajas reales de Holded

La mayor fortaleza es su ecosistema todo-en-uno. En lugar de cinco herramientas diferentes, tienes todo centralizado. **Esto elimina duplicación de datos** y reduce errores de sincronización.

Para pymes con múltiples departamentos, esta integración es transformadora:
- El equipo de ventas actualiza el CRM
- Automáticamente se genera la factura
- El inventario se actualiza solo
- Contabilidad recibe los asientos en tiempo real

**Pero hay un coste menos visible:** la complejidad. Si solo necesitas facturar, aprender a navegar un ERP completo puede ser frustante. Muchos autónomos nos dicen que se sienten abrumados por las opciones.

El precio también escala rápidamente. El plan Basic a €29/mes es solo el inicio—añade inventario avanzado (€25), soporte premium (€50), y llegas a **€104/mes**. Para una pyme que usa todas esas funcionalidades, tiene sentido. Para un autónomo simple, no.
```

**Why it's better:** Readers understand the trade-offs through storytelling, not just feature lists. The narrative builds context that pure bullets can't provide.

### Mistake 4: Over-Bolding or Under-Bolding

❌ **BAD - Whole sentences bolded:**
```markdown
**Si no cumples con Verifactu, las multas pueden llegar hasta €50,000.**
```

❌ **BAD - Nothing bolded:**
```markdown
Si no cumples con Verifactu, las multas pueden llegar hasta 50000 euros según la normativa vigente.
```

✅ **GOOD - Bold the key insight (3-6 words):**
```markdown
Si no cumples con Verifactu, **las multas pueden llegar hasta €50,000**.
```

**Rule:** A skimmer reading only bold text should understand 70% of your article.

---

## 3. Categories & Word Counts

| Slug | Name | Purpose | Word Count |
|------|------|---------|------------|
| `guias` | Guías | Step-by-step how-to guides | **2000-3500** |
| `guias` | Guías (comprehensive) | Definitive guides on complex topics | **3500-5500** |
| `analisis` | Análisis | Data-driven industry analysis | **2000-3000** |
| `comparaciones` | Comparaciones | Product/tool comparisons | **2500-4000** |
| `consejos` | Consejos | Practical tips and advice | **1500-2500** |
| `formacion` | Formación | Educational/learning content | **2000-3500** |
| `casos-de-exito` | Casos de Éxito | Customer success stories | **1500-2500** |
| `invoo` | Invoo | Product updates and news | **1200-1800** |

> **Why these ranges?** Research shows 2,000-4,000 words is the SEO sweet spot for B2B content. Shorter articles lack depth; longer articles (5,500+) risk losing readers. Never exceed 5,500 words without splitting into multiple articles.

---

## 4. Frontmatter Schema

```yaml
---
title: "Título optimizado para SEO (50-60 caracteres)"
excerpt: "Meta descripción atractiva con keyword principal (150-160 caracteres)"
publishedAt: "2025-12-30"
updatedAt: "2025-12-30"                    # 🟢 Optional
author: "Equipo Invoo"
tags: ["keyword1", "keyword2", "keyword3"] # 3-5 tags, lowercase
readingTime: 8                              # ~200 words/minute
featured: false                             # 🟢 Homepage carousel
editorPick: false                           # 🟢 Editor picks section
coverImage: "/blog/slug-imagen.webp"
keyTakeaways:
  - "Primer punto clave que aprenderá el lector"
  - "Segundo beneficio o insight importante"
  - "Tercer punto accionable"
  - "Cuarto takeaway (siempre incluir 4)"
---
```

### Field Requirements

**🔴 Required:**
- `title` - SEO-optimized, keyword near start (50-60 chars)
- `excerpt` - Compelling, includes keyword (150-160 chars)
- `publishedAt` - ISO format: `"YYYY-MM-DD"`

**🟡 Strongly Recommended:**
- `author` - Always use `"Equipo Invoo"`
- `tags` - 3-5 relevant keywords in lowercase
- `readingTime` - Calculate at ~200 words/minute
- `coverImage` - Path to WebP image in `/public/blog/`
- `keyTakeaways` - Exactly 4 bullet points (see formula below)

**🔴 Required for Content Quality:**
- `sources` - Array of official sources with `name` and `url` (minimum 3 sources - see Section 5)
- `lastVerified` - Date string for regulatory content (e.g., "Enero 2026")

### keyTakeaways Formula

Each takeaway should:
- Start with WHAT the reader learns (not "Aprenderás que...")
- Include a **specific number, date, or fact**
- Be 15-25 words long
- Be actionable or surprising

**Examples:**
```yaml
✅ GOOD:
- "La multa por usar software no conforme es de 50.000€ fijos por ejercicio fiscal"
- "El Modelo 037 ya no existe desde febrero 2025: todos deben usar el 036"
- "Si olvidas marcar la casilla de Tarifa Plana, la pierdes para siempre"

❌ BAD:
- "Conocerás las multas de Verifactu"
- "Aprenderás sobre el modelo 036"
- "Información importante sobre la Tarifa Plana"
```

**🟢 Optional:**
- `updatedAt` - When article was last updated
- `featured` - Set `true` only for major articles (max 5-6 total)
- `editorPick` - Set `true` for quality content (need 4+ to display section)

---

## 5. Sources & Legal Disclaimer

### ⚠️ IMPORTANT: Dedicated Components

The blog has **dedicated components** that render automatically at the bottom of each article. **DO NOT** add these sections inside the article content:

1. **Sources Component** - Renders sources from frontmatter
2. **Legal Disclaimer Component** - Displays standard legal disclaimer for tax/regulatory content

### Sources (REQUIRED for all articles)

**Every article MUST have sources in frontmatter.** This is not optional.

**Frontmatter format:**
```yaml
sources:
  - name: "AEAT - Modelo 347"
    url: "https://sede.agenciatributaria.gob.es/..."
  - name: "BOE - Real Decreto 1065/2007"
    url: "https://www.boe.es/..."
lastVerified: "Enero 2026"
```

**Source requirements:**
- **Minimum 3 sources** for every article
- Prioritize official sources (AEAT, BOE, Seguridad Social, INE, etc.)
- Use descriptive names, not just URLs
- Verify all URLs are working before publishing
- Add `lastVerified` date for regulatory content

**In-text citations:**
When referencing a source in the article body, link directly to it:
```markdown
Según la [Orden HAC/1431/2025](https://www.boe.es/...), debes incluir el campo BDNS.
```

### Legal Disclaimer

**DO NOT add "Aviso legal" text inside the article content.** The Legal Disclaimer component handles this automatically for all articles.

DO NOT include:
```markdown
❌ **Aviso legal:** Esta guía tiene carácter informativo y no constituye...
❌ ## Fuentes y metodología
❌ **Datos primarios:**
```

The component will display the appropriate disclaimer at the bottom of the article page.

---

## 6. Article Formatting Rules

### Overall Page Structure

Every article page follows this structure (most sections handled by components):

1. **Hero/Header Section** - Component renders title, author, date, reading time
2. **Right Sidebar Navigation** - Component generates from H2 headings
3. **LLM Share Buttons** - Component for sharing to ChatGPT/Claude
4. **Social Share** - Component for social media sharing
5. **Key Takeaways / Puntos Clave** - Component renders from frontmatter `keyTakeaways`
6. **Article Content** - Your markdown content begins here
7. **Sources** - Component renders from frontmatter `sources` array
8. **Legal Disclaimer** - Component renders automatically for regulatory content

**You write:** Only the article content (item 6). Everything else is automated.

---

## 6.5. Content Formatting Rules

### H2 Block Rules (Main Sections)

- **Maximum 5 H2 sections** per article (excluding FAQ)
- Each H2 can have **maximum 1 custom component** (Quote, Accordion, InfoCard, or numbered list)
- Each H2 can have simple bullet lists if needed for listing items
- H2s should be spaced 200-400 words apart
- **REQUIRED: Every article must have a "Preguntas frecuentes" H2 section** (see FAQ section below)

### H3 Block Rules (Subsections)

- **Maximum 5 H3 subsections** per H2 section
- Each H3 block can have **maximum 4 paragraphs**
- Use H3s to break up long sections and improve scannability

### Paragraph Rhythm & Length

**Critical for readability:** Vary paragraph length deliberately to create visual rhythm.

**The Pattern:**
- Long (45-55 words) → Short (30-40 words) → Long → Short → etc.
- This creates visual rhythm and keeps readers engaged
- Short paragraphs provide breathing room
- Long paragraphs deliver detailed information

**Rules:**
- **Maximum 3-4 lines per paragraph** (40-70 words)
- **Vary length intentionally**: Long (4-5 lines) → Short (2 lines) → Long → Short
- **Break every 4-5 paragraphs** with either:
  - Sub-heading (H3 or H4)
  - Design component (InfoCard, PullQuote, etc.)
  - Bullet list
  - Horizontal rule `---`

## Paragraph Rhythm Examples

**Long paragraph (~45-50 words, 3-4 lines):**
> En esta guía vamos a desmontar el Modelo 347 pieza por pieza. Vamos a explicar qué es, quién debe presentarlo, qué operaciones se incluyen, cómo trabajar con tu gestoría para prepararlo sin estrés y cómo evitar los errores que disparan las sanciones.

**Short paragraph (~35-40 words, 2-3 lines):**
> Si te ha pasado alguna vez, bienvenido al club. El Modelo 347 es la declaración informativa que más confunde a los autónomos porque no pagas nada cuando la presentas, pero las sanciones por no hacerlo son brutales.

**Long paragraph (~50-55 words, 3-4 lines):**
> Desde 2026, existe una novedad importante: debes incluir el número de referencia de la Base de Datos Nacional de Subvenciones (BDNS) si la operación corresponde a una ayuda o subvención pública. Este campo es obligatorio según la Orden HAC/1431/2025. Si no lo incluyes, la declaración puede ser rechazada o dar lugar a requerimientos de Hacienda.

### Custom Components (MDX)

> **IMPORTANT:** To use any MDX components, your file MUST have `.md` extension inside `/content/blog/`. Components are automatically available.

Use these components **sparingly** - they add visual interest but should enhance content, not replace it.

#### 1. PullQuote - Highlight Key Insights

Use for memorable insights, quotes, or testimonials.

**Basic usage:**
```mdx
<PullQuote>
Quote text here without quotation marks
</PullQuote>
```

**With attribution:**
```mdx
<PullQuote author="María González" source="Diseñadora freelance, Barcelona">
Invoo me ahorra 3 horas semanales en facturación y me mantiene tranquila con Verifactu
</PullQuote>
```

**Props:**
- `children` (required): Quote text without quotation marks
- `author` (optional): Person being quoted
- `source` (optional): Context or title of person

**When to use:**
- Key insights you want readers to remember
- Client testimonials with attribution
- Expert opinions or industry quotes
- Surprising statistics worth highlighting

**Don't use for:**
- General information that belongs in paragraphs
- Multiple quotes (use QuoteList instead)
- Warnings or tips (use InfoCard instead)

#### 2. QuoteList & QuoteItem - Multiple Short Quotes

Use for displaying multiple related quotes or testimonials together.

```mdx
<QuoteList title="Lo que dicen los autónomos">
<QuoteItem>
Me ahorra 3 horas cada semana
</QuoteItem>
<QuoteItem>
La integración con mi gestoría es perfecta
</QuoteItem>
<QuoteItem>
Nunca había sido tan fácil cumplir con Verifactu
</QuoteItem>
</QuoteList>
```

**QuoteList Props:**
- `children` (required): QuoteItem components
- `title` (optional): Section title

**QuoteItem Props:**
- `children` (required): Short quote text (1-2 sentences)

**When to use:**
- Multiple short testimonials (3-5 items)
- User feedback compilation
- Quick insights from different sources

**Don't use for:**
- Long quotes (use PullQuote instead)
- Single quote (use PullQuote instead)
- More than 5 items (gets overwhelming)

#### 3. Accordion Components - Collapsible Content

**Two variants available:**

**A) Single Accordion** - One standalone collapsible item

```mdx
<Accordion title="Caso de estudio: María, diseñadora freelance">
María facturaba unos €3,000 mensuales usando Excel. Pasaba 2 horas semanales
copiando datos entre plantillas. Con Invoo redujo ese tiempo a 15 minutos.

**Resultados:**
- 85% menos tiempo en facturación
- Cero errores de cálculo
- Cumplimiento automático de Verifactu
</Accordion>
```

**Props:**
- `title` (required): Header text
- `children` (required): Collapsible content
- `value` (optional): Unique ID (defaults to "item")
- `defaultOpen` (optional): Set `true` to start expanded (avoid using)

**B) AccordionGroup** - Multiple items, only one open at a time

```mdx
<AccordionGroup>
<AccordionGroupItem title="¿Necesito Verifactu si facturo poco?" value="item-1">
Sí. Verifactu es obligatorio para cualquier autónomo que use software de
facturación, independientemente del volumen de facturación.
</AccordionGroupItem>

<AccordionGroupItem title="¿Cuál es la multa por incumplimiento?" value="item-2">
La multa es de hasta €50,000 por ejercicio fiscal según la Ley General Tributaria.
</AccordionGroupItem>
</AccordionGroup>
```

**AccordionGroup Props:**
- `children` (required): AccordionGroupItem components
- `defaultValue` (optional): Value of item to open by default (avoid using)

**AccordionGroupItem Props:**
- `title` (required): Header text
- `value` (required): Unique ID (must be unique within group)
- `children` (required): Collapsible content

**Default behavior:** Accordions start **closed by default** for best UX. Readers consciously expand what interests them. Avoid using `defaultOpen` or `defaultValue`.

**When to use:**
- **Single Accordion**: One case study or deep-dive example
- **AccordionGroup**: Multiple FAQ items, case studies, or examples
- Optional content that adds value but isn't essential to main flow
- Technical details that might overwhelm some readers

**Don't use for:**
- Essential information (keep in main flow - accordions hide content from SEO)
- Single short item (use InfoCard instead)
- More than 4-5 items in a group (gets overwhelming)

#### 4. InfoCard - Tips, Warnings, Important Notes

Available variants: `info`, `tip`, `warning`, `success`, `important`

```mdx
<InfoCard variant="tip" title="Consejo profesional">
Si facturas más de €6,000 anuales a un mismo cliente, deberás incluirlo en el Modelo 347.
</InfoCard>

<InfoCard variant="warning" title="Atención">
La fecha límite para Verifactu es julio 2026. No hay prórrogas.
</InfoCard>

<InfoCard variant="important">
Content here (title is optional)
</InfoCard>
```

**Props:**
- `variant` (optional): `info` | `tip` | `warning` | `success` | `important` (defaults to `info`)
- `title` (optional): Card header (uses default title if omitted)
- `children` (required): Card content (2-4 sentences max)
- `icon` (optional): Custom Lucide icon (advanced usage)

**Convenience components:**
- `<TipCard>` - Same as `<InfoCard variant="tip">`
- `<WarningCard>` - Same as `<InfoCard variant="warning">`
- `<ImportantCard>` - Same as `<InfoCard variant="important">`

**Content length:** Maximum 2-4 sentences (60-80 words). If longer, consider using Accordion or breaking into paragraphs.

**When to use:**
- Important reminders or warnings
- Pro tips that add value
- Critical deadlines or requirements

**Don't use for:**
- General information (use paragraphs)
- Long explanations (keep cards concise)

#### 4. Numbered Lists - Styled with Blue Circles

Use standard markdown numbered lists - they'll render with styled blue circular numbers:

```markdown
1. Primer paso con explicación
2. Segundo paso con detalles
3. Tercer paso con contexto
```

**When to use:**
- Sequential steps or instructions
- Ranked items (top 5, 3 best practices)
- Chronological processes

#### 5. Bullet Lists - Styled with Blue Dots

Use standard markdown bullets - they'll render with styled blue dots:

```markdown
- Primer elemento
- Segundo elemento
- Tercer elemento
```

**When to use:**
- Unordered lists of features, benefits, requirements
- Non-sequential items
- 3+ related items that need grouping

**Don't use for:**
- Explanations that need narrative flow
- Single items (use paragraph)

### Component Usage Guidelines

**Article-level limits:**
- **Maximum 1 InfoCard** (TipCard/WarningCard/ImportantCard) per article - high-impact visual breaks, more than 1 dilutes importance
- **PullQuotes, QuoteList, Accordions** - use as needed, no strict limit

**General guidance:**
- Components are supplementary - good writing should carry the article
- Use components when they genuinely add value, not for decoration

**Section-level rules:**
- **Maximum 1 component per H2 section** - Don't overload sections
- **Components should add value**, not just decoration
- **Don't stack components back-to-back** - Separate with prose (1-2 paragraphs minimum)
- **Most sections shouldn't have components** - Prefer good paragraph writing

**Component composition rules:**

✅ **Allowed:**
- Accordion content can include bullet lists, bold text, links
- QuoteList must contain only QuoteItem children
- InfoCard can contain bold, links, short lists

❌ **Not allowed:**
- InfoCard inside Accordion
- PullQuote inside InfoCard or Accordion
- Accordion inside Accordion
- AccordionGroupItem outside AccordionGroup
- QuoteItem outside QuoteList

**Component decision tree:**
```
Does this add essential value?
├─ No → Write it as a paragraph
└─ Yes → Is it optional/supplementary?
    ├─ Yes → Use Accordion
    └─ No → Is it a warning/tip?
        ├─ Yes → Use InfoCard
        └─ No → Is it a memorable quote?
            ├─ Yes (single) → Use PullQuote
            ├─ Yes (multiple short) → Use QuoteList
            └─ No → Write as paragraph
```

### FAQ Section (REQUIRED)

**Every article MUST have a "Preguntas frecuentes" H2 section** before the final CTA. This section:
- Improves SEO (FAQ schema in frontmatter + visible content)
- Answers common reader questions directly in the article
- Provides quick answers for scanners who skip to the bottom
- Uses AccordionGroup for clean, collapsible UX

**Structure:**

```markdown
## Preguntas frecuentes

<AccordionGroup>

<AccordionGroupItem title="¿[Question 1]?" value="faq-1">

[Answer in 2-3 sentences, expand slightly from frontmatter]

</AccordionGroupItem>

<AccordionGroupItem title="¿[Question 2]?" value="faq-2">

[Answer]

</AccordionGroupItem>

<AccordionGroupItem title="¿[Question 3]?" value="faq-3">

[Answer]

</AccordionGroupItem>

<AccordionGroupItem title="¿[Question 4]?" value="faq-4">

[Answer]

</AccordionGroupItem>

</AccordionGroup>

---

**[CTA section follows]**
```

**Rules:**
- Use `## Preguntas frecuentes` as the H2 (exact wording)
- **MUST use AccordionGroup** with AccordionGroupItem for each question
- Use `value="faq-1"`, `value="faq-2"`, etc. for unique IDs
- Answers should be 2-4 sentences (slightly expanded from frontmatter)
- Include 3-5 questions (match the frontmatter `faq` array)
- Place this section AFTER all main content, BEFORE the final CTA
- The FAQ section uses its own AccordionGroup (separate from content accordions)
- This section does NOT count toward the "max 5 H2 sections" limit

**Frontmatter FAQ vs Content FAQ:**
- **Frontmatter `faq`**: Used for FAQ schema (SEO/structured data)
- **Content FAQ section**: Visible to readers using AccordionGroup, slightly expanded answers
- Both should cover the same questions, content version can be more detailed

### Content Flow for Scannability

**Goal:** Create visual rhythm so readers can scan and engage easily.

**Ideal flow pattern:**
```markdown
## H2 Section Title

[2-3 paragraphs introducing topic - vary length]

### H3 Subsection (optional)

[2-4 paragraphs explaining concept]

**Optional:** Bullet list if listing 3+ items

**Optional:** 1 component (InfoCard/PullQuote/Accordion) if it adds value

[1-2 paragraphs transitioning to next section]

## Next H2 Section

[Repeat pattern]
```

**Example - Good flow:**
```markdown
## Qué es Verifactu y por qué importa

Verifactu es el nuevo sistema de verificación de facturas que la AEAT implementa en 2025. **Todas las empresas que emitan facturas electrónicas deben cumplirlo**. Esto incluye autónomos, pymes y grandes corporaciones sin excepción.

La multa por incumplimiento es de hasta €50,000 por ejercicio fiscal.

### Quién debe cumplir Verifactu

Si emites facturas usando cualquier tipo de software (no papel), estás obligado. **Esto incluye:**
- Software de facturación (Invoo, Holded, Quipu, etc.)
- Hojas de cálculo con plantillas (Excel, Google Sheets)
- Sistemas ERP o CRM que generen facturas

<WarningCard title="Importante">
Verifactu no aplica solo a grandes empresas. Si eres autónomo con 5 facturas al año, también debes cumplir.
</WarningCard>

La fecha límite es **julio 2026**. No hay prórrogas confirmadas hasta la fecha.

## Cómo prepararte para Verifactu

[Next section continues...]
```

---

## 7. Content Structure

### Anatomy of a Great Article

```markdown
---
[Frontmatter YAML including sources array - see Section 5]
---

[Opening hook - 1-2 short paragraphs that establish the problem and connect emotionally]

---

## Primera Sección Principal (H2)

Contenido con párrafos cortos (2-4 oraciones). **Frases clave en negrita** para skimmers. Una idea por párrafo.

Las ideas fluyen naturalmente entre párrafos con transiciones.

### Subsección si es necesario (H3)

Más detalles cuando el tema lo requiere.

## Segunda Sección Principal (H2)

Continúa el flujo lógico del artículo.

> Usa blockquotes para destacar puntos clave o consejos importantes.

## Conclusión (H2)

Resume el valor entregado y proporciona siguiente paso claro.

---

**¿[Pregunta que conecta con el problema del artículo]?**

Invoo [beneficio específico relacionado con el tema]. [Segunda frase con features relevantes]. €10.90/mes para autónomos, gratis para gestorías.

**[Únete a la lista de espera de Invoo](https://invoo.es)** - Los primeros 100 usuarios ahorran 50% para siempre.
```

> ⚠️ **NOTE:** Sources are rendered automatically from frontmatter. Do NOT add a "Fuentes y metodología" section in the content body. See Section 5.

### CTA Formatting Examples

> ⚠️ **IMPORTANT: Invoo is currently in WAITING LIST mode.** Never mention "free trial", "7 days free", "14 days free", or similar trial messaging. When Invoo goes live, the free trial period will be 7 days (not 14).

**Standard CTA (end of article):**
```markdown
---

**¿Cansado de perder tiempo con la facturación?**

Invoo automatiza tu facturación y te mantiene al día con Verifactu. Facturas profesionales en segundos, sin complicaciones. €10.90/mes para autónomos, gratis para gestorías.

**[Únete a la lista de espera de Invoo](https://invoo.es)** - Los primeros 100 usuarios ahorran 50% para siempre.

---
```

**Topic-specific CTA:**
```markdown
---

**¿Quieres cumplir con Verifactu sin dolores de cabeza?**

Invoo genera facturas con código QR Verifactu automáticamente. Cumples la normativa desde el primer día. €10.90/mes para autónomos, gratis para gestorías.

**[Únete a la lista de espera de Invoo](https://invoo.es)** - Los primeros 100 usuarios ahorran 50% para siempre.

---
```

---

## 8. Supported Markdown & MDX Elements

### ✅ Standard Markdown

```markdown
# H1 (only one, matches title)
## H2 (main sections, include keywords, max 5 per article)
### H3 (subsections, max 5 per H2)
#### H4-H6 (rarely needed)

**Bold text** for emphasis (3-6 words per paragraph)
*Italic text* for soft emphasis

- Bullet lists for items and features (use sparingly)
  - ✅ Correct action
  - ❌ Error to avoid
  - 💡 Tip or insight
  - ⚠️ Warning

1. Numbered lists for sequential steps (styled with blue circles)
2. Second step
3. Third step

**IMPORTANT:** Use bullets for **lists only**, not explanations. If you're explaining "why" or "how", use prose paragraphs. If you're listing "what", use bullets.

> Blockquotes for key points or quotes
> (blue left border, italic style)

`inline code` for technical terms

[Link text](https://url.com)

![Alt text for SEO](/blog/image.webp)
*Optional caption (italic, centered below image)*

---
Horizontal rule (section dividers)
```

### ✅ MDX Components (Use Sparingly)

**Available components** - See Section 6.5 for detailed usage guidelines:

```mdx
<!-- PullQuote - For memorable insights -->
<PullQuote>
Quote text without quotation marks
</PullQuote>

<!-- InfoCard - For tips, warnings, important notes -->
<InfoCard variant="tip" title="Optional Title">
Content here
</InfoCard>

<!-- Variants: info, tip, warning, success, important -->
<TipCard title="Consejo">Content</TipCard>
<WarningCard title="Atención">Content</WarningCard>
<ImportantCard>Content</ImportantCard>

<!-- AccordionGroup - For collapsible content (always starts closed) -->
<AccordionGroup>
<AccordionGroupItem title="Title here" value="item-1">
Content here
</AccordionGroupItem>
<AccordionGroupItem title="Another title" value="item-2">
More content
</AccordionGroupItem>
</AccordionGroup>
```

**Component rules:**
- Maximum 1 component per H2 section
- Components should enhance, not replace good writing
- Don't stack components back-to-back
- If file extension is `.md`, rename to `.mdx` to use components

### Tables (Markdown)

Tables are fully styled and mobile-responsive (horizontal scroll). Use them when data is genuinely tabular — comparisons, schedules, rate tables, tramos. **Don't use tables for simple lists** that would read better as bullet points.

```markdown
| Concepto | Deducible | Límite |
|----------|-----------|--------|
| Material oficina | Sí | 100% |
| Teléfono móvil | Parcial | 50% |
```

**Table rules:**
- Use tables for structured data with 2+ columns that benefit from side-by-side comparison
- Keep tables concise — if a table has 1 column of data, use a list instead
- Bold key values in cells for scannability
- Standard markdown table syntax — no custom components needed

### ❌ DO NOT USE

- Custom React/JSX components (only approved MDX components above)
- Advanced code syntax highlighting
- Multiple components stacked together
- Any element not in the "USE THESE" lists

---

## 9. SEO Requirements

### Title (50-60 characters)
- Keyword at or near the beginning
- Clear value promise
- Numbers work well: "5 errores...", "Guía completa..."

### Excerpt (150-160 characters)
- Include primary keyword
- End with benefit or curiosity hook
- Example: "Descubre cómo automatizar tu facturación y cumplir Verifactu sin complicaciones. Guía práctica para autónomos en 2025"

### Tags (3-5 keywords)
- Lowercase Spanish
- Prioritize terms with search volume
- Effective tags: `facturación`, `verifactu`, `autónomos`, `iva`, `aeat`, `gestorías`, `pymes`

### Internal Links (2-3 minimum per article)

**How to find articles to link:**
```bash
# Search for related articles by keyword
grep -r "verifactu" content/blog/ --files-with-matches
grep -r "autónomo" content/blog/ --files-with-matches
```

**Where to place links:**
- First mention of a key concept (if we have an article explaining it)
- Natural context: "Si quieres saber más sobre [cómo calcular tu cuota](/es/blog/guias/cuotas-autonomos-2026), lee nuestra guía"
- NOT in CTAs or conclusions (keep those focused on Invoo)

**Anchor text examples:**
- ✅ "Descubre [cómo funciona la retención de IRPF](/es/blog/guias/retencion-irpf)"
- ✅ "consulta nuestra [guía completa de Verifactu](/es/blog/guias/verifactu-2025-2026)"
- ❌ "haz clic [aquí](link)"
- ❌ "lee [este artículo](link)"

### Headers
- One H1 per article (matches title)
- H2 for main sections (include keywords naturally)
- H3 for subsections
- Logical hierarchy (don't skip H2 to H4)

---

## 10. Image Guidelines

### Technical Specs
- **Format**: WebP (smaller file size)
- **Location**: `/public/blog/`
- **Naming**: `slug-descriptivo.webp` (kebab-case)
- **Size**: Aim for < 200KB
- **Dimensions**: Minimum 1200x600px for cover images

### In Frontmatter
```yaml
coverImage: "/blog/verifactu-guide.webp"
```

### In Content
```markdown
![Descripción para SEO y accesibilidad](/blog/image-name.webp)
*Texto del caption que aparece centrado debajo*
```

---

## 11. Article Templates by Category

### Guías (How-To Guide)

**Target: 2000-3500 words** (or 3500-5500 for comprehensive guides)

```mdx
# Cómo [lograr objetivo] en [año/contexto]

[Hook: 4-5 líneas estableciendo el problema. **Bold key pain point**.]

[Segundo párrafo: 2 líneas con conexión emocional o dato impactante.]

[Tercer párrafo: 4-5 líneas con promesa de valor.]

---

## Qué necesitas antes de empezar

[Párrafo intro: 4-5 líneas explicando el contexto.]

**Requisitos básicos:**
- Requisito 1 con explicación breve
- Requisito 2 con explicación breve

[Párrafo de transición: 2 líneas.]

## Paso 1: [Acción específica]

[Primer párrafo: 4-5 líneas explicando QUÉ hacer. **Bold key action**.]

[Segundo párrafo: 2 líneas puntualizando aspecto clave.]

[Tercer párrafo: 4-5 líneas explicando CÓMO hacerlo con detalles.]

<TipCard title="Consejo profesional">
[Insight importante en 2-3 oraciones]
</TipCard>

## Paso 2: [Siguiente acción]

[Mismo patrón: variar longitud de párrafos, bold en frases clave, max 1 component por H2.]

### [Subsección si se necesita detallar]

[Max 4 párrafos por H3. Variar longitud.]

## Errores comunes a evitar

**Error 1: [Nombre del error]**
[4-5 líneas sobre el error y su contexto.]

[2 líneas con la solución.]

**Error 2: [Nombre del error]**
[4-5 líneas sobre el error y su solución.]

## Conclusión

[Resumen del valor en 4-5 líneas.]

[Siguiente paso recomendado en 2 líneas.]

---
[CTA a Invoo]
```

> ⚠️ **Tips:**
> - Save as `.mdx` if using components (TipCard, WarningCard, etc.)
> - Vary paragraph length deliberately for visual rhythm
> - Sources go in frontmatter, not in content body (see Section 5)
> - Max 5 H2 sections, max 1 component per H2

### Análisis (Industry Analysis)

**Target: 2000-3000 words**

```markdown
# [Tema]: Análisis del sector en [año]

[Hook: 2-4 oraciones sobre por qué este análisis importa ahora. **Bold key insight**.]

---

## Situación actual

[Párrafo 1: 2-4 oraciones con contexto del mercado español.]

[Párrafo 2: 2-4 oraciones con datos concretos. **Bold key statistic**.]

## Tendencias clave

### 1. [Primera tendencia]

[2-4 oraciones con análisis. **Bold key implication**.]

[2-4 oraciones sobre impacto para autónomos/pymes.]

### 2. [Segunda tendencia]

[Mismo patrón: párrafos cortos, bold en insights clave.]

## Qué significa esto para tu negocio

[2-4 oraciones con implicaciones prácticas.]

[2-4 oraciones con acciones recomendadas.]

## Conclusión

[Síntesis en 2-4 oraciones con recomendación principal.]

---
[CTA a Invoo]
```

> ⚠️ Add official sources (INE, AEAT, Eurostat) to frontmatter. See Section 5.

### Comparaciones (Comparison)

**Target: 2500-4000 words**

```markdown
# [Producto A] vs [Producto B]: Comparativa [año]

[Hook: 2-4 oraciones sobre por qué esta comparación importa. **Bold key differentiator**.]

---

## Resumen rápido

**[Producto A]:**
- Precio: X€/mes
- Verifactu: ✅/❌
- Ideal para: [perfil]

**[Producto B]:**
- Precio: Y€/mes
- Verifactu: ✅/❌
- Ideal para: [perfil]

## [Producto A]: Análisis detallado

### Pros

[2-4 oraciones sobre ventaja principal. **Bold key benefit**.]

[2-4 oraciones sobre segunda ventaja.]

### Contras

[2-4 oraciones sobre limitación. Ser honesto pero justo.]

## [Producto B]: Análisis detallado

[Misma estructura: párrafos cortos, bold en puntos clave.]

## Nuestra recomendación

[2-4 oraciones con análisis objetivo.]

**Elige [Producto A] si:** [criterios en 1-2 oraciones]

**Elige [Producto B] si:** [criterios en 1-2 oraciones]

---
[CTA]
```

### Consejos (Tips Article)

**Target: 1500-2500 words**

```markdown
# [Número] [elementos] para [objetivo]

[Hook: 2-4 oraciones con historia personal o situación relatable. **Bold key emotion**.]

[Segunda parte del hook: 2-4 oraciones con promesa de valor.]

---

## 1. [Primer consejo con título descriptivo]

[Párrafo 1: 2-3 oraciones explicando QUÉ es el consejo. **Bold key action**.]

[Párrafo 2: 2-3 oraciones explicando POR QUÉ importa.]

[Párrafo 3: 2-3 oraciones con ejemplo concreto o historia.]

> 💡 **Consejo práctico:** [Insight específico en blockquote]

## 2. [Segundo consejo]

[Mismo patrón: QUÉ → POR QUÉ → EJEMPLO. Párrafos cortos, cada uno con una idea.]

[...]

## Cómo empezar hoy mismo

Ya conoces los X consejos que marcan la diferencia. Ahora el siguiente paso es implementarlos sin parálisis por análisis.

**Empieza por lo más impactante:**
- Acción 1 con contexto breve (no solo checkbox)
- Acción 2 con beneficio claro
- Acción 3 con plazo específico

[Párrafo final: 2-3 oraciones con motivación y recordatorio del valor.]

---
[CTA]
```

### Casos de Éxito (Success Stories)

**Target: 1500-2500 words**

```markdown
# Cómo [nombre/tipo de cliente] [logró resultado específico]

[Hook: 2-4 oraciones con el desafío inicial. **Bold key challenge**.]

---

## El reto

[2-4 oraciones sobre la situación inicial.]

[2-4 oraciones sobre los problemas concretos. **Bold key pain point**.]

## La solución

[2-4 oraciones sobre cómo descubrió Invoo. Tono auténtico.]

[2-4 oraciones sobre el proceso de implementación.]

## Los resultados

**En números:**
- [Métrica 1]: **[resultado cuantificable]**
- [Métrica 2]: **[resultado cuantificable]**
- [Métrica 3]: **[resultado cuantificable]**

**En sus palabras:**
> "[Cita directa del cliente sobre su experiencia]"

## Lecciones para tu negocio

[2-4 oraciones con primer takeaway aplicable.]

[2-4 oraciones con segundo takeaway.]

---
[CTA suave - "¿Te identificas con esta historia?"]
---
```

### Formación (Educational Content)

**Target: 2000-3500 words**

```markdown
# Qué es [concepto] y cómo afecta a los autónomos

[Hook: 2-4 oraciones sobre por qué esto importa ahora. **Bold key deadline or impact**.]

---

## Definición simple

[2-4 oraciones con explicación accesible. **Bold key term**.]

[2-4 oraciones con ejemplo práctico.]

## Contexto legal/normativo

[2-4 oraciones sobre el marco regulatorio en España.]

[2-4 oraciones sobre fechas importantes y quién debe cumplirlo. **Bold key dates**.]

## Cómo funciona en la práctica

[2-4 oraciones con visión general del proceso.]

### [Aspecto técnico 1]

[2-4 oraciones con explicación. **Bold key concept**.]

### [Aspecto técnico 2]

[2-4 oraciones con explicación.]

## Errores comunes y cómo evitarlos

**Error 1: [Nombre]**
[2-4 oraciones con error y solución.]

**Error 2: [Nombre]**
[2-4 oraciones con error y solución.]

## Próximos pasos

[2-4 oraciones con acciones concretas ordenadas por prioridad.]

---
[CTA]
```

> ⚠️ Formación articles require official regulatory sources in frontmatter. See Section 5.

---

## 12. Pre-Publication Checklist

### 🔴 Required (Must Pass)
- [ ] `title` present and SEO-optimized (50-60 chars)
- [ ] `excerpt` compelling with keyword (150-160 chars)
- [ ] `publishedAt` in ISO format
- [ ] **Paragraphs are 2-4 sentences** (40-70 words max)
- [ ] **Paragraph length varies deliberately** (4-5 lines → 2 lines → repeat)
- [ ] **Key phrases bolded** in each section (3-6 words per paragraph)
- [ ] **Maximum 5 H2 sections** in article (excluding FAQ)
- [ ] **"Preguntas frecuentes" H2 section** present before CTA (uses AccordionGroup)
- [ ] **Frontmatter `faq` array** with 3-5 questions
- [ ] "Tú" form used consistently (Spain Spanish)
- [ ] File in correct category folder
- [ ] Filename is `slug-kebab-case.md` or `.mdx` (if using components)
- [ ] Word count within category range (see Section 3)

### 🟡 Strongly Recommended
- [ ] `author` set to "Equipo Invoo"
- [ ] `tags` with 3-5 relevant keywords
- [ ] `readingTime` calculated (~200 words/min)
- [ ] `coverImage` path correct and file exists
- [ ] `keyTakeaways` with exactly 4 points
- [ ] `sources` array with minimum 3 sources in frontmatter
- [ ] Opening hook engages (1-2 short paragraphs)
- [ ] Internal links to 2-3 related articles
- [ ] CTA at the end (not forced throughout)
- [ ] Keyword in title (near start)
- [ ] Alt text on all images
- [ ] **Headers every 200-400 words**
- [ ] **Visual breaks every 4-5 paragraphs** (H3, component, list, or HR)
- [ ] **Maximum 5 H3 subsections per H2**
- [ ] **Maximum 4 paragraphs per H3 block**

### 🟢 Quality Polish
- [ ] Sentences average 15-20 words (max 25)
- [ ] One idea per paragraph
- [ ] Transitions between paragraphs (pero, además, por eso)
- [ ] At least one concrete example or story
- [ ] Secondary keywords in H2s
- [ ] Descriptive anchor text for links
- [ ] Only supported markdown/MDX elements used
- [ ] **Max 1 InfoCard** (TipCard/WarningCard/ImportantCard) per article
- [ ] **Components used sparingly** (max 1 per H2 section)
- [ ] **No component stacking** (separate with prose)
- [ ] Components add real value (not decoration)
- [ ] Tables used only for genuinely tabular data (not simple lists)
- [ ] Images optimized (WebP, < 200KB)
- [ ] Technical terms explained
- [ ] No grammar/spelling errors

---

## 13. File Creation Workflow

### Step 1: Create the file

```bash
# Location pattern
content/blog/[category]/[slug].md

# Example
content/blog/guias/como-hacer-factura-autonomo.md
```

### Step 2: Add frontmatter

Copy the template from Section 4 and fill in all fields.

### Step 3: Write content

Follow the structure from Section 5 and critical rules from Section 2.

### Step 4: Add images

1. Save WebP image to `/public/blog/[name].webp`
2. Reference in frontmatter: `coverImage: "/blog/[name].webp"`
3. Reference in content: `![Alt text](/blog/[name].webp)`

### Step 5: Verify

Run through the pre-publication checklist (Section 10).

### Step 6: Test locally

```bash
npm run build  # Verify no build errors
npm run dev    # Preview at http://localhost:5200
```

---

## 14. Example Articles (Study These)

See these published articles as quality references for readability patterns:

### Excellent Readability Examples

1. **Análisis con storytelling**: `/content/blog/analisis/analice-100-autonomos-perdida-tiempo.md`
   - **Study:** Lines 30-43 (Marta's story) - Perfect paragraph rhythm: 2-3 sentences each, bold on key numbers
   - **Study:** Lines 47-62 - Data section with prose narrative, not just bullet lists
   - **Study:** Lines 66-78 (Carlos case) - Mix of story, numbers, and concrete results

2. **Guía técnica simplificada**: `/content/blog/guias/verifactu-2025-2026-guia-completa-autonomos-pymes.md`
   - **Study:** Lines 38-50 - Strong emotional hook with short paragraphs
   - **Study:** Lines 54-67 - Complex topic explained simply with strategic bolding
   - **Study:** Lines 150-196 - "La trampa de Excel" section - Technical content made scannable

3. **Consejos con hooks emocionales**: `/content/blog/consejos/5-errores-comunes-autonomos-principiantes.md`
   - **Study:** Lines 32-34 - Opening story with real consequences (Pablo's €847 sanction)
   - **Study:** Lines 63-72 - Laura's story mixed with actionable advice
   - **Study:** Lines 100-112 - Final checklist with narrative context, not just checkboxes

### Readability Anti-Patterns (Learn What NOT to Do)

1. **Checklist overload**: `/content/blog/consejos/cierre-fiscal-2025-checklist-autonomos.md`
   - **Problem:** Lines 50-76 have 26 consecutive checkboxes - reads like a to-do app
   - **Fix:** Mix narrative prose explaining WHY with bullets listing WHAT

2. **Dense comparison blocks**: `/content/blog/comparaciones/invoo-vs-holded-comparativa-2026.md`
   - **Problem:** Lines 100-120 have 100+ word paragraphs explaining pricing
   - **Fix:** Break into 2-3 shorter paragraphs with bold on key prices and insights

---

## 15. Common Mistakes

### Content Structure Mistakes

| Mistake | Solution |
|---------|----------|
| **Too long paragraphs (5+ sentences, 100+ words)** | Write 2-4 sentence paragraphs (40-70 words max), one idea each |
| **No paragraph rhythm** (all paragraphs same length) | Vary deliberately: 4-5 lines → 2 lines → 4-5 lines → 2 lines |
| **More than 5 H2 sections** | Keep to max 5 H2s per article for focus |
| **More than 5 H3s per H2** | Limit subsections to max 5 per H2 |
| **More than 4 paragraphs per H3** | Break H3 blocks at 4 paragraphs max |
| **No visual breaks** | Add H3, component, list, or HR every 4-5 paragraphs |
| **Checklist overload** (10+ consecutive checkboxes) | Mix narrative prose with actionable bullets. Explain WHY, then list WHAT |
| **Bullet density** (3+ bullet sections back-to-back) | Alternate prose paragraphs with bullet lists. Use bullets for lists only, not explanations |
| **Dense comparison blocks** (120+ word paragraphs) | Break into 2-3 focused paragraphs with bold on key insights |
| **Over-bolding** (whole sentences bolded) | Bold only the key 3-6 words per paragraph that convey the insight |
| **Under-bolding** (no bold text) | Every paragraph should have one bolded phrase for skimmers |
| **Generic content without examples** | Add specific Spanish examples, real numbers, relatable stories |
| **Using tables for simple lists** | Tables are for structured data with 2+ comparable columns. Single-column data → use a list |
| **Component overload** (multiple per section) | Max 1 component per H2 section |
| **Stacking components** (back-to-back without prose) | Separate components with at least 1-2 paragraphs |
| **Components as decoration** (not adding value) | Only use components when they enhance understanding |

### Technical Mistakes

| Mistake | Solution |
|---------|----------|
| Missing internal links | Link to 2-3 related articles naturally in context |
| Hardcoded URLs to invoo.es | Use relative paths like `/es/pricing/` |
| Keyword stuffing | Natural integration, 1-2% density |
| No keyTakeaways | Always include exactly 4 |
| Wrong image format | Use WebP, not PNG/JPG |

### Policy Mistakes

| Mistake | Solution |
|---------|----------|
| **Mentioning free trial** | Invoo is in waiting list mode - use "Únete a la lista de espera" |
| **Adding "Fuentes" section to content** | Put sources in frontmatter, not content body (see Section 5) |
| **Adding "Aviso legal" disclaimer** | Legal disclaimer component handles this automatically - don't add in content |
| **Missing sources in frontmatter** | Every article MUST have minimum 3 sources in frontmatter |

---

## Agent Workflow Summary

1. **Receive topic** → Identify category, keyword, angle
2. **Research** → Check existing articles, find unique value
3. **Outline** → Plan H2 structure (max 5 H2s) with key points
4. **Write** → Follow Section 2 critical rules and Section 6.5 formatting rules
   - Vary paragraph length: Long (4-5 lines) → Short (2 lines) → repeat
   - Max 1 component per H2 section
   - Break every 4-5 paragraphs with heading or visual element
5. **Add frontmatter** → Complete all 🔴 Required fields (Section 4)
6. **Insert images** → WebP in `/public/blog/` (Section 10)
7. **Internal links** → Add 2-3 links to related content (Section 9)
8. **Components** → Add MDX components sparingly if they add value (Section 6.5)
9. **Verify** → Run through Section 12 checklist
10. **Deliver** → Full `.md` or `.mdx` file ready for publication

---

*Last updated: January 2026 (formatting and component rules added)*
