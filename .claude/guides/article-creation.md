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
| Content location | `/content/blog/[category]/[slug].md` |
| Images location | `/public/blog/[image-name].webp` |
| Type definitions | `src/types/blog.ts` |
| Blog loader | `src/lib/blog.ts` |
| Supported format | Markdown (`.md`) or MDX (`.mdx`) |

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

❌ **BAD - Too dense (4-6+ sentences):**
```markdown
Verifactu es obligatorio desde 2025 para todas las empresas que emitan facturas en España. Esta normativa afecta a autónomos, pymes y grandes empresas por igual. Si no lo cumples, las multas pueden llegar hasta €10,000 dependiendo de la gravedad del incumplimiento. La buena noticia es que entender qué necesitas hacer es más simple de lo que parece. En este artículo te vamos a explicar exactamente cómo prepararte sin complicaciones y sin gastar más de lo necesario.
```

✅ **GOOD - Scannable (2-4 sentences):**
```markdown
Verifactu es obligatorio desde 2025 para todas las empresas que emitan facturas en España. Si no lo cumples, **las multas pueden llegar hasta €10,000**.

Pero no te asustes. En este artículo te explicamos exactamente cómo prepararte sin complicaciones.
```

**Rules:**
- **2-4 sentences per paragraph** (40-70 words max)
- **One idea per paragraph** — if you switch topics, start a new paragraph
- **Bold key phrases** so skimmers catch the important points
- Use transitions between paragraphs (pero, sin embargo, además, por eso)
- Lists break up dense information — don't avoid them

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

1. **TL;DR at top** (required for articles 2000+ words)
   ```markdown
   > **En resumen:** [2-3 sentences with the key takeaway and action]
   ```

   **Example:**
   > **En resumen:** Verifactu obliga a todos los autónomos que usen software de facturación a generar un código QR en cada factura desde julio 2026. **La multa por incumplimiento es de hasta 50.000€**. En esta guía te explicamos los pasos exactos para cumplir sin complicaciones.

2. **Bold key phrases** in every section
   - A skimmer reading only bold text should understand the main points
   - Bold the **3-6 most important words** that convey the key takeaway

   **Examples:**
   ```markdown
   ✅ GOOD: "Si no lo cumples, **las multas pueden llegar hasta €10,000**."
   ✅ GOOD: "El alta en Hacienda debe hacerse **antes de iniciar tu actividad**."

   ❌ BAD (too much): "**Si no lo cumples, las multas pueden llegar hasta €10,000.**"
   ❌ BAD (nothing): "Si no lo cumples, las multas pueden llegar hasta 10000 euros."
   ```

3. **Headers every 200-400 words**
   - H2 for main sections
   - H3 for subsections
   - Headers should make sense as a standalone outline

4. **Visual breaks**
   - Bullet lists for 3+ related items
   - Blockquotes for key insights
   - `---` dividers between major sections

5. **Sentence length**
   - Target: 15-20 words per sentence
   - Max: 25 words (break longer sentences)
   - Short sentences (8-12 words) for emphasis and CTAs

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

## 5. Content Structure

### Anatomy of a Great Article

```markdown
---
[Frontmatter YAML]
---

> **En resumen:** [TL;DR - 2-3 sentences summarizing the key takeaway and what action to take. Required for articles 2000+ words.]

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

---

## Fuentes y metodología

**Datos primarios:**
- [Fuentes propias si aplica]

**Datos secundarios:**
- [Fuentes oficiales: BOE, AEAT, Seguridad Social]
- [Enlaces a normativa citada]

*Última actualización: [Mes Año]*
```

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

## 6. Supported Markdown Elements

### ✅ USE THESE

