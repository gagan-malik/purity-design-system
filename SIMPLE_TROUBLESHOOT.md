# Simple Troubleshooting - What's Not Working?

## 🎯 Quick Check

**What exactly is happening?**

1. **Workflow doesn't appear in Actions tab**
   - Fix: Check workflow file is on `main` branch

2. **Workflow runs but fails**
   - Check Actions logs for error message
   - Most common: Missing token or authentication error

3. **Build fails**
   - Check error in Actions logs
   - Test locally: `cd design-system && yarn build-storybook`

4. **Deployment fails**
   - Usually: Missing `GH_PAGES_TOKEN` secret
   - Fix: Add token secret with `repo` scope

5. **404 on gaganmalik.github.io**
   - Wait 5-10 minutes after deployment
   - Check repository exists and is public

## ⚡ Quick Fix

**90% of issues are fixed by adding the token:**

1. Create token: https://github.com/settings/tokens/new
   - Scope: ✅ `repo`
   
2. Add secret: https://github.com/gagan-malik/purity-design-system/settings/secrets/actions
   - Name: `GH_PAGES_TOKEN`
   - Value: (paste token)

3. Trigger workflow: Actions → Run workflow

## 📋 Need More Help?

Share:
- Screenshot of error
- Error message from Actions logs
- Which step fails

I can fix it with that info!

