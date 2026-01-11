# Deployment Checklist (web-frame → new site)

This repo is a **minimal, standards-compliant static site scaffold** meant to be copied and adapted per-project.

> Rule 0: **CHECK EVERY TODO** in the codebase before deploying.  
> Rule 1: Keep it minimal. Add modules later, on purpose.

---

## 0) One-time prep (recommended)

- [ ] (Optional but nice) Mark `web-frame` as a **GitHub Template Repo** so you can click “Use this template” instead of copy-pasta.
- [ ] Decide your “default deploy target”:
  - [ ] **Cloudflare Pages** (static) ✅ (assumed by this checklist)
  - [ ] Workers/Functions (only if needed later)

---

## 1) New site intent (fill this in first)

- [ ] **Project name:** `____________`
- [ ] **Primary URL (production):** `https://____________`
  - [ ] Apex/root domain (example: `plyslicer.com`)
  - [ ] Subdomain (example: `app.plyslicer.com`)
- [ ] **Repo name:** `____________`
- [ ] **Cloudflare account / zone:** `____________` (if apex domain)

---

## 2) Create the new repo from this base

### Option A — “copy folder into a new repo” (your described workflow)
- [ ] Create an empty GitHub repo for the new site.
- [ ] Copy the `web-frame/` files into the new repo folder.
- [ ] Remove anything you don’t want carried over (example: old screenshots, old notes).

### Option B — clone + re-home git history (cleaner, still minimal)
- [ ] `git clone https://github.com/cosmicdance-4-2-0/web-frame`
- [ ] `cd web-frame`
- [ ] `git remote remove origin`
- [ ] `git remote add origin <NEW_REPO_URL>`
- [ ] `git push -u origin main`

---

## 3) Content + branding edits (minimum viable “not embarrassing”)

### HTML metadata (SEO/share)
- [ ] Update `<title>` (project name)
- [ ] Update meta description
- [ ] Update keywords (or remove if you don’t want them)
- [ ] Confirm Open Graph / social sharing tags match the new site
- [ ] Confirm the OG image is correct (or replace it)

### Identity assets (PWA / icons)
- [ ] Replace/update `favicon.svg`
- [ ] Replace/update `og-image.svg`
- [ ] Update `manifest.webmanifest`
  - [ ] `name`, `short_name`
  - [ ] `start_url`
  - [ ] icons (paths + sizes)

### Crawl behavior
- [ ] Update `robots.txt`
  - [ ] Confirm it points to the correct sitemap URL (if included)
- [ ] Update `sitemap.xml`
  - [ ] Replace placeholder URLs with the new production domain
  - [ ] Remove pages that don’t exist yet

### Headers & hints (security/caching)
- [ ] Review `_headers`
  - [ ] Confirm any security headers make sense for your current JS/CSS
  - [ ] Confirm caching strategy isn’t going to fight you during rapid iteration

### Service Worker (only if you actually want it)
- [ ] Decide whether `sw.js` is enabled/registered
  - [ ] If yes: bump cache version/name when you ship meaningful changes
  - [ ] If no: ensure it’s not registered anywhere

---

## 4) Local verification (fast, boring, mandatory)

- [ ] Serve locally (don’t trust `file://`):
  - [ ] `python -m http.server 8080` (or any static server)
- [ ] Smoke test:
  - [ ] Page loads with **no console errors**
  - [ ] Mobile viewport behaves
  - [ ] Basic navigation works (if present)
- [ ] Hard refresh test:
  - [ ] If using a service worker: verify updates actually propagate
- [ ] Run a quick Lighthouse pass (optional, but it catches dumb stuff):
  - [ ] Performance isn’t catastrophically bad
  - [ ] Accessibility has no glaring failures

---

## 5) GitHub repo hygiene (minimal “future-you won’t curse you” set)

- [ ] Update `README.md` to match the new project (name, purpose, deploy notes)
- [ ] Confirm `LICENSE` is correct for this new repo
- [ ] Confirm `.gitignore` matches your intended tooling
- [ ] Ensure the default branch is what Cloudflare Pages will track (`main` usually)
- [ ] Tag your first deployable state:
  - [ ] `git tag v0.1.0 && git push --tags`

---

## 6) Cloudflare Pages setup (static, no build)

- [ ] Cloudflare Dashboard → **Pages** → Create a project
- [ ] Connect to the GitHub repo
- [ ] Select production branch (example: `main`)
- [ ] Build settings (static):
  - [ ] Framework preset: None / static
  - [ ] Build command: *(none / empty)*
  - [ ] Output directory: `/`
- [ ] Deploy
- [ ] Confirm the `*.pages.dev` preview URL works

---

## 7) Attach your real domain (plyslicer.com and friends)

### A) Apex/root domain (example: `plyslicer.com`)
- [ ] Ensure the domain is onboarded as a **Cloudflare zone** in the same account as the Pages project
- [ ] Pages Project → **Custom domains** → add `plyslicer.com`
- [ ] Follow Cloudflare’s prompted DNS changes
- [ ] Wait for issuance/activation of TLS (SSL) for the hostname
- [ ] Verify `https://plyslicer.com` loads correctly

### B) Subdomains (example: `app.plyslicer.com`, `docs.plyslicer.com`)
- [ ] Pages Project → **Custom domains** → add `app.plyslicer.com`
- [ ] Add the requested DNS record (often a CNAME) per Cloudflare’s instructions
- [ ] Verify `https://app.plyslicer.com` loads correctly

> Notes:
> - Each hostname you want served should be explicitly added under **Custom domains**.
> - You can either:
>   - map multiple hostnames to one Pages project (same content), **or**
>   - create separate Pages projects per subdomain (different content)

---

## 8) Post-deploy validation (the “don’t get haunted later” sweep)

- [ ] Confirm SSL works and no mixed-content warnings appear
- [ ] Confirm correct canonical URL behavior (www vs non-www, http → https)
- [ ] Confirm `robots.txt` resolves at the right domain
- [ ] Confirm `sitemap.xml` resolves and contains correct absolute URLs
- [ ] If caching is enabled:
  - [ ] Confirm you’re not stuck serving stale JS/CSS
- [ ] Optional but useful:
  - [ ] Add Cloudflare Web Analytics (or your preferred analytics)
  - [ ] Add basic uptime monitoring (even a cheap one)

---

## 9) Repeatable “new site” quick-run (copy/paste block)

- [ ] Copy `web-frame` into new repo
- [ ] Update: title/description/OG
- [ ] Update: manifest + icons
- [ ] Update: robots + sitemap (domain)
- [ ] Review: `_headers`
- [ ] Decide: service worker yes/no
- [ ] Local server smoke test
- [ ] Push → Cloudflare Pages (no build, output `/`)
- [ ] Add custom domain(s)
- [ ] Post-deploy validation sweep

---

## Troubleshooting mini-index

- **It works on localhost but not on Pages**
  - [ ] Check `_headers` didn’t accidentally block scripts via CSP
  - [ ] Check paths are relative and correct
- **Changes won’t show up**
  - [ ] Hard refresh
  - [ ] If service worker is enabled: bump cache version / unregister during development
- **Custom domain won’t activate**
  - [ ] Confirm the domain/zone is in the correct Cloudflare account (apex domains matter)
  - [ ] Confirm DNS records match what Pages prompts you to create
