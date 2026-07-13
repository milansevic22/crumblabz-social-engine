# Deployment Checklist

## Local Checks

- `pnpm install`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm dev`
- Confirm the dashboard loads at `http://localhost:3000`.
- Create a draft.
- Approve a post.
- Schedule a post.
- Simulate publishing.

## Firebase

- Create Firebase project.
- Enable Firestore.
- Create a web app.
- Copy web config into `NEXT_PUBLIC_FIREBASE_*`.
- Create a service account key.
- Copy service account values into server-only env vars.
- Keep `FIREBASE_PRIVATE_KEY` out of source control.

## Buffer

- Create Buffer account.
- Connect social channels.
- Create Buffer API key.
- Add `BUFFER_API_KEY`.
- Add `BUFFER_DEFAULT_CHANNEL_ID`.
- Later: add one Buffer channel ID per channel in Firestore.

## Vercel

- Push code to GitHub.
- Import GitHub repo into Vercel.
- Keep default Next.js build settings.
- Add all environment variables.
- Deploy.
- Open production URL.
- Call `/api/admin/seed` with `x-admin-secret`.
- Confirm `vercel.json` cron appears in Vercel.
- Review Function Logs after cron runs.

## Production Safety

- Use strong `ADMIN_API_SECRET`.
- Use strong `CRON_SECRET`.
- Never commit `.env.local`.
- Only publish approved posts.
- Keep mock mode for demo environments.
- Check Buffer queue before enabling high-volume posting.
