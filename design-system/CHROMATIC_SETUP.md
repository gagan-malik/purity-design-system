# Chromatic Visual Testing Setup

## ✅ Chromatic is Configured!

Chromatic is now set up to run visual regression tests on your Storybook components.

## 🎯 Available Commands

### Manual Run (Local Development)
```bash
cd design-system
yarn chromatic
```

This will:
- Build Storybook
- Upload to Chromatic
- Capture screenshots of all stories
- Show you visual diffs

### CI/CD Run (Automated)
```bash
yarn chromatic:ci
```

This runs Chromatic in CI mode with `--exit-zero-on-changes` flag, which:
- Exits with code 0 even if changes are detected
- Perfect for GitHub Actions workflows
- Won't fail your build pipeline

## 📋 Your Configuration

- **Project Token**: `chpt_9397266190a54f0`
- **Project URL**: Check your Chromatic dashboard

## 🚀 GitHub Actions Integration

Chromatic can be added to your GitHub Actions workflow to run automatically on:
- Pull requests
- Commits to main branch
- Manual workflow triggers

## 📚 Next Steps

1. **Test locally:**
   ```bash
   cd design-system
   yarn build-storybook  # Make sure build works first
   yarn chromatic
   ```

2. **View results:**
   - Go to your Chromatic dashboard
   - See visual diffs and approve changes

3. **Set up GitHub Actions** (optional):
   - Add Chromatic to your workflow
   - Run on every PR automatically

## 🔧 Configuration

The token is stored in `package.json` scripts. For security in CI/CD:
- Use GitHub Secrets: `CHROMATIC_PROJECT_TOKEN`
- Update script: `chromatic --project-token=${{ secrets.CHROMATIC_PROJECT_TOKEN }}`

## 📖 Documentation

Full Chromatic docs: https://www.chromatic.com/docs/

---

**Once Storybook build is fixed, run `yarn chromatic` to start visual testing!** 🎨

