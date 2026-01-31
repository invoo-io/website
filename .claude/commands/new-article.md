# New Article

Create the next blog article from the content plan.

## Steps

### 1. Find the Next Article

Read the latest content plan in `.claude/plans/` (e.g., `CONTENT-PLAN-FEBRUARY-2026.md`).
Find the first article **not** marked as "Published" or "completed".
Show me which article you're picking up and ask for confirmation before proceeding.

### 2. Research Phase (Parallel)

Run these agents **in parallel**:

- **seo-specialist**: Research target keywords from the plan. Validate search volume, suggest H2 structure for featured snippets. Find internal linking opportunities by searching existing articles in `content/blog/`.

- **market-intelligence**: Analyze competitor coverage of this topic. Find missing angles, data points, and official sources (AEAT, BOE, INE) to cite.

- **positioning-lead** (comparison articles only): Create differentiation brief. How to position Invoo vs competitor? What claims to make or avoid?

- **compliance-regulator** (tax/legal topics only): Verify current regulations, dates, figures. Flag recent changes. Provide official source URLs.

### 3. Write the Article

Run **content-writer** with:
- All research outputs from Step 2
- Article plan details (sections, word count, internal links, file path)
- Must follow `.claude/guides/article-creation.md` formatting rules
- Save to the file path specified in the content plan

### 4. Build Check

Run `npm run build` to verify no errors.

### 5. Summary

Show:
- Article file path and word count
- Keywords targeted
- Internal links added
- Sources cited
- Compliance flags or concerns

Do NOT commit, push, or create social posts. Tell me to run `/review-article` next.
