# Purity Design System

`@purity/design-system` is a React component library built for **consistent UI**, **fast product iteration**, and **theme-aware** styling.

- **Package**: `@purity/design-system`
- **Docs hub**: `./docs/README.md`
- **Theme system**: `./THEME_DOCUMENTATION.md`
- **Storybook**: the primary component catalog

## Quickstart

### Install

This package is published to **GitHub Packages**.

```bash
export NPM_TOKEN="<github pat with read:packages>"
npm install @purity/design-system
```

### Use a component

```tsx
import { Button } from "@purity/design-system";

export function Example() {
  return <Button>Continue</Button>;
}
```

### Enable theming (recommended)

```tsx
import { ThemeProvider } from "@purity/design-system";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="purity-theme">
      {/* app */}
    </ThemeProvider>
  );
}
```

## Repo commands

From repo root:

- **Install**: `yarn install`
- **Run Storybook**: `yarn storybook`
- **Build Storybook**: `yarn build-storybook`
- **Build library**: `yarn rollup`

## Documentation

Start here: `design-system/docs/README.md`

Highlights:

- `docs/getting-started.md` — installation + theme setup
- `docs/theming-and-tokens.md` — how tokens work (CSS variables + `.dark`)
- `docs/components.md` — component authoring standards
- `docs/releasing.md` — versioning and publishing
- `docs/security.md` — secrets and token handling

## Visual testing (Chromatic)

Set an env var (do not commit tokens):

```bash
cd design-system
export CHROMATIC_PROJECT_TOKEN="<token>"
yarn chromatic
```

## Public documentation site

Docs can be deployed via GitHub Pages.

- Setup: `./GITHUB_PAGES_SETUP.md`

## Notes on dependencies

- **`react-tiny-popover`**: popover implementation
- **`recharts`**: chart components