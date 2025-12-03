# Deploy Documentation Site - Quick Guide

Your GitHub Pages deployment is already configured! Here's what you need to do:

## ✅ Already Set Up

- ✅ Workflow file: `.github/workflows/deploy-docs.yml`
- ✅ Configured to deploy to: `gagan-malik/gaganmalik.github.io`
- ✅ Automatic deployment on push to `main`
- ✅ Builds Storybook and deploys to `https://gaganmalik.github.io/`

## 🚀 Complete the Setup (One-Time)

### Step 1: Create Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Name: `GitHub Pages Deployment for Purity Design System`
3. Expiration: Choose your preference (90 days or No expiration)
4. **Scopes**: Check `repo` (Full control of private repositories)
5. Click **Generate token**
6. **Copy the token immediately!** (You won't see it again)

### Step 2: Add Token as GitHub Secret

1. Go to your repository: https://github.com/gagan-malik/purity-design-system/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `GH_PAGES_TOKEN`
4. Value: Paste your Personal Access Token
5. Click **"Add secret"**

### Step 3: Trigger First Deployment

**Option A: Automatic (Recommended)**
- Just push any change to `main` that affects Storybook files
- The workflow will run automatically

**Option B: Manual Trigger**
1. Go to: https://github.com/gagan-malik/purity-design-system/actions
2. Click **"Deploy Storybook to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**

## 📋 What Happens

1. **Builds Storybook** - Compiles all your component documentation
2. **Deploys to GitHub Pages** - Pushes to `gagan-malik/gaganmalik.github.io`
3. **Live in Minutes** - Your docs will be at `https://gaganmalik.github.io/`

## 🎯 After Deployment

Your documentation will be live at:
```
https://gaganmalik.github.io/
```

The site includes:
- ✅ All component stories and documentation
- ✅ Interactive component playgrounds
- ✅ Component API documentation
- ✅ Theme showcase (Light/Dark mode)
- ✅ All Storybook features

## 🔄 Automatic Updates

Every time you push changes to `main` that affect:
- Component files (`design-system/src/**`)
- Storybook config (`design-system/.storybook/**`)
- Dependencies (`package.json`, `yarn.lock`)

The documentation will automatically rebuild and redeploy!

## 📝 Verify Deployment

1. Check Actions tab: https://github.com/gagan-malik/purity-design-system/actions
2. Look for "Deploy Storybook to GitHub Pages" workflow
3. Wait for it to complete (usually 2-3 minutes)
4. Visit: https://gaganmalik.github.io/

## 🛠️ Troubleshooting

**Workflow not running?**
- Check that the `GH_PAGES_TOKEN` secret is added correctly
- Verify the token has `repo` scope
- Check Actions tab for error messages

**404 on gaganmalik.github.io?**
- Wait 5-10 minutes after deployment
- Verify `gagan-malik/gaganmalik.github.io` repository exists
- Check that the repository is public (if using free GitHub Pages)

**Build failing?**
- Check Actions logs for specific errors
- Verify all dependencies are in `package.json`
- Ensure Yarn lockfile is committed

---

**Ready!** Just add the `GH_PAGES_TOKEN` secret and you're good to go! 🚀

