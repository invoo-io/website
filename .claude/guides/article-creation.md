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

### Paragraph Structure (THE #1 MISTAKE)

**The #1 mistake is "blocky" content. Avoid fragmented paragraphs.**

❌ **BAD - Fragmented:**
```markdown
Verifactu es obligatorio desde 2025.

Todas las empresas deben cumplirlo.

El incumplimiento tiene multas.

Las multas pueden llegar a €10,000.
```

✅ **GOOD - Flowing:**
```markdown
Verifactu es obligatorio desde 2025 para todas las empresas que emitan facturas en España. Si no lo cumples, las multas pueden llegar hasta €10,000 dependiendo de la gravedad del incumplimiento. Pero no te asustes: entender qué necesitas hacer es más simple de lo que parece, y en este artículo te vamos a explicar exactamente cómo prepararte sin complicaciones.
```

**Rules:**
- Paragraphs should have 4-6 sentences (not 1-2)
- Ideas flow naturally with transitions (pero, sin embargo, además, por eso)
- 70% long paragraphs, 30% short for emphasis
- Lists surrounded by narrative context, not replacing it

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

---

## 3. Categories

| Slug | Name | Purpose | Word Count |
|------|------|---------|------------|
| `guias` | Guías | Step-by-step how-to guides | 1200-2000 |
| `analisis` | Análisis | Data-driven industry analysis | 1000-1500 |
| `comparaciones` | Comparaciones | Product/tool comparisons | 800-1200 |
| `consejos` | Consejos | Practical tips and advice | 600-1000 |
| `formacion` | Formación | Educational/learning content | 1200-1800 |
| `casos-de-exito` | Casos de Éxito | Customer success stories | 600-800 |
| `invoo` | Invoo | Product updates and news | 800-1200 |

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
- `keyTakeaways` - Exactly 4 bullet points

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

[Opening hook - 1-2 paragraphs that establish the problem and connect emotionally]

---

## Primera Sección Principal (H2)

Contenido desarrollado con párrafos completos (4-6 oraciones cada uno).
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

### Internal Links
- Link to 2-3 related articles minimum
- Use descriptive anchor text (not "haz clic aquí")
- Link to product pages where genuinely relevant

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
```markdown
# Cómo [lograr objetivo] en [año/contexto]

[Hook: Por qué esto importa al autónomo - 1-2 párrafos]

---

## Qué necesitas antes de empezar
- Requisito 1
- Requisito 2

## Paso 1: [Acción específica]
[Explicación detallada con contexto...]

## Paso 2: [Siguiente acción]
[Explicación detallada...]

## Errores comunes a evitar
- Error 1 y cómo solucionarlo
- Error 2 y cómo solucionarlo

## Conclusión
[Resumen y siguiente paso recomendado]

---
[CTA a Invoo]
---
[Fuentes]
```

### Análisis (Industry Analysis)
```markdown
# [Tema]: Análisis del sector en [año]

[Hook: Por qué este análisis importa ahora - contexto de mercado]

---

## Situación actual

[Datos y contexto del mercado español - párrafos desarrollados]

## Tendencias clave

### 1. [Primera tendencia]
[Análisis con datos, impacto para autónomos/pymes]

### 2. [Segunda tendencia]
[Análisis con datos, impacto para autónomos/pymes]

### 3. [Tercera tendencia]
[Análisis con datos, impacto para autónomos/pymes]

## Qué significa esto para tu negocio

[Implicaciones prácticas, acciones recomendadas]

## Previsiones para [próximo período]

[Proyecciones fundamentadas]

## Conclusión
[Síntesis y recomendación principal]

---
[CTA a Invoo]
---
[Fuentes - CRÍTICO: citar fuentes oficiales (INE, AEAT, Eurostat)]
```

### Comparaciones (Comparison)
```markdown
# [Producto A] vs [Producto B]: Comparativa [año]

[Por qué comparar estas opciones - 1-2 párrafos]

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
[Desarrollado en párrafos, no solo lista]

### Contras
[Desarrollado en párrafos]

## [Producto B]: Análisis detallado
[Misma estructura]

## Nuestra recomendación
[Análisis objetivo de cuándo elegir cada uno]

---
[CTA]
---
[Fuentes]
```

### Consejos (Tips Article)
```markdown
# [Número] [elementos] para [objetivo]

[Hook conectando con el dolor del autónomo - 2-3 párrafos con historia]

---

## 1. [Primer consejo]
[Párrafos desarrollados con contexto, ejemplo, y acción]

## 2. [Segundo consejo]
[Mismo patrón]

[...]

## Tu checklist para empezar
- [ ] Acción 1
- [ ] Acción 2
- [ ] Acción 3

---
[CTA]
---
[Fuentes si aplica]
```

### Casos de Éxito (Success Stories)
```markdown
# Cómo [nombre/tipo de cliente] [logró resultado específico]

[Hook: El desafío inicial - situación relatable para el lector]

---

## El reto

[Describir la situación inicial, los problemas concretos que enfrentaba el cliente. Usar detalles específicos que resuenen con otros autónomos/pymes.]

## La solución

[Cómo descubrió Invoo, qué le convenció, proceso de implementación. Mantener tono auténtico, no publicitario.]

## Los resultados

**En números:**
- [Métrica 1]: [resultado cuantificable]
- [Métrica 2]: [resultado cuantificable]
- [Métrica 3]: [resultado cuantificable]

**En sus palabras:**
> "[Cita directa del cliente sobre su experiencia]"

## Lecciones para tu negocio

[2-3 takeaways aplicables para el lector, basados en esta historia]

---
[CTA suave - "¿Te identificas con esta historia?"]
---
```

### Formación (Educational Content)
```markdown
# Qué es [concepto] y cómo afecta a los autónomos

[Hook: Por qué necesitas entender esto ahora]

---

## Definición simple

[Explicación accesible del concepto, sin jerga innecesaria]

## Contexto legal/normativo

[Marco regulatorio en España, fechas importantes, quién debe cumplirlo]

## Cómo funciona en la práctica

[Desglose paso a paso del proceso o mecanismo]

### [Aspecto técnico 1]
[Explicación detallada]

### [Aspecto técnico 2]
[Explicación detallada]

## Errores comunes y cómo evitarlos

[Lista de errores frecuentes con soluciones]

## Próximos pasos

[Acciones concretas que el lector puede tomar]

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
- [ ] Paragraphs are 4-6 sentences (not fragmented)
- [ ] "Tú" form used consistently (Spain Spanish)
- [ ] File in correct category folder
- [ ] Filename is `slug-kebab-case.md`

### 🟡 Strongly Recommended
- [ ] `author` set to "Equipo Invoo"
- [ ] `tags` with 3-5 relevant keywords
- [ ] `readingTime` calculated (~200 words/min)
- [ ] `coverImage` path correct and file exists
- [ ] `keyTakeaways` with exactly 4 points
- [ ] Opening hook engages and establishes value
- [ ] Internal links to 2-3 related articles
- [ ] CTA at the end (not forced throughout)
- [ ] Keyword in title (near start)
- [ ] Alt text on all images

### 🟢 Quality Polish
- [ ] Ideas flow with transitions between paragraphs
- [ ] Lists surrounded by narrative context
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
| Fragmented paragraphs (1-2 sentences) | Write 4-6 sentence paragraphs with flow |
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
