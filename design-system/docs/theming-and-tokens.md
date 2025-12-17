# Theming & tokens

## How theme works

- `ThemeProvider` manages a `theme` value: `"light" | "dark" | "system"`
- It applies `.dark` to `document.documentElement` when the effective theme is dark
- It persists the selection in `localStorage` (default key: `purity-theme`)

Source: `src/contexts/ThemeContext.tsx`

## Token source of truth

Tokens are defined as CSS variables in:

- `src/styles/tailwind-theme.css`

There are two layers:

- `:root` → light theme variables
- `.dark` → overrides for dark theme

## How tokens are used in components

Prefer **semantic tokens** (what the color is *for*), not raw palette values.

Good:

- `bg-bg-primary`
- `text-text-primary`
- `border-border-secondary`

Avoid (unless you are building foundational primitives):

- `bg-blue-600`
- `text-gray-900`

## Adding / changing tokens

1) Add the variable to `tailwind-theme.css` under `:root`.
2) Add the matching dark override under `.dark` (or explicitly confirm it should remain identical).
3) Map it via Tailwind theme extension if you want a typed/consistent class name.
4) Update Storybook stories to validate both themes.

## Accessibility defaults

- Ensure focus rings are visible in both themes.
- Verify contrast for text tokens (`text-text-primary`, `text-text-secondary`, `text-text-tertiary`).

## Theme controls

The design system ships:

- `ThemeToggle`
- `ThemeSelector`
- `useTheme()`

See also: `../THEME_DOCUMENTATION.md` (legacy doc; this file is the maintained reference going forward).
