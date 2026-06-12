# Render Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the file-based analytics system and containerize the site so it deploys to Render's free tier (Deno Deploy Classic shuts down 2026-07-20).

**Architecture:** The app becomes fully stateless: delete all analytics code (the only thing that wrote to disk), make the server port configurable via the `PORT` env var, and add a Dockerfile that pre-builds Fresh assets ahead of time. Render builds the Dockerfile from the GitHub repo on every push to `main`.

**Tech Stack:** Fresh 1.7.2, Deno 2.6.8 (pin `denoland/deno:2.6.8` base image), Docker, Render free Web Service.

**Spec:** `docs/superpowers/specs/2026-06-11-render-migration-design.md`

**Note on testing:** This repo has no test suite, and every task is a deletion or infrastructure config. Verification is therefore `deno task check` (lint + format + typecheck), manifest regeneration, and booting the server/container and curling routes — not unit tests.

**Complete analytics file inventory** (verified by grep; nothing else references analytics):

| File | Action |
|---|---|
| `utils/analytics.ts` | delete |
| `routes/api/analytics.ts` | delete |
| `routes/api/analytics/data.ts` | delete (then remove empty `routes/api/analytics/` dir) |
| `routes/admin/analytics.tsx` | delete (then remove empty `routes/admin/` dir) |
| `islands/AnalyticsTracker.tsx` | delete |
| `islands/AnalyticsDashboard.tsx` | delete |
| `analytics_data.json` | delete (has uncommitted changes — discard them) |
| `routes/_app.tsx` | modify (import line 3, `<AnalyticsTracker />` line 29) |
| `routes/projects.tsx` | modify (import line 4, `<AnalyticsTracker />` line 101) |
| `fresh.gen.ts` | regenerate via `deno task manifest` |
| `CLAUDE.md` | modify (remove analytics docs) |

---

### Task 1: Remove AnalyticsTracker usage from routes

**Files:**
- Modify: `routes/_app.tsx:3,29`
- Modify: `routes/projects.tsx:4,101`

- [ ] **Step 1: Edit `routes/_app.tsx`**

Remove line 3:
```tsx
import AnalyticsTracker from "../islands/AnalyticsTracker.tsx";
```

Remove line 29 (inside `<body>`):
```tsx
        <AnalyticsTracker />
```

The `<body>` should end up as:
```tsx
      <body class="bg-[#E7DECA] min-h-screen">
        <Component />
      </body>
```

Leave the `useCSP` block untouched — none of its directives are analytics-specific (the tracker posted to `'self'`, which other things still need).

- [ ] **Step 2: Edit `routes/projects.tsx`**

Remove line 4:
```tsx
import AnalyticsTracker from "../islands/AnalyticsTracker.tsx";
```

Remove line 101 (just below `<Header />`):
```tsx
        <AnalyticsTracker />
```

- [ ] **Step 3: Verify**

Run: `deno task check`
Expected: passes (exit 0). If `deno fmt --check` complains about the edited files, run `deno fmt routes/_app.tsx routes/projects.tsx` and re-run.

- [ ] **Step 4: Commit**

```bash
git add routes/_app.tsx routes/projects.tsx
git commit -m "Remove AnalyticsTracker from app shell and projects page"
```

---

### Task 2: Delete analytics files and regenerate the manifest

**Files:**
- Delete: `utils/analytics.ts`, `routes/api/analytics.ts`, `routes/api/analytics/data.ts`, `routes/admin/analytics.tsx`, `islands/AnalyticsTracker.tsx`, `islands/AnalyticsDashboard.tsx`, `analytics_data.json`
- Regenerate: `fresh.gen.ts`

- [ ] **Step 1: Discard the uncommitted analytics data change, then delete the files**

```bash
git checkout -- analytics_data.json
git rm utils/analytics.ts routes/api/analytics.ts routes/api/analytics/data.ts routes/admin/analytics.tsx islands/AnalyticsTracker.tsx islands/AnalyticsDashboard.tsx analytics_data.json
rmdir routes/api/analytics routes/admin 2>/dev/null || true
```

(`git rm` usually prunes the emptied directories itself; the `rmdir` is a no-op backstop.)

- [ ] **Step 2: Regenerate the Fresh manifest**

Run: `deno task manifest`
Expected: `fresh.gen.ts` no longer contains any line matching `analytics` (verify with `grep -ci analytics fresh.gen.ts` → `0`).

- [ ] **Step 3: Verify no dangling references**

Run: `grep -rni analytics routes islands components utils fresh.gen.ts main.ts dev.ts fresh.config.ts`
Expected: no output.

Run: `deno task check`
Expected: passes.

- [ ] **Step 4: Smoke-test locally**

