# Upgrade Node.js to Version 22

## 🎯 Goal
Upgrade from Node.js 21.7.2 to Node.js 22 to support Storybook 10.

## 📋 Methods to Upgrade Node.js

### Method 1: Using Homebrew (Recommended for macOS)

If you have Homebrew installed:

```bash
# Install Node.js 22
brew install node@22

# Or upgrade existing Node.js
brew upgrade node
```

After installation, you may need to:
```bash
# Link the new version
brew link --overwrite node@22
```

### Method 2: Using nvm (Node Version Manager)

First, install nvm if you don't have it:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Then install and use Node 22:
```bash
# Install Node 22
nvm install 22

# Use Node 22
nvm use 22

# Set as default
nvm alias default 22
```

### Method 3: Download from nodejs.org

1. Visit: https://nodejs.org/
2. Download Node.js 22 LTS
3. Install the .pkg file
4. Restart your terminal

### Method 4: Using fnm (Fast Node Manager)

```bash
# Install fnm (if not installed)
brew install fnm

# Install Node 22
fnm install 22

# Use Node 22
fnm use 22

# Set as default
fnm default 22
```

## ✅ Verify Installation

After upgrading, verify:

```bash
node --version  # Should show v22.x.x
npm --version   # Should show npm version
```

## 🚀 Complete Storybook Upgrade

After upgrading Node.js:

```bash
cd design-system
yarn install
yarn storybook
```

## 📝 Notes

- Node 22 is the latest LTS version
- It's fully compatible with Storybook 10
- Your current Node 21.7.2 needs to be replaced

---

**Let me know which method you'd like to use, or I can help you with the installation!**

