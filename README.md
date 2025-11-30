This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This Next.js application can be deployed on Vercel (recommended) or as a static export for traditional hosting.

### Vercel Deployment (Recommended)

1. **Connect your repository to Vercel:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import your repository in [Vercel Dashboard](https://vercel.com/new)
   - Vercel will automatically detect Next.js and configure the build

2. **Configure Environment Variables:**
   Add these in your Vercel project settings (Settings → Environment Variables):
   - `RESEND_API_KEY` - Your Resend API key (required for newsletter subscription)
   - `RESEND_BLOG_AUDIENCE_ID` - Your Resend audience ID (required for newsletter)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID (optional)

3. **Deploy:**
   - Vercel will automatically build and deploy using `npm run build:vercel`
   - API routes will work as serverless functions
   - The site will be available at `your-project.vercel.app`

### Static Export (GoDaddy/Other Hosting)

For static hosting providers like GoDaddy:

```bash
npm run build:static
```

This will:
- Build a static export in the `out/` folder
- Inject JSON-LD structured data
- Upload the `out/` folder contents to your hosting provider

**Note:** Static export disables API routes. The newsletter subscription API will not work with static export.

### Building for Production (Development)

For local testing with API routes enabled:

```bash
npm run build
npm run start
```

This creates a standard Next.js build (`.next/` folder) with API routes enabled, suitable for testing the full application including the newsletter subscription endpoint.

**Note:** For static export builds (GoDaddy), use `npm run build:static` instead.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
