# Quick Fix Guide - GitHub Pages Deployment

## 🎯 Most Likely Issues

Based on common problems, here are the fixes:

### Issue 1: Missing Token Secret ⭐ MOST COMMON

**Symptom:** Deployment step fails with authentication error

**Fix:**
1. Create token: https://github.com/settings/tokens/new
   - Name: `Purity Design System - GitHub Pages`
   - Scope: ✅ `repo`
   - Generate and copy
2. Add secret: https://github.com/gagan-malik/purity-design-system/settings/secrets/actions
   - Name: `GH_PAGES_TOKEN`
   - Value: (paste token)

### Issue 2: Target Repository Doesn't Exist

**Symptom:** "Repository not found" error

**Fix:**
1. Verify exists: https://github.com/gagan-malik/gaganmalik.github.io
2. If missing, create it:
   - Name: `gaganmalik.github.io`
   - Public
   - Don't initialize

### Issue 3: Build Fails

**Symptom:** Storybook build step fails

**Fix:**
1. Test locally: `cd design-system && yarn build-storybook`
2. Fix any errors shown
3. Check Actions logs for specific error

### Issue 4: Workflow Not Running

**Symptom:** No workflow appears in Actions tab

**Fix:**
1. Verify file exists: `.github/workflows/deploy-docs.yml`
2. Check it's on `main` branch
3. Try manual trigger: Actions → Run workflow

## 🔧 Quick Test

Run this locally to verify everything works:

```bash
cd design-system
yarn install
yarn build-storybook
ls -la storybook-static
```

If this works, the workflow should work too!

## 📋 Checklist

- [ ] `GH_PAGES_TOKEN` secret added
- [ ] Token has `repo` scope
- [ ] `gagan-malik/gaganmalik.github.io` repository exists
- [ ] Local build works
- [ ] Workflow file exists on `main` branch

## 🚨 Still Not Working?

Please share:
1. **Actions URL** or screenshot of error
2. **Error message** from workflow logs
3. **Which step fails** (Build? Deploy?)

I can provide targeted fixes with this info!

