# Deploying to gaganmalik.github.io

This document explains how to deploy the Purity Design System documentation to your personal GitHub Pages site at `https://gaganmalik.github.io/`.

## 🎯 Setup Instructions

### Step 1: Verify Your GitHub Pages Repository

✅ Your repository already exists: [gagan-malik/gaganmalik.github.io](https://github.com/gagan-malik/gaganmalik.github.io)

The workflow is configured to deploy to this repository. Make sure it's set to **public** if you want free GitHub Pages hosting.

### Step 2: Create a Personal Access Token

You need a Personal Access Token (PAT) with repository write permissions:

1. Go to: https://github.com/settings/tokens/new
2. Name: `GitHub Pages Deployment`
3. Expiration: Choose your preference
4. **Scopes**: Check `repo` (Full control of private repositories)
5. Click **Generate token**
6. **Copy the token immediately** (you won't see it again!)

### Step 3: Add Token as GitHub Secret

1. Go to your repository: `gagan-malik/purity-design-system`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GH_PAGES_TOKEN`
5. Value: Paste your Personal Access Token
6. Click **Add secret**

### Step 4: Push the Workflow

The workflow is already configured. Just commit and push:

```bash
git add .github/workflows/deploy-docs.yml
git commit -m "Configure deployment to gaganmalik.github.io"
git push origin main
```

### Step 5: Verify Deployment

1. Go to the **Actions** tab in your repository
2. You should see "Deploy Storybook to GitHub Pages" running
3. Once complete, visit: **https://gaganmalik.github.io/**

## 📝 What Happens

The workflow will:
1. Build your Storybook documentation
2. Deploy it to the `gaganmalik/gaganmalik.github.io` repository
3. Your docs will be live at `https://gaganmalik.github.io/`

## 🔄 Automatic Updates

Every time you push changes to `main` that affect Storybook files, the documentation will automatically rebuild and redeploy to your GitHub Pages site.

## 🛠️ Manual Deployment

You can also trigger a manual deployment:
1. Go to **Actions** tab
2. Select **Deploy Storybook to GitHub Pages**
3. Click **Run workflow** → **Run workflow**

## 🎨 Repository Structure

The workflow deploys the built Storybook to the root of your `gaganmalik.github.io` repository, so:
- `https://gaganmalik.github.io/` → Your design system documentation
- Everything else in that repo will be replaced with the docs

## 🔐 Security Notes

- The Personal Access Token is stored as a GitHub Secret (encrypted)
- It's only used during workflow execution
- Never commit the token to your repository
- You can revoke/regenerate the token anytime in GitHub settings

## 📚 Alternative: Project Pages

If you prefer to keep this as a project page (at a subpath like `gaganmalik.github.io/purity-design-system/`), you can:

1. Remove the `external_repository` line from the workflow
2. Enable GitHub Pages in this repository's settings
3. Set source to "GitHub Actions"

But for `gaganmalik.github.io/` root access, use the current setup.

---

**Ready to deploy!** Follow the steps above and your documentation will be live at `https://gaganmalik.github.io/` 🚀

