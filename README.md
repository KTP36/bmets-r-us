# MedSkillBuilder

Interactive study app for CBET, RN, and TEAS prep with anatomy and bone labeling games.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Analytics

GA4 is loaded from `src/main.jsx`.

- Default Measurement ID is set in code.
- To override per environment, create `.env.local` with:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Traffic Growth Plan

Use this as a weekly execution checklist.

### 1) Improve CTR From Search

- Keep title and description focused on high-intent terms:
  - CBET practice test
  - RN practice questions
  - TEAS practice test
  - anatomy labeling game
- Verify indexing and performance in Google Search Console.
- Check top pages weekly and rewrite snippets for pages with low CTR.

### 2) Build Long-Tail Content Around Your Tool

Create supporting pages or posts (on your main site/blog) that link to the app:

- "50 CBET Practice Questions With Rationales"
- "RN Prioritization Questions: 30 Free Practice Items"
- "TEAS Science Practice Quiz"
- "Eye Anatomy Labeling Practice"
- "Hand and Foot Bones Labeling Guide"

Each content page should:

- Target one search intent.
- Include screenshots/GIFs of the app.
- Link directly to the matching in-app module.
- Include a clear CTA: "Start free practice now".

### 3) Repurpose to High-Reach Channels

Post short clips and carousels from real questions/modules:

- TikTok/Reels/YouTube Shorts: 20-45s "Can you answer this RN question?"
- LinkedIn: 2-3 educational posts/week for CBET and nursing audiences.
- Pinterest: anatomy and memory-aid graphics linking back to practice pages.
- Reddit/Facebook groups: share value-first study tips, then link when relevant.

### 4) Launch a Referral Loop

- Add a simple in-app "Share this quiz" button with pre-filled message.
- Offer a weekly challenge scorecard users can share.
- Track shares as GA4 events.

### 5) Capture and Nurture Returning Users

- Add email capture for a free printable study pack.
- Send weekly email:
  - 5 practice questions
  - 1 study tip
  - direct link back to one module

### 6) Conversion and Retention Optimization

- Track where users drop off:
  - home -> module click
  - question 1 -> question 5
  - quiz complete rate
- Improve first 60 seconds:
  - one clear CTA above the fold
  - one-line value proposition
  - social proof/testimonials if available

## KPI Targets (First 60 Days)

- Organic clicks: +30%
- Homepage CTR from Google: +2 to +4 percentage points
- Session-to-practice start rate: +20%
- Quiz completion rate: +15%
- Returning users: +20%

## Weekly Marketing Cadence

- Monday: Publish one SEO article.
- Tuesday: Post one short-form video.
- Wednesday: Share one question carousel.
- Thursday: Publish one community post.
- Friday: Send study email and review analytics.
- Sunday: Update next week content plan based on top performers.
