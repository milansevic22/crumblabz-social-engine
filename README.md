# CrumbLabz Social Engine

An internal MVP for planning, approving, scheduling, and publishing CrumbLabz
social media content.

The project follows the same CrumbLabz stack used previously:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Firestore
- Firebase Admin SDK
- Vercel
- Buffer API as the first publishing gateway
- Optional Resend for email summaries

## What This MVP Does

- Shows a social content dashboard with campaigns, channels, drafts, approvals,
  scheduled posts, and publishing status.
- Runs in review mode without credentials by using sample data.
- Includes protected API routes for seeding Firebase and publishing posts.
- Includes a Vercel Cron route that can check for scheduled posts.
- Includes a Buffer GraphQL publishing adapter.
- Includes boss-ready docs and beginner setup instructions.

## Local Setup

Install dependencies:

```bash
pnpm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

Start the app:

```bash
pnpm dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:3000
```

## Environment Variables

Browser-safe Firebase config:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Server-only Firebase Admin config:

```bash
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
ADMIN_API_SECRET=
CRON_SECRET=
```

Publishing config:

```bash
BUFFER_API_KEY=
BUFFER_DEFAULT_CHANNEL_ID=
```

Optional email config:

```bash
RESEND_API_KEY=
ALERT_EMAIL_TO=
ALERT_EMAIL_FROM=
```

## API Routes

Seed Firebase:

```bash
curl -X POST http://localhost:3000/api/admin/seed \
  -H "x-admin-secret: your-secret"
```

Publish one post through Buffer:

```bash
curl -X POST http://localhost:3000/api/posts/publish \
  -H "x-admin-secret: your-secret" \
  -H "content-type: application/json" \
  -d '{"postId":"post-001","text":"Hello from CrumbLabz","dueAt":"2026-07-16T09:00:00.000Z"}'
```

Cron route:

```text
GET /api/cron/publish
```

In production, Vercel calls the cron route on the schedule in `vercel.json`.

## Deployment

1. Push the project to GitHub.
2. Create a Vercel project from the GitHub repo.
3. Add the environment variables in Vercel.
4. Deploy with default Next.js settings.
5. Create a Firebase project and enable Firestore.
6. Add Firebase browser values and service account values.
7. Add Buffer API key and channel IDs.
8. Redeploy after all variables are set.
9. Seed Firebase using `/api/admin/seed`.
10. Confirm Vercel Cron is active and check function logs.

## Docs

- `docs/beginner-step-by-step.md`
- `docs/boss-brief.md`
- `docs/deployment-checklist.md`
- `docs/data-model.md`
