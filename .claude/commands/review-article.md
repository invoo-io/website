# Review Article

Run a multi-angle review on the most recently created or specified blog article. This includes a 5-step compliance deep-dive because accuracy in tax/regulatory content is non-negotiable.

## Input

Ask me which article to review. If I don't specify, find the most recently modified `.md` file in `content/blog/`.

## Steps

### 1. Compliance Review (5 Steps) -- compliance-regulator

This is the most critical review. Run the **compliance-regulator** agent with these 5 checks:

1. **Fact verification**: Every date, figure, percentage, fine amount, and deadline must be verified against official sources (AEAT, BOE, Seguridad Social). Flag any claim without a source.
2. **Regulatory accuracy**: Are all referenced laws, models (303, 130, 347), and regulations current? Has anything changed since the article was written?
3. **Nuance check**: Are there oversimplifications that could mislead? Tax rules often have exceptions -- are they mentioned where relevant?
4. **CTA compliance**: No "free trial" language (waiting list mode). No promises about Invoo features that don't exist yet.
5. **Disclaimer adequacy**: Does the article avoid giving definitive legal/tax advice? The legal disclaimer component handles the footer, but the tone within the article must also be appropriate.

### 2. SEO & Schema Review -- seo-specialist

Run **seo-specialist** to check:
- Title length (50-60 chars) and keyword placement
- Excerpt length (150-160 chars) with keyword
- H2 structure (max 5, keywords in headers)
- Internal links (2-3 minimum)
- FAQ section present with AccordionGroup
- `sources` array in frontmatter (min 3)
- `keyTakeaways` (exactly 4)
- Tags (3-5, lowercase)

### 3. Code Quality Review -- code-reviewer

Run **code-reviewer** to check:
- Valid frontmatter YAML
- File in correct category folder
- MDX components used correctly (if any)
- No broken internal links
- Images referenced exist in `/public/blog/`
- Build passes (`npm run build`)

### 4. Positioning Review -- positioning-lead

Run **positioning-lead** to check:
- Invoo mentioned naturally (not forced)
- Competitor mentions are fair and factual
- Value proposition clear without being salesy
- Tone matches brand voice (empathetic, specific, no fluff)
- CTA aligns with current waiting-list positioning

### 5. Summary & Fix

Consolidate all findings into a single report:
- **MUST FIX**: Issues that block publishing (compliance errors, broken build, false claims)
- **SHOULD FIX**: Quality improvements (SEO gaps, weak positioning, readability)
- **OPTIONAL**: Polish items

Apply all MUST FIX changes automatically. Ask me about SHOULD FIX items.

After fixes, run `npm run build` to confirm everything still works.

When ready, ask me if I want to commit and push.
