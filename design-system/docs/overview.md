# Overview

## Mission

`@purity/design-system` exists to make product UI **faster to build**, **consistent by default**, and **accessible** without every team re-solving the same problems.

## What you get

- **Components**: production-ready UI building blocks (buttons, inputs, navigation, overlays, charts, etc.)
- **Theme system**: light/dark/system with persistence
- **Design tokens**: implemented as CSS variables and consumed through Tailwind utilities
- **Storybook**: live catalog and API surface

## Non-goals

- Not a “one-size-fits-all” UI kit that hides implementation details.
- Not a generic style guide; this is a **shipping** library with versioning and release discipline.

## Principles (team-wide defaults)

- **Consistency beats cleverness**: follow existing patterns unless there’s a measured reason to change.
- **Composition first**: small primitives + predictable props; avoid prop explosions.
- **Tokens over raw values**: prefer `bg-bg-primary` over literal colors.
- **Accessible by construction**: keyboard + focus + ARIA requirements are part of the definition of done.
- **Mobile-aware**: touch targets, spacing, and interaction affordances are deliberate (44px minimum).

## Where to look

- **Exports**: `src/index.ts` (package surface)
- **Components**: `src/components/*`
- **Theme**: `src/contexts/ThemeContext.tsx` and `src/styles/tailwind-theme.css`
- **Tailwind config**: `tailwind.config.js`
- **Build**: `rollup.config.mjs`
- **Storybook**: `.storybook/*`
