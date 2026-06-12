# Migrate Resufolio from Deno Deploy Classic to Render

**Date:** 2026-06-11
**Status:** Approved

## Context

Deno Deploy Classic shuts down on July 20, 2026, and the new Deno Deploy
platform's free tier is too restrictive. Requirements for the new host: free
tier, no credit card required, custom domain support, and the ability to run a
Fresh 1.7.2 server (SSR + islands, so static export is not an option).

Render's free tier is the only surveyed platform meeting all three
requirements (Google Cloud Run, Railway, Koyeb, Oracle Cloud all require a
card or have closed their free tiers; Cloudflare Workers cannot run Fresh
1.x). Render constraints we design around:

- **Ephemeral filesystem** — no persistent disks on the free tier; local file
  writes are lost on every restart, redeploy, or spin-down.
- **Spin-down** — services sleep after 15 minutes idle, with a 30–60 s cold
  start.

## Decisions

1. **Remove the custom analytics system entirely** (user decision). It is the
   only stateful part of the app and cannot survive Render's ephemeral
   filesystem. Delete:
   - `utils/analytics.ts`
   - `routes/api/analytics.ts`
   - `islands/AnalyticsTracker.tsx`
   - the `/admin/analytics` dashboard route(s)
   - `analytics_data.json`
   - tracker wiring and analytics-only CSP entries in `routes/_app.tsx`

   Then regenerate the manifest (`deno task manifest`) and verify with
   `deno task check`.

2. **Containerize with Docker.** Render has no native Deno runtime. The
   Dockerfile uses the official `denoland/deno` base image, copies the
   project, runs `deno task build` for ahead-of-time Fresh asset compilation
   (avoids JIT island builds worsening cold starts), exposes port 8000, and
   starts with `deno run -A main.ts`.

3. **Deploy as a Render free Web Service** connected to the existing GitHub
   repo. Render auto-detects the Dockerfile; pushes to `main` auto-deploy. No
   repo changes needed beyond the Dockerfile.

4. **Custom domain via Render dashboard** — CNAME (or A/ALIAS for apex) at
   the DNS provider; Render provisions TLS automatically.

5. **Keep-alive pinger (optional, recommended)** — a free UptimeRobot or
   cron-job.org monitor hitting the site every ~10 minutes prevents
   spin-down. The 750 free hours/month cover 24/7 uptime for one service.

## Verification

- Local: `docker build` + `docker run`, click through homepage, portfolio
  cards/lightbox, projects page videos, and resume PDF viewer at
  `localhost:8000`.
- After deploy: repeat the click-through on the `.onrender.com` URL before
  switching DNS.

## Out of scope

- Upgrading Fresh 1.7.2 to Fresh 2.
- Any replacement analytics (hosted or otherwise).
