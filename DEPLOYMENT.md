# Deployment

The site is a static Vite single-page application. The repository includes `vercel.json` with an SPA rewrite and basic security headers. No server runtime, database or environment variables are required.

## Status

A public production URL has **not** been verified. The Vercel CLI is installed in the current environment but authentication could not be completed (`fetch failed` while contacting Vercel). Deploy using one of the options below, then complete the post-deploy checklist.

Do not claim the site is live until the production URL and every route have been opened and checked.

## Option A — Vercel CLI

From the repository root:

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted:

- Set up and deploy: **yes**
- Scope: your account or team
- Link to existing project: only if one already exists
- Project name: `afriyouth-innovation-labs` (or the official name)
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Development command: leave the default

The CLI prints the production URL on success.

## Option B — Vercel dashboard

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Install command: `npm install`.
7. No environment variables are needed.
8. Deploy.

Vercel reads `vercel.json` automatically and applies the SPA rewrite and headers.

## Post-deploy checklist

1. Open the production URL and confirm the homepage renders.
2. Open every route directly, not only through client navigation:

   - `/about`
   - `/what-we-do`
   - `/programs`
   - `/insights`
   - `/insights/measuring-what-matters-honestly`
   - `/impact`
   - `/get-involved`
   - `/partner-with-us`
   - `/contact`
   - a deliberately invalid path, to confirm the 404 page

3. Confirm `#impact-measurement`, `#professional-development` and the other practice anchors scroll correctly.
4. Test the contact, interest and partner forms through their full validation and success states.
5. Check the browser console and network panel for errors or failed asset requests.
6. Test at 360px, 390px, 768px, 1024px, 1440px and 1920px widths.
7. Confirm reduced-motion mode leaves all content available.
8. Update the production host in:

   - `public/sitemap.xml`
   - `public/robots.txt`

   Replace `https://afriyouth-innovation-labs.vercel.app` with the verified URL, then redeploy.

9. Confirm `https://<domain>/robots.txt` and `https://<domain>/sitemap.xml` are reachable.
10. Optionally attach the official custom domain in Vercel and repeat steps 1–9.

## Security and caching

`vercel.json` sets:

- SPA rewrite from all paths to `index.html`.
- Immutable one-year caching for `/assets/*`.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `X-Frame-Options: SAMEORIGIN`.

No secrets are stored in the repository. Do not add service tokens or API keys to frontend environment variables, because Vite exposes `VITE_*` values to the browser.

## Rollback

Use the Vercel dashboard deployment history to promote a previous successful deployment. No database migrations are involved.

## Custom domain

Add the domain in **Project Settings → Domains**, follow the DNS instructions, then update the sitemap and robots host to the custom domain and redeploy.
