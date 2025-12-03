# GitHub Pages Documentation Site Setup

This document explains how the Purity Design System documentation is automatically deployed to GitHub Pages.

## 📚 Public Documentation Site

The design system documentation is automatically built and deployed to GitHub Pages whenever changes are pushed to the `main` branch.

### Accessing the Documentation

Once GitHub Pages is enabled, your documentation will be available at:

```
https://[your-username-or-org].github.io/[repository-name]/
```

For example:
- `https://gagan-malik.github.io/purity-design-system/` (project page)
- Or deployed to user site: `https://gaganmalik.github.io/` (configured)

### How It Works

1. **Automatic Deployment**: When you push changes to `main` that affect Storybook files, GitHub Actions automatically:
   - Builds the Storybook static site
   - Deploys it to GitHub Pages

2. **Workflow File**: The deployment is handled by `.github/workflows/deploy-docs.yml`

3. **Build Process**: 
   - Installs dependencies using Yarn
   - Builds Storybook using `yarn build-storybook`
   - Deploys the built `storybook-static` directory to GitHub Pages

## 🚀 Initial Setup (One-Time)

To enable GitHub Pages for your repository:

1. **Go to Repository Settings**:
   - Navigate to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar

2. **Configure GitHub Pages**:
   - **Source**: Select "GitHub Actions"
   - Save the settings

3. **Enable Workflow Permissions**:
   - Go to Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Save changes

## ✅ Verification

After pushing the workflow file:

1. Go to the "Actions" tab in your GitHub repository
2. You should see "Deploy Storybook to GitHub Pages" workflow
3. The workflow will run automatically on pushes to `main`
4. Once complete, check the "Deployments" section for the GitHub Pages URL

## 📝 Manual Deployment

You can also trigger a manual deployment:

1. Go to the "Actions" tab
2. Select "Deploy Storybook to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

## 🔧 Local Testing

To test the Storybook build locally before pushing:

```bash
cd design-system
yarn build-storybook
```

The built files will be in `design-system/storybook-static/`. You can serve them locally:

```bash
npx serve design-system/storybook-static
```

## 📦 What Gets Deployed

The documentation site includes:
- All component stories and documentation
- Interactive component playgrounds
- Component API documentation
- Theme showcase
- All Storybook addons (Controls, Actions, Viewport, etc.)

## 🔄 Workflow Triggers

The workflow runs automatically on:
- **Push to `main` branch** (when Storybook files change)
- **Manual trigger** via GitHub Actions UI

### Paths Monitored

The workflow only runs when these paths change:
- `design-system/src/**` (component source)
- `design-system/.storybook/**` (Storybook config)
- `design-system/package.json` (dependencies)
- `design-system/package-lock.json` or `yarn.lock` (lock files)

## 🛠️ Troubleshooting

### Build Fails
- Check GitHub Actions logs for errors
- Verify all dependencies are in `package.json`
- Ensure Yarn lockfile is committed

### Pages Not Updating
- Verify GitHub Pages is enabled in repository settings
- Check that workflow completed successfully
- Wait a few minutes for DNS propagation

### 404 on GitHub Pages
- Verify the repository name matches the URL
- Check that GitHub Pages source is set to "GitHub Actions"
- Ensure workflow has completed successfully

## 📖 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Storybook Deployment Guide](https://storybook.js.org/docs/react/sharing/publish-storybook)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

---

**Note**: After the first successful deployment, the documentation will be publicly accessible at your GitHub Pages URL!

