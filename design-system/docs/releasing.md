# Releasing & publishing

## Versioning

This library follows **SemVer**:

- **patch**: bug fixes, internal refactors, non-breaking improvements
- **minor**: new components/props that are backwards compatible
- **major**: breaking API changes

## Build artifacts

Publishing requires a build output in `dist/`.

## Publish scripts

From `design-system/`:

```bash
yarn publish:patch
# or
yarn publish:minor
# or
yarn publish:major
```

These scripts:

- bump `design-system/package.json` version
- run the Rollup build
- run `npm publish` to GitHub Packages

## Required environment

- `NPM_TOKEN` must be set for GitHub Packages auth.

## Recommendation

Move publishing into CI so local machines don’t need publish permissions.