```markdown
# H1 (only one, matches title)
## H2 (main sections, include keywords)
### H3 (subsections)
#### H4-H6 (rarely needed)

**Bold text** for emphasis
*Italic text* for soft emphasis

- Bullet lists (with emojis when useful)
  - ✅ Correct action
  - ❌ Error to avoid
  - 💡 Tip or insight
  - ⚠️ Warning

1. Numbered lists (for steps)
2. Second step
3. Third step

> Blockquotes for key points or quotes
> (blue left border, italic style)

`inline code` for technical terms

[Link text](https://url.com)

![Alt text for SEO](/blog/image.webp)
*Optional caption (italic, centered below image)*

---
Horizontal rule (section dividers)
```

### ❌ DO NOT USE

- **Tables** - Don't render well on mobile. Use structured lists instead:
  ```markdown
  **Primer trimestre (Q1):** Enero - Marzo → Presentación del **1 al 20 de abril**
  **Segundo trimestre (Q2):** Abril - Junio → Presentación del **1 al 20 de julio**
  ```
- Custom React/JSX components
- Advanced code syntax highlighting
- Any element not in the "USE THESE" list

---

## 7. SEO Requirements

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

## 8. Image Guidelines

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

## 9. Article Templates by Category

### Guías (How-To Guide)

**Target: 2000-3500 words** (or 3500-5500 for comprehensive guides)

```markdown
# Cómo [lograr objetivo] en [año/contexto]

> **En resumen:** [TL;DR en 2-3 oraciones con la acción clave.]

[Hook: 2-4 oraciones estableciendo el problema. **Bold key pain point**.]

[Segunda oración del hook: 2-4 oraciones con conexión emocional o dato impactante.]

---

## Qué necesitas antes de empezar

[Párrafo intro: 2-4 oraciones explicando el contexto.]

**Requisitos básicos:**
- Requisito 1 con explicación breve
- Requisito 2 con explicación breve

## Paso 1: [Acción específica]

[Primer párrafo: 2-4 oraciones explicando QUÉ hacer. **Bold key action**.]

[Segundo párrafo: 2-4 oraciones explicando CÓMO hacerlo con detalles.]

> 💡 **Consejo:** [Insight importante en blockquote]

## Paso 2: [Siguiente acción]

[Mismo patrón: párrafos de 2-4 oraciones, bold en frases clave, visual breaks.]

## Errores comunes a evitar

**Error 1: [Nombre del error]**
[2-4 oraciones sobre el error y su solución.]

**Error 2: [Nombre del error]**
[2-4 oraciones sobre el error y su solución.]

## Conclusión

[Resumen del valor en 2-4 oraciones.]

[Siguiente paso recomendado en 1-2 oraciones.]

---
[CTA a Invoo]
---
[Fuentes]
```

### Análisis (Industry Analysis)

**Target: 2000-3000 words**

```markdown
# [Tema]: Análisis del sector en [año]

> **En resumen:** [TL;DR con el hallazgo principal y qué hacer al respecto.]

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
---
[Fuentes - CRÍTICO: citar fuentes oficiales (INE, AEAT, Eurostat)]
```

### Comparaciones (Comparison)

**Target: 2500-4000 words**

```markdown
# [Producto A] vs [Producto B]: Comparativa [año]

> **En resumen:** [Producto A] es mejor para [perfil]. [Producto B] gana en [aspecto]. **Nuestra elección: [recomendación]**.

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
---
[Fuentes]
```

### Consejos (Tips Article)

**Target: 1500-2500 words**

```markdown
# [Número] [elementos] para [objetivo]

> **En resumen:** [Los X consejos más importantes en una frase.]

[Hook: 2-4 oraciones con historia personal o situación relatable. **Bold key emotion**.]

[Segunda parte del hook: 2-4 oraciones con promesa de valor.]

---

## 1. [Primer consejo]

[2-4 oraciones explicando el consejo. **Bold key action**.]

[2-4 oraciones con ejemplo concreto o caso.]

## 2. [Segundo consejo]

[Mismo patrón: explicación + ejemplo, párrafos cortos.]

[...]

## Tu checklist para empezar

- [ ] Acción 1 con detalle específico
- [ ] Acción 2 con detalle específico
- [ ] Acción 3 con detalle específico

---
[CTA]
---
[Fuentes si aplica]
```

