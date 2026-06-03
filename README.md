# Finby — Landing

The pre-launch waitlist and marketing site for **Finby**, the conversational AI
personal-finance app. _Stop tracking. Start talking._

## Stack

- **Next.js 15** (App Router, TypeScript strict)
- **Tailwind CSS v4** (CSS-first; tokens in `src/app/globals.css`)
- **Framer Motion** (`LazyMotion` + `m`, reduced-motion aware)
- **Prisma 7** + `@prisma/adapter-pg` driver adapter → **Prisma Postgres**
- **Resend** for confirmation emails · **React Hook Form + Zod** validation
- **pnpm** only · deploys to **Vercel**

## Requirements

- **Node `>=22.12.0`** — Prisma 7 rejects Node 23 and Vercel doesn't offer Node 24 yet, so use the 22.x line.
- **pnpm** 10+

## Getting started

```bash
pnpm install                 # also runs `prisma generate` (postinstall)
cp .env.example .env         # then fill in the values (see below)
pnpm dlx prisma migrate dev  # apply the schema to your database
pnpm dev                     # http://localhost:3000
```

## Environment variables

| Key | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma Postgres connection string |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Sender — **must be on a Resend-verified domain** |
| `WAITLIST_NOTIFY_EMAIL` | _(optional)_ Address that gets a notification on each new signup; unset disables it |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://finby.app`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | _(optional)_ Search Console token |

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm generate:assets` | Regenerate OG image + favicons (`scripts/generate-og.ts`) |

## Data model

`waitlist_signups` (`prisma/schema.prisma`): `id` (cuid), unique `email`,
`source` (default `landing`), approximate IP-derived `country` / `city` /
`region` (nullable), `createdAt`. The generated client is written to
`src/app/generated/prisma` (gitignored).

## Waitlist flow

`POST /api/waitlist` → validates + normalizes the email (trim/lowercase),
captures approximate location from Vercel geo headers, de-dupes, inserts, then
sends a Resend confirmation to the subscriber **and** a notification to
`WAITLIST_NOTIFY_EMAIL` (email, position, location, source). Both emails are
isolated: a Resend failure is logged but never fails the signup.

## Deploy (Vercel)

1. Set all env vars in the Vercel project (use a Resend-verified `RESEND_FROM_EMAIL`).
2. Node is pinned via `engines.node` (`>=22.12.0`).
3. `prisma generate` runs on install via `postinstall`; build command is `pnpm build`.
