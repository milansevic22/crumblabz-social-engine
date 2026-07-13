# Boss Brief

## One-Line Pitch

CrumbLabz Social Engine is an internal content operations dashboard that turns
ideas into approved, scheduled, trackable social posts across the main channels.

## The Business Problem

CrumbLabz needs a consistent social presence, but manual posting creates four
problems:

1. Ideas get lost.
2. Posts are not reviewed consistently.
3. Publishing depends on one person remembering to post.
4. Results are hard to track across platforms.

## The Proposed Solution

Build a CrumbLabz-owned system that manages the whole workflow:

1. Plan campaigns.
2. Draft posts.
3. Approve content.
4. Schedule publishing.
5. Send posts to social platforms through Buffer.
6. Store logs and metrics.

## Why Use Buffer First

Direct posting APIs for LinkedIn, Instagram, TikTok, YouTube, and X all have
different approval rules, permissions, and review processes. Buffer already
connects to the major social networks and provides one publishing API.

This means CrumbLabz can ship the internal system now, then add direct platform
integrations later if they become worth it.

## Why This Is Not Just A Social Scheduler

The value is not only scheduled posting. The value is operational control:

- A visible content pipeline.
- Approval before public posting.
- Brand rules in the workflow.
- Scheduled consistency.
- Logs for what happened.
- A path to analytics and reporting.

## Stack

- Next.js App Router for the dashboard and API routes.
- TypeScript for safer code.
- Tailwind CSS for the interface.
- Firebase Firestore for the content database.
- Firebase Admin SDK for private server actions.
- Vercel for hosting and cron jobs.
- Buffer API for social publishing.
- Optional Resend for weekly reports.

## MVP Scope

The first version includes:

- Internal dashboard.
- Campaign calendar.
- Social channel list.
- Draft creation.
- Approval workflow.
- Scheduled queue.
- Mock publishing mode.
- Firebase seed route.
- Buffer publishing adapter.
- Vercel Cron publishing route.
- Deployment docs.

## Phase 2

- Store live posts in Firestore from the dashboard.
- Add per-channel Buffer IDs.
- Add real metrics sync.
- Add weekly email reports.
- Add Firebase Auth for team login.
- Add media uploads through Firebase Storage.

## Phase 3

- Direct LinkedIn API integration.
- Direct TikTok integration after API approval.
- Direct YouTube Shorts upload after Google audit.
- AI-assisted caption variants under approval, not automatic public posting.

## Risk Control

The MVP does not publish unreviewed content. It uses approval states and admin
secrets before anything can leave the system.
