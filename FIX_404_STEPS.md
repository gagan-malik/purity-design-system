# Fix 404 Error - Step by Step

## ✅ Solution: Deploy to Same Repository

I've updated the workflow to deploy to `gh-pages` branch in the same repository. This is simpler and more reliable!

## 📋 Steps to Fix

### Step 1: Push the Updated Workflow

The workflow has been updated. Commit and push:

```bash
git add .github/workflows/deploy-docs.yml
git commit -m "Switch to same-repo deployment"
git push origin main
```

### Step 2: Enable GitHub Pages

1. **Go to Repository Settings:**
   - Visit: https://github.com/gagan-malik/purity-design-system/settings/pages

2. **Configure GitHub Pages:**
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `gh-pages`
   - **Folder**: Select `/ (root)`
   - Click **Save**

3. **Wait for Activation:**
   - GitHub will create the `gh-pages` branch after first deployment
   - Then enable Pages from that branch
   - Takes 1-2 minutes

### Step 3: Trigger Deployment

After pushing the workflow, it will:
1. Build Storybook
2. Create/update `gh-pages` branch
3. Deploy files there

Then enable GitHub Pages from `gh-pages` branch.

### Step 4: Your Site URL

After enabling Pages, your site will be at:
```
https://gagan-malik.github.io/purity-design-system/
```

## 🎯 Quick Checklist

- [ ] Push updated workflow to GitHub
- [ ] Workflow runs and creates `gh-pages` branch
- [ ] Enable GitHub Pages from `gh-pages` branch
- [ ] Wait 1-2 minutes for activation
- [ ] Visit your site!

## 🔄 Benefits of This Approach

- ✅ Simpler - no external repository needed
- ✅ Uses `GITHUB_TOKEN` (no custom PAT required)
- ✅ Everything in one place
- ✅ Easier to manage

---

**Next:** Push the changes and enable GitHub Pages! 🚀

