# Architecture

## Repository layout

This repo is a Yarn workspace with a single package:

- `design-system/` → publishes `@purity/design-system`

## Package surface

Everything is exported from `src/index.ts`:

- `export * from "./components"`
- `export * from "./hooks"`
- `export * from "./utils"`
- `export * from "./contexts"`

The package also imports `./styles/tailwind-theme.css` in `src/index.ts` so the token CSS variables load when the library is imported.

## Build output

Rollup builds two JS outputs plus a bundled type entry:

- **CJS**: `dist/cjs/index.js`
- **ESM**: `dist/esm/index.js`
- **Types**: `dist/index.d.ts`

Config: `rollup.config.mjs`

## Styling model

- **Runtime tokens**: CSS variables in `src/styles/tailwind-theme.css`
- **Consumption**: Tailwind utilities that point to variables (e.g. `bg-bg-primary` uses `--bg-primary`)
- **Dark mode**: a `.dark` class on `document.documentElement` (Tailwind `darkMode: "selector"`)

## Storybook

Storybook is configured in `design-system/.storybook/*`.

- A global toolbar controls theme.
- Stories are wrapped in `ThemeProvider` so components are previewed with real token values.

## Publishing

- Registry: GitHub Packages (`publishConfig.registry`)
- Versioning: SemVer with helper scripts in `design-system/scripts/publish.js`

See `./releasing.md`.
