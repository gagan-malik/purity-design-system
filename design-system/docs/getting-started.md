# Getting started

## Install

This package publishes to **GitHub Packages** (`https://npm.pkg.github.com`).

1) Authenticate (do not commit tokens)

- Create a classic PAT with **`read:packages`** (and **`write:packages`** if publishing).
- Export it locally:

```bash
export NPM_TOKEN="<your token>"
```

2) Install

```bash
npm install @purity/design-system
# or
yarn add @purity/design-system
```

## Use in your app

```tsx
import { Button } from "@purity/design-system";

export function Example() {
  return <Button>Continue</Button>;
}
```

## Theme setup (recommended)

Wrap your app once, close to the root.

```tsx
import { ThemeProvider } from "@purity/design-system";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="purity-theme">
      {/* routes */}
    </ThemeProvider>
  );
}
```

Then use theme-aware tokens in classNames:

- `bg-bg-primary`
- `text-text-primary`
- `border-border-secondary`

## Tailwind + CSS

This library imports `src/styles/tailwind-theme.css` from its package entrypoint, so consumers typically do **not** need to import it manually.

If your app uses Tailwind:

- Ensure Tailwind processes **your app** classes.
- Use tokens exposed by the design system classes (e.g. `bg-bg-primary`).

If you need to align Tailwind config with the library (advanced):

- Reference `design-system/tailwind.config.js` as a baseline for screens/radius/shadows and token mapping.

## Storybook (local)

From repo root:

```bash
yarn install
yarn storybook
```

Storybook runs on port `6006`.
