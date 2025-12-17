# Purity Design System Documentation

This folder is the **source of truth** for how we build, use, and evolve `@purity/design-system`.

## Start here

- **Overview**: `./overview.md`
- **Getting started** (install + Tailwind + ThemeProvider): `./getting-started.md`
- **Architecture** (how the package is assembled): `./architecture.md`
- **Theming & tokens** (CSS variables, dark mode): `./theming-and-tokens.md`
- **Components** (authoring standards + API expectations): `./components.md`
- **Storybook** (docs, visual testing): `./storybook.md`
- **Contributing** (branch-to-release workflow): `./contributing.md`
- **Releasing & publishing**: `./releasing.md`
- **Security & secrets**: `./security.md`

## What this library is

A React component library, distributed as ESM + CJS via Rollup, styled with Tailwind classes backed by **CSS variables**. It ships a **theme system** (light/dark/system) and a Storybook instance used as:

- a component catalog
- a documentation site
- a visual regression surface (Chromatic)

## Design goal (shadcn-inspired)

Shadcn’s best idea is not a “UI kit”—it’s a **workflow**:

- treat components as readable code you can learn from
- keep styling decisions close to the component (composition over configuration)
- standardize primitives (tokens, spacing, radii, focus rings, etc.) so the product feels coherent

This documentation codifies that workflow for Purity.
