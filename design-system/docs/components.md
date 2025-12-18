# Components

## Mental model (shadcn-inspired)

Components are **plain React components** with a predictable contract:

- a stable, typed props interface
- token-first styling
- accessible interaction patterns
- Storybook stories that show common usage + edge cases

## Where components live

- `src/components/<ComponentName>/...`

Exports are centralized in `src/components/index.ts`.

## Authoring checklist (Definition of Done)

- **API**: props are named consistently (e.g. `variant`, `size`, `disabled`, `onChange`).
- **Tokens**: prefer semantic tokens (`bg-*`, `text-*`, `border-*`) over hardcoded values.
- **States**: default/hover/active/focus/disabled are defined.
- **Keyboard**: tab order, focus ring, escape/enter/space behavior (where applicable).
- **ARIA**: labels, roles, and relationships are correct.
- **Mobile**: touch targets are at least 44px where interaction requires it.
- **Storybook**: includes stories for primary variants and accessibility-sensitive states.

## Component taxonomy

- **Primitives**: Button, Input, Checkbox, Toggle, Label, Separator
- **Overlays**: Modal, Popover, HoverCard, ToolTip, Sheet
- **Navigation**: SideNav, BottomNav, Breadcrumb, NavigationMenu
- **Composites**: Cards, Toolbars, Form groups

## Atomic Design taxonomy (recommended)

See: `design-system/docs/atomic-design.md`

## API conventions

- Prefer `children` for content.
- Prefer `asChild` pattern if you need polymorphism (consider adopting it consistently).
- Avoid booleans that invert meaning (e.g. `disableX` vs `enabled`).
- Avoid `customClass` naming; prefer `className` across the library.

## Deprecations

When changing a component API:

- keep the old prop supported for at least one minor version
- warn in docs and Storybook
- remove in the next major release
