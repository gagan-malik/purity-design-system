# GitHub Pages Quick Start Guide

## 🎯 Deploying to gaganmalik.github.io

Your Purity Design System documentation will be deployed to: **https://gaganmalik.github.io/**

## 🚀 Quick Setup (5 minutes)

Follow these steps to deploy your documentation:

### Step 1: Verify Your Repository

✅ Your repository already exists: [gagan-malik/gaganmalik.github.io](https://github.com/gagan-malik/gaganmalik.github.io)

The workflow is already configured to deploy to this repository. Make sure it's **public** for free GitHub Pages hosting.

### Step 2: Create Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Name: `GitHub Pages Deployment`
3. Check **`repo`** scope (Full control of private repositories)
4. Click **Generate token** and **copy it immediately**

### Step 3: Add Token as Secret

1. In your `gagan-malik/purity-design-system` repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GH_PAGES_TOKEN`
5. Value: Paste your token
6. Click **Add secret**

### Step 4: Push the Workflow

The workflow file is already created at `.github/workflows/deploy-docs.yml`. Just commit and push:

```bash
git add .github/workflows/deploy-docs.yml
git add design-system/GITHUB_PAGES_SETUP.md
git add design-system/README.md
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### Step 4: Verify Deployment

1. Go to the **Actions** tab in your repository
2. You should see "Deploy Storybook to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Once green ✅, your docs are live!

### Step 5: Access Your Documentation

Your documentation will be live at:
```
https://gaganmalik.github.io/
```

🎉 That's it! Your design system documentation is now publicly accessible!

## 📋 What Was Set Up

✅ **GitHub Actions Workflow** (`.github/workflows/deploy-docs.yml`)
   - Automatically builds Storybook on push to `main`
   - Deploys to GitHub Pages
   - Only runs when Storybook-related files change

✅ **Storybook Configuration** (Updated for GitHub Pages)
   - Optimized output directory
   - Ready for static hosting

✅ **Documentation**
   - Setup guide: `design-system/GITHUB_PAGES_SETUP.md`
   - Updated README with docs link

## 🎯 Next Steps

1. **Custom Domain** (Optional): Add a custom domain in GitHub Pages settings
2. **Badge** (Optional): Add a "View Docs" badge to your README
3. **SEO**: Add meta tags for better search visibility

## 🔄 Automatic Updates

The documentation will automatically update whenever you:
- Push changes to component files
- Update Storybook configuration
- Add new stories or documentation

The workflow is smart - it only runs when relevant files change!

## 🐛 Troubleshooting

**Workflow not running?**
- Check that GitHub Pages source is set to "GitHub Actions"
- Verify workflow permissions are enabled
- Check Actions tab for any errors

**404 on Pages URL?**
- Wait 5-10 minutes after first deployment
- Verify repository name matches URL
- Check workflow completed successfully

**Build failing?**
- Check Actions logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Yarn lockfile is committed

---

**Ready to go!** 🎉 Push the workflow file and your docs will be live in minutes!

