# Beginner Step-by-Step Guide

This guide assumes you have never deployed a project like this before.

## 1. What You Are Building

You are building a private CrumbLabz dashboard. The dashboard helps the team:

1. Write social media ideas.
2. Turn ideas into drafts.
3. Approve posts before they go public.
4. Schedule posts for LinkedIn, Instagram, TikTok, YouTube Shorts, and other
   channels.
5. Send approved posts to Buffer.
6. Review what was posted and what failed.

The dashboard is not a public marketing website. It is an internal operating
tool.

## 2. What Each Tool Does

Next.js is the app framework. It gives you the dashboard pages and API routes.

TypeScript makes the code stricter so mistakes are easier to catch.

Tailwind CSS styles the interface.

Firebase Firestore stores campaigns, posts, channels, publishing logs, and
metrics.

Firebase Admin SDK lets the server write private data safely.

Vercel hosts the app and runs scheduled jobs.

Buffer handles the actual connection to social platforms first, so CrumbLabz
does not need to get every platform API approval on day one.

## 3. Run It On Your Computer

Open the project folder in a terminal.

Install the project packages:

```bash
pnpm install
```

Create a local secrets file:

```bash
cp .env.example .env.local
```

Start the local app:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

At this stage the app works in review mode with sample data.

## 4. Create Firebase

Go to Firebase Console and create a new project.

Create a web app inside the Firebase project.

Copy the web app config into `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Enable Firestore.

Create a service account key.

Copy these private values into `.env.local`:

```bash
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Never paste the private key into code. It only belongs in `.env.local` and
Vercel environment variables.

## 5. Add Admin Secrets

Create two long random strings.

Use one as:

```bash
ADMIN_API_SECRET=
```

Use the other as:

```bash
CRON_SECRET=
```

`ADMIN_API_SECRET` protects manual actions.

`CRON_SECRET` protects scheduled publishing.

## 6. Add Buffer

Create or log into a Buffer account.

Connect the social channels you want CrumbLabz to publish to.

Create a Buffer API key.

Add it to `.env.local`:

```bash
BUFFER_API_KEY=
```

Find the Buffer channel ID for the first connected channel and add:

```bash
BUFFER_DEFAULT_CHANNEL_ID=
```

The MVP starts with one default channel. The next version should store one
Buffer channel ID per social channel in Firestore.

## 7. Seed The Database

After Firebase values are present, restart the app.

Call the seed route:

```bash
curl -X POST http://localhost:3000/api/admin/seed \
  -H "x-admin-secret: your-secret"
```

This adds sample campaigns, channels, and posts to Firestore.

## 8. Deploy To Vercel

Push the project to GitHub.

Create a new Vercel project from the GitHub repository.

Use the default Next.js settings.

Add every `.env.local` value to Vercel Project Settings.

Deploy.

After deploy, use the live domain when calling protected routes.

## 9. Check The Cron Job

The file `vercel.json` tells Vercel to call:

```text
/api/cron/publish
```

every 30 minutes.

Open the Vercel dashboard.

Check the Cron Jobs page.

Check Function Logs after the first run.

## 10. What To Demo To Bosses

Open the dashboard.

Show a draft moving into approval.

Approve it.

Schedule it.

Simulate publishing.

Explain that real publishing is enabled by adding Buffer credentials and
deploying to Vercel.