The dev server is typically already running (`deno task start`) and watches `routes/`; otherwise start it. Then:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/        # expect 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/projects # expect 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/api/analytics # expect 404
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/admin/analytics # expect 404
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Delete file-based analytics system"
```

---

### Task 3: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Remove analytics documentation**

Delete the entire "### Analytics System" section. Also remove these now-false lines wherever they appear:
- "custom analytics tracking" in the Project Overview paragraph
- "**Analytics**: Custom file-based analytics system (JSON persistence)" from Technology Stack
- "`AnalyticsTracker.tsx` - Client-side analytics event tracking" from Key Islands
- "and global analytics" from the `/routes/_app.tsx` line in File Structure Highlights
- "`/routes/api/analytics.ts` - Analytics collection endpoint" from File Structure Highlights

- [ ] **Step 2: Add a Deployment note**

Replace the "## Deployment Configuration" section body with:

```markdown
- Hosted on Render (free tier) as a Docker web service; pushes to `main`
  auto-deploy
- `Dockerfile` pre-builds Fresh assets (`deno task build`) at image build time
- Server port comes from the `PORT` env var (defaults to 8000 locally)
- The filesystem is ephemeral on Render — do not add features that persist
  to local files
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "Update CLAUDE.md for analytics removal and Render deployment"
```

---

### Task 4: Read the server port from the PORT env var

Render injects `PORT` and expects the service to bind to it; Fresh 1.x does not read it automatically.

**Files:**
- Modify: `fresh.config.ts`

- [ ] **Step 1: Edit `fresh.config.ts`**

Replace the whole file with:

```ts
import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
  plugins: [tailwind()],
  server: { port: Number(Deno.env.get("PORT") ?? "8000") },
});
```

- [ ] **Step 2: Verify**

Run: `deno task check`
Expected: passes.

Run (in a throwaway shell, Ctrl-C after it prints the listen line):
`PORT=8123 deno run -A --unstable-detect-cjs main.ts`
Expected: startup log shows it listening on port **8123**, and `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8123/` returns `200`.

- [ ] **Step 3: Commit**

```bash
git add fresh.config.ts
git commit -m "Read server port from PORT env var for Render"
```

---

### Task 5: Add Dockerfile and .dockerignore

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`

- [ ] **Step 1: Create `Dockerfile`**

The `denoland/deno` image's entrypoint is the `deno` binary, so `CMD` starts with the subcommand. `deno task build` performs Fresh's ahead-of-time asset build (islands + Tailwind) so cold starts don't JIT-compile.

```dockerfile
FROM denoland/deno:2.6.8

WORKDIR /app

COPY . .

RUN deno cache main.ts
RUN deno task build

EXPOSE 8000

CMD ["run", "-A", "--unstable-detect-cjs", "main.ts"]
```

- [ ] **Step 2: Create `.dockerignore`**

```
.git
node_modules
_fresh
_fresh.zip
docs
*.code-workspace
.vscode
```

- [ ] **Step 3: Build and run the container locally**

Requires Docker Desktop running. If Docker is unavailable on this machine, substitute: `deno task build && deno task preview` and verify the same curls on port 8000, then continue.

```bash
docker build -t resufolio .
docker run --rm -p 8000:8000 -e PORT=8000 resufolio
```

Expected: build succeeds; container logs show Fresh listening on port 8000.

- [ ] **Step 4: Click-through verification**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/          # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/projects  # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/resume    # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/styles.css # 200
```

Then open http://localhost:8000 in a browser and confirm: portfolio cards render with styling and the lightbox opens; `/projects` videos play; `/resume` PDF viewer loads. Stop the container when done.

- [ ] **Step 5: Commit and push**

```bash
git add Dockerfile .dockerignore
git commit -m "Add Dockerfile for Render deployment"
git push origin main
```

---

### Task 6: Deploy on Render and point the domain (manual — Joel + dashboard)

No code changes. These steps happen in web dashboards.

- [ ] **Step 1: Create the Render service**

1. Sign up at https://render.com with GitHub (free, no card).
2. New → Web Service → connect the resufolio repo.
3. Language/runtime: **Docker** (auto-detected from the Dockerfile). Instance type: **Free**. Branch: `main`.
4. Create the service and wait for the first build + deploy.

- [ ] **Step 2: Verify the `.onrender.com` URL**

Repeat the Task 5 Step 4 click-through against `https://<service>.onrender.com`.

- [ ] **Step 3: Add the custom domain**

1. Render dashboard → the service → Settings → Custom Domains → add the domain.
2. At the DNS provider: for a `www` or subdomain, add a `CNAME` to `<service>.onrender.com`; for the apex domain, use the provider's `ALIAS`/`ANAME` if offered, otherwise the `A` record value Render's dialog displays.
3. Wait for Render to verify and issue TLS (minutes to an hour), then click through `https://<domain>`.

- [ ] **Step 4: Keep-alive pinger**

1. Sign up at https://uptimerobot.com (free, no card).
2. Add an HTTP(s) monitor for the custom domain at a 5-minute interval.
3. This prevents the 15-minute free-tier spin-down; 750 free hours/month cover one service running 24/7.

- [ ] **Step 5: Decommission Deno Deploy Classic**

After the custom domain serves from Render: remove the domain from the Deploy Classic project at dash.deno.com, then delete the project (it shuts down 2026-07-20 regardless).
