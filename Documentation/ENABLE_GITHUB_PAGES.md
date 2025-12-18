# Enable GitHub Pages - Step by Step Guide

## 🎯 Quick Fix for 404 Error

Your deployment worked, but GitHub Pages needs to be enabled on the repository.

## 📋 Step-by-Step Instructions

### Step 1: Go to Repository Settings

**Option A: If deploying to `gaganmalik.github.io`:**
```
https://github.com/gagan-malik/gaganmalik.github.io/settings/pages
```

**Option B: If deploying to same repo:**
```
https://github.com/gagan-malik/purity-design-system/settings/pages
```

### Step 2: Configure GitHub Pages

1. Scroll to **"Pages"** section (left sidebar)
2. Under **"Source"**, select:
   - **"Deploy from a branch"**
3. Select branch:
   - **"main"** (or `gh-pages` if workflow creates that branch)
4. Select folder:
   - **"/ (root)"**
5. Click **"Save"**

### Step 3: Wait for Activation

- GitHub will process the activation
- You'll see: "Your site is live at https://..."
- Takes **1-2 minutes**

### Step 4: Verify

Visit your site:
- https://gaganmalik.github.io/

## 🔍 Check Deployment Status

First, verify files were deployed:

1. Go to the repository that should have your files
2. Check if `index.html` exists
3. Check if there are static files

If no files exist:
- Check Actions tab for deployment errors
- Verify `GH_PAGES_TOKEN` secret is set correctly
- Check workflow logs for errors

## 🎯 Recommended: Deploy to Same Repository

Instead of external repo, deploy to `gh-pages` branch in same repo:

**Benefits:**
- ✅ Simpler setup
- ✅ No need for separate repository
- ✅ Easier to manage

Should I update the workflow to deploy to `gh-pages` branch instead?

---

**Action Required:** Enable GitHub Pages in repository settings! 🚀

