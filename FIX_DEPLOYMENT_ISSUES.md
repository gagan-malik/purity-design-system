# Fix Deployment Issues - Quick Reference

## 🎯 Most Common Problems & Solutions

### Problem 1: Workflow Not Running

**Check:**
- Does workflow appear in Actions tab?
- Can you click "Run workflow" button?

**Fix:**
- Ensure workflow file is on `main` branch
- Check workflow file syntax is valid

### Problem 2: Authentication Error

**Error looks like:**
```
Error: Authentication failed
403 Forbidden
```

**Fix:**
1. Create Personal Access Token: https://github.com/settings/tokens/new
2. Check `repo` scope
3. Add as secret: `GH_PAGES_TOKEN`
4. Go to: Settings → Secrets → Actions → New secret

### Problem 3: Build Fails

**Error looks like:**
```
Error: Cannot find module
TypeError: ...
Build failed
```

**Fix:**
1. Check Actions logs for specific error
2. Test locally: `cd design-system && yarn build-storybook`
3. Fix errors before deploying

### Problem 4: Repository Not Found

**Error looks like:**
```
Repository gagan-malik/gaganmalik.github.io not found
```

**Fix:**
1. Verify repository exists: https://github.com/gagan-malik/gaganmalik.github.io
2. Check repository name is correct
3. Ensure you have access

### Problem 5: Deployment Succeeds but 404

**Fix:**
1. Wait 5-10 minutes (GitHub Pages propagation)
2. Check repository is public
3. Verify files were pushed to repository
4. Check repository Settings → Pages

## 🔧 Quick Fixes

### Fix 1: Verify Token Secret

```bash
# Check if secret exists (via GitHub UI):
# Settings → Secrets → Actions
# Should see: GH_PAGES_TOKEN
```

### Fix 2: Test Build Locally

```bash
cd design-system
yarn install
yarn build-storybook

# Should create: storybook-static/ directory
ls -la storybook-static
```

### Fix 3: Check Workflow File

```bash
# Verify workflow exists
cat .github/workflows/deploy-docs.yml

# Check it's valid YAML
```

### Fix 4: Verify Repository

Check these exist:
- ✅ `gagan-malik/purity-design-system` (your repo)
- ✅ `gagan-malik/gaganmalik.github.io` (pages repo)

## 📋 Diagnostic Checklist

- [ ] Workflow file exists and is valid
- [ ] `GH_PAGES_TOKEN` secret is added
- [ ] Token has `repo` scope
- [ ] `gagan-malik/gaganmalik.github.io` repository exists
- [ ] Local build works: `yarn build-storybook`
- [ ] Workflow appears in Actions tab
- [ ] Can manually trigger workflow

## 🚨 Share Specific Error

To help faster, please share:
1. **Error message** from Actions logs
2. **Which step fails** (Build? Deploy?)
3. **Actions URL** so I can see the workflow run

This will help me provide a targeted fix!

