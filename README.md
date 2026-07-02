# Diamondback Insurance — Next.js Rewrite

Migration target for the Diamondback Insurance Bubble.io app: a multi-tenant commercial-auto
(trucking) insurance quoting & policy-management platform for agencies.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres / Auth / Storage) ·
TanStack Query · Zustand · React Hook Form + Zod · Axios · Vercel.

## Getting started
```bash
npm install
cp .env.example .env.local   # fill in Supabase + integration keys (rotate all keys from the export)
npm run dev
```

## Database
The initial schema lives in `supabase/migrations/0001_initial_schema.sql` (41 tables + 51 join
tables + enums + indexes, generated from the Bubble export). Apply it with the Supabase CLI, then
generate types:
```bash
supabase db push
npm run db:types
```

## Project layout
- `app/` — App Router: `(auth)` public routes, `(app)` authenticated shell, `api/` route handlers,
  `pdf/` server PDF routes.
- `features/` — feature-first modules (quotes, policies, insureds, …), each with
  `components/ hooks/ services/ schemas/ types/ store/`.
- `services/` — server-only clients for external integrations (MTM, NowCerts, InsuranceGIG,
  Hiscox, FMCSA, Maps, Twilio, email, storage).
- `lib/` — Supabase clients, auth guard, utils. `middleware.ts` handles session refresh + gating.
- `components/` — shared UI, layout, data-table, form primitives.
- `supabase/` — migrations + edge functions.

## Documentation
Full migration analysis (15 documents) accompanies this repo — see the `Documentation/` set for the
data model, RLS design, workflow mapping, and phased migration plan.

## Security notes
- Row-Level Security must be applied (the source app had almost none). See the privacy-rules doc.
- All external API keys/tokens from the Bubble export must be **rotated** and stored in env / Vault.
