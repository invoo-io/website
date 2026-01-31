# Social Posts

Create social media posts for a published blog article.

## Input

Ask me which article to promote. If I don't specify, find the most recently committed article in `content/blog/`.

## Steps

### 1. Read the Article

Read the full article content, frontmatter, and metadata. Extract:
- Title, excerpt, keyTakeaways
- Main topic and keywords
- Key statistics or surprising facts (best hooks)
- Article URL pattern: `https://invoo.es/es/blog/[category]/[slug]/`

### 2. Research Phase (Parallel)

Run these agents **in parallel**:

- **growth-lead**: Identify the best angle for each platform. Which pain point or stat will hook the audience? Suggest posting times based on `.claude/guides/social-post-creation.md` best times.

- **positioning-lead**: Review the article's key claims. Which ones are strongest for social? Ensure messaging aligns with Invoo positioning.

### 3. Write Posts -- content-writer

Run **content-writer** with research outputs and `.claude/guides/social-post-creation.md` guidelines. Create:

**LinkedIn post** (1,200-1,800 chars):
- Hook under 140 chars (truncation point)
- Pain points with solutions (numbered)
- Benefits checklist
- Article link + engagement question
- 3-5 PascalCase hashtags

**X/Twitter post** (70-100 chars main tweet):
- Hook + core value in main tweet
- Link in a **separate reply** (not main post)
- 1-2 hashtags mid-tweet

**Facebook post** (40-80 chars):
- Casual hook
- Benefits + link
- Engagement question

### 4. Review

All posts must follow:
- Waiting list mode CTAs (no "free trial")
- Spain Spanish (tuteo)
- Correct number formatting (1.000, not 1,000)
- Platform-specific hashtag and link rules

### 5. Output

Present all 3 posts formatted and ready to copy-paste. Include:
- Suggested posting day/time for each platform
- The reply tweet (separate from main tweet) for X
- UTM parameters for links