### Casos de Éxito (Success Stories)

**Target: 1500-2500 words**

```markdown
# Cómo [nombre/tipo de cliente] [logró resultado específico]

> **En resumen:** [Resultado principal en una frase con número concreto.]

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

> **En resumen:** [Definición en una frase + implicación principal.]

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
---
[Fuentes - normativa oficial]
```

---

## 10. Pre-Publication Checklist

### 🔴 Required (Must Pass)
- [ ] `title` present and SEO-optimized (50-60 chars)
- [ ] `excerpt` compelling with keyword (150-160 chars)
- [ ] `publishedAt` in ISO format
- [ ] **Paragraphs are 2-4 sentences** (40-70 words max)
- [ ] **Key phrases bolded** in each section
- [ ] "Tú" form used consistently (Spain Spanish)
- [ ] File in correct category folder
- [ ] Filename is `slug-kebab-case.md`
- [ ] Word count within category range (see Section 3)

### 🟡 Strongly Recommended
- [ ] **TL;DR at top** (required for 2000+ word articles)
- [ ] `author` set to "Equipo Invoo"
- [ ] `tags` with 3-5 relevant keywords
- [ ] `readingTime` calculated (~200 words/min)
- [ ] `coverImage` path correct and file exists
- [ ] `keyTakeaways` with exactly 4 points
- [ ] Opening hook engages (1-2 short paragraphs)
- [ ] Internal links to 2-3 related articles
- [ ] CTA at the end (not forced throughout)
- [ ] Keyword in title (near start)
- [ ] Alt text on all images
- [ ] **Headers every 200-400 words**

### 🟢 Quality Polish
- [ ] Sentences average 15-20 words (max 25)
- [ ] One idea per paragraph
- [ ] Transitions between paragraphs (pero, además, por eso)
- [ ] At least one concrete example or story
- [ ] Secondary keywords in H2s
- [ ] Descriptive anchor text for links
- [ ] Only supported markdown elements used
- [ ] No tables (use structured lists)
- [ ] Images optimized (WebP, < 200KB)
- [ ] Technical terms explained
- [ ] No grammar/spelling errors

---

## 11. File Creation Workflow

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

## 12. Example Articles

See these published articles as quality references:

1. **Guía completa**: `/content/blog/guias/verifactu-2025-2026-guia-completa-autonomos-pymes.md`
   - Excellent structure, flowing paragraphs, comprehensive coverage

2. **Consejos con storytelling**: `/content/blog/consejos/5-errores-comunes-autonomos-principiantes.md`
   - Great opening hook with real story, emotional connection

3. **Internal linking**: Both examples show proper internal link usage

---

## 13. Common Mistakes

| Mistake | Solution |
|---------|----------|
| Too long paragraphs (5+ sentences) | Write 2-4 sentence paragraphs, one idea each |
| Using tables | Convert to structured lists with bold labels |
| Generic content | Add specific examples, data, stories |
| Missing internal links | Link to 2-3 related articles |
| Hardcoded URLs to invoo.es | Use relative paths like `/es/pricing/` |
| Keyword stuffing | Natural integration, 1-2% density |
| No keyTakeaways | Always include exactly 4 |
| Wrong image format | Use WebP, not PNG/JPG |
| **Mentioning free trial** | Invoo is in waiting list mode - use "Únete a la lista de espera" |

---

## Agent Workflow Summary

1. **Receive topic** → Identify category, keyword, angle
2. **Research** → Check existing articles, find unique value
3. **Outline** → Plan H2 structure with key points
4. **Write** → Follow Section 2 critical rules, flowing paragraphs
5. **Add frontmatter** → Complete all 🔴 Required fields
6. **Insert images** → WebP in `/public/blog/`
7. **Internal links** → Add 2-3 links to related content
8. **Verify** → Run through Section 10 checklist
9. **Deliver** → Full MD file ready for publication

---

*Last updated: December 2025*
