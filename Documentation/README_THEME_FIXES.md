# Theme Fixes Applied

## Issues Fixed

### 1. ✅ Missing License Field
- **Problem:** Root `package.json` was missing license field
- **Fix:** Added `"license": "MIT"` to root package.json

### 2. ✅ Storybook Command Not Found
- **Problem:** Storybook script is in `design-system/package.json`, but you're running from root
- **Fix:** Added scripts to root package.json that delegate to design-system folder

## How to Run Storybook

You can now run storybook from the root directory:

```bash
yarn storybook
```

Or from the design-system directory:

```bash
cd design-system
yarn storybook
```

Both will work! The root script automatically navigates to the design-system folder.

## Scripts Added to Root package.json

- `yarn storybook` - Runs storybook from design-system
- `yarn build-storybook` - Builds storybook from design-system
- `yarn rollup` - Runs rollup build from design-system

All scripts delegate to the design-system folder automatically.

