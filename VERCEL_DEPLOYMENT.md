# Vercel Deployment Guide

This guide will help you deploy the Invoo website to Vercel.

## Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Resend API credentials (for newsletter functionality)

## Step 1: Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js configuration

## Step 2: Configure Build Settings

Vercel will automatically use these settings from `vercel.json`:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build:vercel`
- **Output Directory:** (auto-detected)
- **Install Command:** `npm install`

No manual configuration needed!

## Step 3: Set Environment Variables

Go to your project settings → **Environment Variables** and add:

### Required Variables

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_BLOG_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**How to get these:**
1. Sign up at [Resend.com](https://resend.com)
2. Create an API key in Settings → API Keys
3. Create an Audience in Contacts → Audiences
4. Copy the Audience ID

### Optional Variables

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**How to get this:**
1. Set up Google Analytics 4
2. Copy your Measurement ID (format: G-XXXXXXXXXX)

## Step 4: Deploy

1. Click **"Deploy"** in Vercel
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `your-project.vercel.app`

## Step 5: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `invoo.es`)
3. Follow Vercel's DNS configuration instructions
4. Update your domain's DNS records as instructed

## How It Works

- **API Routes:** The newsletter subscription API (`/api/newsletter/subscribe`) runs as a Vercel serverless function
- **Static Pages:** All pages are pre-rendered at build time for optimal performance
- **Internationalization:** Both `/en` and `/es` routes are automatically generated
- **Sitemap:** Generated automatically at `/sitemap.xml`

## Troubleshooting

### Build Fails

- Check that all environment variables are set
- Review build logs in Vercel dashboard
- Ensure `package.json` has all dependencies

### API Routes Not Working

- Verify environment variables are set correctly
- Check that `RESEND_API_KEY` and `RESEND_BLOG_AUDIENCE_ID` are valid
- Review function logs in Vercel dashboard

### Images Not Loading

- Vercel automatically optimizes images
- If issues occur, check `next.config.ts` image configuration

## Differences from Static Export

When deployed to Vercel (vs. static export):
- ✅ API routes work (newsletter subscription)
- ✅ Image optimization enabled
- ✅ Server-side rendering available
- ✅ Automatic HTTPS and CDN
- ❌ JSON-LD injection script not needed (handled by Next.js)

## Updating the Site

Simply push to your connected Git branch:
- `main`/`master` → Production deployment
- Other branches → Preview deployments

Vercel automatically builds and deploys on every push!

