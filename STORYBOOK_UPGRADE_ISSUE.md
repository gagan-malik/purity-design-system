# Storybook Upgrade Issue - Node Version Incompatibility

## 🔍 Problem

The Storybook upgrade attempted to move from **v7.6.20 to v10.1.4**, but failed during dependency installation.

**Error:**
```
error react-docgen@8.0.2: The engine "node" is incompatible with this module. 
Expected version "^20.9.0 || >=22". Got "21.7.2"
```

## 📊 Current Status

- ✅ Config files were migrated (main.ts updated to ESM)
- ✅ Package.json versions were updated
- ❌ Dependencies failed to install due to Node version

## 🎯 Solutions

### Option 1: Upgrade Node.js (Recommended)

Storybook 10 requires Node 20.9.0+ or Node 22+.

**Using nvm (if installed):**
```bash
# Install Node 22 (LTS)
nvm install 22
nvm use 22

# Or install Node 20
nvm install 20
nvm use 20
```

**Or download from nodejs.org:**
- Node 20 LTS: https://nodejs.org/
- Node 22 LTS: https://nodejs.org/

Then rerun:
```bash
cd design-system
yarn install
```

### Option 2: Use Yarn's Ignore Engines (Temporary)

If you want to proceed anyway (not recommended):

```bash
cd design-system
yarn install --ignore-engines
```

### Option 3: Stay on Storybook 7

If you want to keep Node 21, you'll need to stay on Storybook 7:

```bash
# Revert package.json changes
git checkout design-system/package.json
git checkout design-system/.storybook/main.ts
```

## 📋 What Changed

The upgrade process made these changes:

1. **main.ts** - Converted to ESM format
2. **package.json** - Updated Storybook packages to v10.1.4
3. **Automigrations** - Applied 8 automatic migrations

## 🚀 Recommended Next Steps

1. **Upgrade Node.js to version 20 or 22**
2. **Complete the dependency installation:**
   ```bash
   cd design-system
   yarn install
   ```
3. **Test Storybook:**
   ```bash
   yarn storybook
   ```

---

**Choose an option and I can help implement it!**

