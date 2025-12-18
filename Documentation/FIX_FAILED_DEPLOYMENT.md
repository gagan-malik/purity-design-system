# Fix Failed Deployment

## 🔍 What Error Are You Seeing?

To fix it quickly, please check the Actions tab and share:

1. **Which step failed?**
   - Build step?
   - Deployment step?
   - Another step?

2. **Error message?**
   - Copy the exact error text
   - Common errors are listed below

## 🚨 Common Errors & Fixes

### Error 1: "Authentication failed" / "403 Forbidden"

**Problem:** Token issue

**Fix:**
1. Verify token secret exists:
   - Settings → Secrets → Actions
   - Should see: `GH_PAGES_TOKEN`

2. Check token has `repo` scope:
   - Go to: https://github.com/settings/tokens
   - Find your token
   - Verify it has `repo` scope checked

3. Regenerate token if needed:
   - Delete old token
   - Create new one with `repo` scope
   - Update the secret

### Error 2: "Repository not found"

**Problem:** Repository doesn't exist or wrong name

**Fix:**
- Verify: https://github.com/gagan-malik/gaganmalik.github.io exists
- Check repository name is correct
- Ensure you have access

### Error 3: Build Fails

**Problem:** Storybook build has errors

**Fix:**
1. Check Actions logs for specific error
2. Test locally: `cd design-system && yarn build-storybook`
3. Fix any TypeScript/dependency errors

### Error 4: "storybook-static not found"

**Problem:** Build didn't create output directory

**Fix:**
- Check if build actually succeeded
- Verify Storybook config is correct
- Check for build errors

## 🔧 Quick Diagnostic

Run this locally to test:

```bash
cd design-system
yarn install
yarn build-storybook
ls -la storybook-static
```

If this works locally, the workflow should work too!

## 📋 Share Error Details

To get targeted help, please share:
- Screenshot of the error
- Error message text
- Which step failed

I can provide a specific fix!

