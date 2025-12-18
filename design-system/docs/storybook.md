# Storybook

## Purpose

Storybook is the design system’s:

- **component catalog**
- **docs site**
- **integration test surface** (visual + interaction)

## Run

From repo root:

```bash
yarn storybook
```

## Theming in Storybook

- `design-system/.storybook/preview.tsx` wraps stories in `ThemeProvider`
- A toolbar selector toggles `light/dark/system`

## Writing stories

- Put stories next to the component: `ComponentName.stories.tsx`
- Add `tags: ["autodocs"]` where possible
- Include:
  - default usage
  - variants
  - disabled/error/loading states
  - long labels / overflow
  - keyboard path where relevant

## Visual regression (Chromatic)

Tokens must not be committed.

- Set `CHROMATIC_PROJECT_TOKEN` in your shell or CI environment.

```bash
cd design-system
CHROMATIC_PROJECT_TOKEN="..." yarn chromatic
```

CI-friendly mode:

```bash
cd design-system
CHROMATIC_PROJECT_TOKEN="..." yarn chromatic:ci
```
