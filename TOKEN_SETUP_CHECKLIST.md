# Personal Access Token Setup - Visual Checklist

## 📋 Step-by-Step Checklist

### ✅ Step 1: Create the Token

**Page:** https://github.com/settings/tokens/new (already opened)

1. [ ] **Note/Name field:**
   ```
   Purity Design System - GitHub Pages
   ```

2. [ ] **Expiration:**
   - Choose: `90 days` or `No expiration`
   - (I recommend 90 days for security)

3. [ ] **Scopes - MOST IMPORTANT:**
   - Scroll down to "Select scopes"
   - Find: ✅ **`repo`** 
   - Full description: "Full control of private repositories"
   - **Check this box!** ✅
   - This is REQUIRED for deployment to work!

4. [ ] **Scroll to bottom and click:**
   - Green button: **"Generate token"**

5. [ ] **COPY THE TOKEN:**
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Copy it NOW** - you won't see it again!
   - Keep it safe (temporarily, just until you add it as a secret)

---

### ✅ Step 2: Add Token as Secret

**Page:** https://github.com/gagan-malik/purity-design-system/settings/secrets/actions (already opened)

1. [ ] Click the button: **"New repository secret"**

2. [ ] **Name field:**
   ```
   GH_PAGES_TOKEN
   ```
   - Must be exactly: `GH_PAGES_TOKEN` (case-sensitive)

3. [ ] **Secret field:**
   - Paste your token here
   - The one you copied in Step 1

4. [ ] Click: **"Add secret"**

---

## ✅ Done!

Once you complete both steps:
- ✅ Token created
- ✅ Secret added

Your deployment workflow will be able to:
- Build Storybook
- Deploy to gaganmalik.github.io
- Automatically update on every push!

---

## 🎯 Quick Reference

**Token Creation:**
- URL: https://github.com/settings/tokens/new
- Required scope: ✅ `repo`
- Name: "Purity Design System - GitHub Pages"

**Add Secret:**
- URL: https://github.com/gagan-malik/purity-design-system/settings/secrets/actions
- Name: `GH_PAGES_TOKEN`
- Value: (your token)

---

**Follow the checklist above and you're all set!** 🚀

