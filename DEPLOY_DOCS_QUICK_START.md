# Quick Start: Deploy Documentation to gaganmalik.github.io

## ✅ Already Configured!

Your GitHub Pages deployment is **already set up**! The workflow will automatically deploy your Purity Design System documentation to `https://gaganmalik.github.io/`.

## 🚀 Complete Setup in 3 Steps

### Step 1: Create Personal Access Token (2 minutes)

1. Go to: https://github.com/settings/tokens/new
2. Name: `Purity Design System - GitHub Pages`
3. Expiration: Choose (90 days recommended or No expiration)
4. **Scopes**: Check ✅ **`repo`** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token immediately!** (You won't see it again)

### Step 2: Add Token as Secret (1 minute)

1. Go to: https://github.com/gagan-malik/purity-design-system/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `GH_PAGES_TOKEN`
4. Value: Paste your Personal Access Token
5. Click **"Add secret"**

### Step 3: Trigger Deployment (Automatic or Manual)

**Automatic (Recommended):**
- Push any change to `main` that affects Storybook files
- Deployment will trigger automatically!

**Manual:**
- Go to: https://github.com/gagan-malik/purity-design-system/actions
- Click **"Deploy Storybook to GitHub Pages"**
- Click **"Run workflow"** → **"Run workflow"**

## 🎯 Your Documentation Will Be Live At

```
https://gaganmalik.github.io/
```

## ✅ What Gets Deployed

- All component stories and documentation
- Interactive component playgrounds
- Component API documentation
- Theme showcase (Light/Dark mode)
- Full Storybook functionality

## 🔄 Automatic Updates

The documentation will automatically update whenever you push changes to:
- Component files (`design-system/src/**`)
- Storybook configuration (`design-system/.storybook/**`)
- Dependencies (`package.json`, `yarn.lock`)

## 📋 Verify Deployment

1. Check Actions: https://github.com/gagan-malik/purity-design-system/actions
2. Look for "Deploy Storybook to GitHub Pages" workflow
3. Wait for completion (2-3 minutes)
4. Visit: https://gaganmalik.github.io/

## 🎉 That's It!

Once you add the `GH_PAGES_TOKEN` secret, your documentation will be live at `https://gaganmalik.github.io/`!

---

**Need help?** See `DEPLOY_DOCS_NOW.md` for detailed troubleshooting.

