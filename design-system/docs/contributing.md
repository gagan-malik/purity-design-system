# Contributing

## Philosophy

- Keep the public API small and consistent.
- Prefer improving an existing primitive over adding a new bespoke component.
- Treat documentation and Storybook as part of the feature.

## Local workflow

```bash
yarn install
yarn storybook
```

## Adding a component

- Create `src/components/<Name>/<Name>.tsx`
- Add `src/components/<Name>/index.ts`
- Export from `src/components/index.ts`
- Add stories: `src/components/<Name>/<Name>.stories.tsx`

## Code standards

- Prefer `className` prop over `customClass`.
- Use tokens (`bg-*`, `text-*`, `border-*`) instead of raw colors.
- Avoid leaking implementation details in prop types.

## Review checklist

- API naming matches existing components.
- Theme support validated (light + dark).
- Touch targets respected for interactive controls.
- Storybook shows real-world usage.
