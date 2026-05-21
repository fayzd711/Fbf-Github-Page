# Found by Fay

An Astro static site for a one-page, endless-scroll visual gallery. The homepage is the product: a Pinterest-inspired editorial archive for aesthetic finds, art references, notes, and affiliate-linked discoveries.

## Stack

- Astro static output
- Plain CSS for the responsive masonry layout
- Client-side JavaScript for progressive loading and modal interactions
- JSON content data for gallery items
- GitHub Actions deployment to GitHub Pages

## Files

- `src/pages/index.astro` contains the page shell, SEO metadata, disclosure, modal markup, and embedded gallery data.
- `src/styles/global.css` contains the responsive editorial layout.
- `src/data/gallery.json` is where new gallery items are added.
- `public/scripts/gallery.js` renders cards and handles progressive loading plus modal interactions.
- `public/assets/hero.png` is the starter visual asset and Open Graph image.
- `public/assets/favicon.svg` is the site icon.
- `.github/workflows/deploy.yml` builds Astro and deploys `dist` to GitHub Pages.
- `docs/process-log.md` records implementation decisions, validation, and blockers as the site evolves.

## Install

```powershell
npm install
```

## Local Development

```powershell
npm run dev
```

Then open the local URL Astro prints in the terminal.

## Build

```powershell
npm run build
```

The production site is generated into `dist`.

## Add A Gallery Item

Add a new object to `src/data/gallery.json`.

Useful fields:

- `id`: unique slug for the item.
- `title`: optional visible title.
- `image`: public image path such as `/assets/example.jpg`; leave blank for a text-only note.
- `alt`: required when `image` is used.
- `caption`: short visible card copy.
- `detail`: longer modal copy.
- `type`: `inspiration`, `affiliate`, `art`, `note`, or `external`.
- `credit`: source or creator label.
- `sourceUrl`: non-affiliate source link.
- `affiliateUrl`: commissionable link.
- `ctaLabel`: button/link text.
- `clickBehavior`: `modal` or `external`.
- `publishDate`: controls display order.
- `featured`: `true` or `false`.
- `aspectRatio`: optional CSS ratio such as `4 / 5`.

Affiliate items should use `type: "affiliate"` so the disclosure appears in the modal.

## Publish On GitHub Pages

1. Push the repository to GitHub.
2. In GitHub, open repository settings.
3. Go to **Pages**.
4. Set **Build and deployment > Source** to **GitHub Actions**.
5. Push to `main` or run the `Deploy to GitHub Pages` workflow manually.
6. Test the live site on desktop and mobile.

The workflow builds the Astro project and publishes the generated `dist` artifact.

Do not use **Deploy from a branch** for this Astro version. The repository root does not contain the generated `index.html`; Astro creates it in `dist` during the GitHub Actions build.

## Process Notes

Use `docs/process-log.md` as the running project journal for architecture decisions, deployment changes, validation results, and blockers.
