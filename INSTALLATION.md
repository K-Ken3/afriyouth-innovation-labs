# Installation and Local Development

## Prerequisites

- Node.js 20 or newer (verified with Node 24).
- npm 10 or newer.
- A modern browser (Chrome, Edge, Firefox or Safari).

No global packages and no environment variables are required.

## Install dependencies

From the repository root:

```bash
npm install
```

The lockfile is committed. Use `npm ci` for reproducible installs in CI.

## Run the development server

```bash
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`. To bind a specific host or port:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

## Quality checks

```bash
npm run typecheck
```

This runs `tsc --noEmit`. The project currently uses TypeScript as its lint gate; there is no separate ESLint configuration.

## Production build

```bash
npm run build
```

This runs the typecheck and then builds the static bundle into `dist/`.

```bash
npm run preview
```

Serves `dist/` locally so deep routes and the production bundle can be checked. Use the printed preview URL, not the development server.

## Project configuration

- `vite.config.ts` — React plugin, `@` alias to `src/`, manual vendor chunks, ES2020 target.
- `tailwind.config.js` — design tokens, font families, spacing and motion timing.
- `postcss.config.js` — Tailwind and Autoprefixer.
- `tsconfig.json` — strict TypeScript configuration.
- `vercel.json` — SPA rewrite and security headers.
- `.gitignore` — excludes dependencies, build output, environment files and local editor files.

## Troubleshooting

**Port already in use**

```bash
npm run dev -- --port 5174
```

**Fonts look different**

Fonts are self-hosted from `@fontsource-variable/*` packages. Confirm `npm install` completed and that the imports at the top of `src/styles/index.css` are present.

**Images do not appear**

Photos are served from `public/photos/`. Confirm the four files exist and that the paths in `src/content/photos.ts` start with `/photos/`.

**A deep route returns a 404 in production**

Ensure the host uses an SPA fallback to `index.html`. The provided `vercel.json` handles this for Vercel.

**Animations leave content invisible**

Content is styled visible by default and hidden only when GSAP is active. If this occurs in an unusual environment, verify JavaScript is enabled and that `prefers-reduced-motion` is not forcing an unexpected state. See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#motion).
