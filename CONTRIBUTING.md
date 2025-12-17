# Contributing

Thanks for helping improve Purity Design System.

## Quick start

```bash
yarn install
yarn storybook
```

## Where to make changes

This repo is a monorepo. The component library lives in `design-system/`.

- **Components**: `design-system/src/components/<Name>/`
- **Tokens & theming**: `design-system/src/styles/`
- **Storybook**: `design-system/.storybook/`

## Adding a component (required)

- Create: `design-system/src/components/<Name>/<Name>.tsx`
- Add an `index.ts` in the component folder
- Export from: `design-system/src/components/index.ts`
- Add Storybook stories: `design-system/src/components/<Name>/<Name>.stories.tsx`

## Standards

- Prefer `className` over bespoke styling props.
- Use theme tokens (`bg-*`, `text-*`, `border-*`) instead of raw colors.
- Keep APIs consistent with existing components.
- Add keyboard + focus behaviors for interactive components.

## Pull request checklist

- Storybook stories added/updated
- Light/dark/system theme verified
- No secrets committed (tokens must be `${ENV_VAR}`)

## More details

See the design-system contributor guide:
- `design-system/docs/contributing.md`

