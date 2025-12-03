# Create Personal Access Token - Step by Step

## 🎯 Goal
Create a Personal Access Token to allow GitHub Actions to deploy to your GitHub Pages repository.

## 📋 Step-by-Step Instructions

### Step 1: Open Token Creation Page
I've opened this page for you: https://github.com/settings/tokens/new

### Step 2: Fill Out the Form

1. **Note (Name):**
   - Enter: `Purity Design System - GitHub Pages`
   - This is just a label to remember what this token is for

2. **Expiration:**
   - Choose your preference:
     - **90 days** (recommended for security)
     - **No expiration** (convenient but less secure)
   - For now, you can choose "No expiration" if you want

3. **Select Scopes (Most Important!):**
   - Look for the section "Select scopes"
   - Find and check ✅ **`repo`** scope
   - This should be under "Repository access tokens"
   - Full name: "Full control of private repositories"
   - This is REQUIRED for the deployment to work!

### Step 3: Generate Token

1. Scroll to the bottom of the page
2. Click the green **"Generate token"** button
3. **IMPORTANT:** Copy the token immediately!
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again!
   - Save it somewhere safe temporarily

### Step 4: Add Token as Secret

1. Go to: https://github.com/gagan-malik/purity-design-system/settings/secrets/actions
2. Click **"New repository secret"** button
3. Fill in:
   - **Name:** `GH_PAGES_TOKEN` (must be exact)
   - **Secret:** (paste your token here)
4. Click **"Add secret"**

## ✅ That's It!

Once you add the token secret, your deployment workflow will be able to push to your GitHub Pages repository!

## 🔐 Security Note

- The token is stored securely as a GitHub Secret
- It's encrypted and only used during workflow execution
- You can revoke it anytime at: https://github.com/settings/tokens

---

**Ready?** Follow the steps above. I've opened the token creation page for you!

