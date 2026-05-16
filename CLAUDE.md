# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on `http://0.0.0.0:5173` (see `vite.config.js`).
- `npm run build` — production build to `dist/` (Vercel + Netlify both deploy from this).
- `npm run preview` — serve the built `dist/` locally.

There is no test runner, linter, or formatter wired up. `test.js` and `srv.js` are legacy scripts that load the obsolete `bundle.js` — ignore them when working on the live app.

## Architecture

Single-page Czech/English marketing site for **LDS Admin** (a B2B platform for local distribution-network operators). It is a static Vite + React 18 build — no backend, no router, no state library; all sections live on one page and link via in-page anchors.

### Entry & composition
- `index.html` mounts `#root` and loads `src/main.jsx`.
- `src/main.jsx` renders `<App/>`, then **dynamically imports `lucide`** after first paint and runs `createIcons` plus a `MutationObserver` so any `<i data-lucide="...">` rendered later gets hydrated. New icons therefore work via the `data-lucide` attribute pattern, not via React components.
- `src/App.jsx` composes the page in fixed order: `Navbar → Hero → LogosStrip → FeatureGrid → StatsBanner → AudienceTabs → Integrations → Contact → Footer → TweaksPanel`. It is wrapped in a local `ErrorBoundary` that prints the stack into the page (so render errors don't show a blank screen).

### Global state — the "tweaks" model
All cross-cutting UI state is held in one `useTweaks` hook in `App.jsx` with these keys: `lang` (`cs`|`en`), `surface` (`light`|`muted`|`dark`), `density` (`comfortable`|`compact`|`dense`), `status`, `mapStyle` (`grid`|`satellite`|`dots`).

These are projected onto `<div class="page" data-surface=… data-density=… data-status=… lang=…>`, and `styles.css` keys most of its theming off those `data-*` attributes. **To restyle for a mode, add a `[data-surface="dark"] .foo {…}` rule rather than threading a prop through React.**

`lang` and `surface` are also exposed via `LangContext` (`src/i18n.jsx`) so any component can call `useT()` to get the current translation tree, or read/write surface for the dark-mode toggle in `Navbar`.

### TweaksPanel (dev-only floating panel)
`src/TweaksPanel.jsx` is a draggable floating panel that lets you change the tweaks at runtime. It is hidden by default and only appears when the host posts `{ type: '__activate_edit_mode' }` via `window.postMessage` (used by the design-tool host that this site is iframed into). It also `postMessage`s `__edit_mode_available` upward on mount. **Don't gate production logic on it — it may never open.**

### i18n
`src/i18n.jsx` is the single source of truth. It exports the full `I18N` object (Czech + English, structured per-section) and `useT()` which returns the active language's tree. New copy goes here, mirrored in both `cs` and `en`. Components that need to branch on language compare `t === I18N.cs` (see `Contact.jsx`).

### Styling
Everything is in the single root-level `styles.css` (~1k lines). Tokens are defined as CSS custom properties under `:root` (brand colors, neutrals, spacing, radii, motion, density-driven `--section-py` / `--container-px`). Light is the default; dark mode is `[data-surface="dark"]`. **Do not introduce CSS modules, Tailwind, or styled-components** — keep additions in `styles.css` using the existing token vars.

### Assets
Logos are served from `/assets/logo-{light,dark}.png` — these live under `public/assets/` so Vite copies them verbatim. The Hero map background is inline SVG inside `src/Hero.jsx` (no external image).

## Things to know before editing

- **Two parallel component dirs exist.** `src/` is live; the top-level `components/` directory is a legacy pre-Vite snapshot (uses globals, no imports) and is **not** used by the build. Edit `src/`. Same applies to `bundle.js`, `vendor/`, `srv.js`, `test.js` — legacy.
- **Lucide icons render via `<i data-lucide="icon-name"></i>`**, not as React components. The `MutationObserver` in `main.jsx` upgrades them after render.
- **Sign-in CTA hard-links to `https://main.ldsadmin.cz`** (in `Navbar.jsx`).
- Deploy targets: `vercel.json` (build → `dist/`) and `netlify.toml` (publishes from repo root — note this is currently inconsistent with the Vite output and may need attention if Netlify is the active host).
