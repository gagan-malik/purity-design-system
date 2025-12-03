# Troubleshooting GitHub Pages Deployment

## 🔍 Common Issues & Solutions

### Issue 1: Workflow Not Running

**Symptoms:**
- Workflow doesn't appear in Actions tab
- No workflow runs when pushing

**Solutions:**
1. Check workflow file exists: `.github/workflows/deploy-docs.yml`
2. Verify workflow is on `main` branch
3. Check file path filters match your changes

### Issue 2: Build Fails

**Symptoms:**
- Workflow runs but fails at "Build Storybook" step
- Error messages in Actions logs

**Solutions:**
1. **Check Actions Logs:**
   - Go to: https://github.com/gagan-malik/purity-design-system/actions
   - Click on failed workflow run
   - Check error messages

2. **Common Build Errors:**
   - Missing dependencies → Check `package.json`
   - TypeScript errors → Fix type errors
   - Missing files → Verify all required files exist

3. **Test Build Locally:**
   ```bash
   cd design-system
   yarn install
   yarn build-storybook
   ```

### Issue 3: Deployment Fails

**Symptoms:**
- Build succeeds but deployment fails
- Error about authentication or token

**Solutions:**
1. **Check Token Secret:**
   - Verify `GH_PAGES_TOKEN` secret exists
   - Go to: Settings → Secrets → Actions
   - Ensure token has `repo` scope

2. **Verify Repository:**
   - Check `gagan-malik/gaganmalik.github.io` exists
   - Ensure you have write access

3. **Check Token Permissions:**
   - Token must have `repo` scope
   - Regenerate token if needed

### Issue 4: 404 on GitHub Pages

**Symptoms:**
- Workflow completes but site shows 404
- No content at gaganmalik.github.io

**Solutions:**
1. **Wait for Propagation:**
   - GitHub Pages can take 5-10 minutes
   - Wait and refresh

2. **Check Repository:**
   - Verify `gagan-malik/gaganmalik.github.io` is public
   - Check if repository has content

3. **Verify Deployment:**
   - Check Actions log for deployment step
   - Verify files were pushed

## 🛠️ Debugging Steps

### Step 1: Check Workflow Status

1. Go to: https://github.com/gagan-malik/purity-design-system/actions
2. Find "Deploy Storybook to GitHub Pages" workflow
3. Check if it's running or failed
4. Click on the workflow run to see details

### Step 2: Check Error Messages

Look for specific error messages:
- Authentication errors → Token issue
- Build errors → Dependencies or code issues
- Permission errors → Token scope issue

### Step 3: Verify Configuration

1. **Workflow File:**
   - Location: `.github/workflows/deploy-docs.yml`
   - Should exist and be valid YAML

2. **Repository:**
   - Target: `gagan-malik/gaganmalik.github.io`
   - Should exist on GitHub

3. **Secrets:**
   - Name: `GH_PAGES_TOKEN`
   - Must have `repo` scope

### Step 4: Test Locally

Test the build process locally:

```bash
cd design-system
yarn install
yarn build-storybook
```

If this fails, fix the errors before deploying.

## 📋 Quick Checklist

- [ ] Workflow file exists: `.github/workflows/deploy-docs.yml`
- [ ] `GH_PAGES_TOKEN` secret is added
- [ ] Token has `repo` scope
- [ ] Repository `gagan-malik/gaganmalik.github.io` exists
- [ ] Local build works: `yarn build-storybook`
- [ ] Workflow is on `main` branch

## 🚨 Still Not Working?

If the above doesn't help, check:
1. Actions tab for specific error messages
2. Workflow logs for detailed errors
3. Token permissions and validity
4. Repository access and existence

Share the specific error message and I can help fix it!

