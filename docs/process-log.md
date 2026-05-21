# Found by Fay Site Process Log

## 2026-05-21 - Linear Plan Execution

Source of truth:

- Linear project: `Github Pages Site`
- Parent issue: `FOU-5 Build one-page endless-scroll visual gallery for Found by Fay`
- Child issues: `FOU-6` through `FOU-12`

Initial direction from Linear:

- Build a one-page endless-scroll visual gallery.
- Prefer Astro static site.
- Use simple static HTML/CSS/JS only as the fallback.
- Keep the homepage as the product.
- Avoid blog sections, shop sections, category landing pages, member accounts, and heavy ecommerce behavior.

## 2026-05-21 - First Local MVP Pass

A plain HTML/CSS/JS MVP was created first because the repository initially contained only:

- `index.html`
- `styles.css`
- `README.md`
- `assets/hero.png`

That pass implemented:

- One-page Found by Fay visual gallery.
- Data-driven content with `data/gallery.json`.
- Reusable card rendering.
- Progressive loading.
- Modal/detail behavior.
- Affiliate disclosure behavior.
- SEO metadata and favicon.
- Local browser verification through a temporary server.

This matched the fallback route but did not match the preferred Astro route in the Linear plan.

## 2026-05-21 - Astro Correction

After review, the site was migrated to Astro to align with the preferred Linear plan.

Current Astro structure:

- `package.json`
- `astro.config.mjs`
- `tsconfig.json`
- `src/pages/index.astro`
- `src/data/gallery.json`
- `src/styles/global.css`
- `src/env.d.ts`
- `public/scripts/gallery.js`
- `public/assets/hero.png`
- `public/assets/favicon.svg`
- `public/.nojekyll`
- `.github/workflows/deploy.yml`

The old root static files were removed:

- `index.html`
- `styles.css`
- `script.js`
- root `data/gallery.json`
- root `assets`

## Current Architecture

The page shell and metadata live in `src/pages/index.astro`.

Gallery data is imported from `src/data/gallery.json` and embedded into the page as JSON. This avoids a runtime fetch and keeps the generated page GitHub Pages friendly.

Card rendering, progressive loading, modal behavior, external links, and affiliate disclosure behavior live in `public/scripts/gallery.js`.

The editorial masonry layout lives in `src/styles/global.css`.

Static assets live in `public/assets`.

## Deployment Plan

Deployment is handled by `.github/workflows/deploy.yml`.

Expected workflow:

1. Check out the repository.
2. Set up Node 22.
3. Run `npm install`.
4. Run `npm run build`.
5. Upload `dist` as the GitHub Pages artifact.
6. Deploy with `actions/deploy-pages`.

GitHub Pages should be configured to use **GitHub Actions** as the source.

## Validation Performed

Confirmed with PowerShell:

- `src/data/gallery.json` parses successfully.
- Gallery contains 10 starter items.
- First image path is `/assets/hero.png`.
- `package.json` contains Astro scripts.
- `.github/workflows/deploy.yml` exists.

Not completed locally:

- `npm install`
- `npm run build`
- `npm run dev`
- Git commit/push

Reason: the current shell does not expose working `npm`, `pnpm`, `bun`, `deno`, or `git`.

## GitHub Access Blocker

The local Git remote is configured as:

```txt
https://github.com/fayzd711/Fbf-Github-Page.git
```

The GitHub connector returned 404 for `fayzd711/Fbf-Github-Page`, while it could access `fayzd711/Fbf-Vibe-Code`.

Until local Git or connector access to the correct repository is available, deployment cannot be completed from this environment.

## Skill Created

A local Codex skill was created for this website:

```txt
C:\Users\fayth\.codex\skills\found-by-fay-site
```

Use `$found-by-fay-site` in future sessions when working on this project.

The skill preserves:

- Astro-first architecture.
- Linear plan guardrails.
- Content model.
- Deployment expectations.
- Environment blockers encountered during setup.
