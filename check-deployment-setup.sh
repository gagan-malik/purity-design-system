#!/bin/bash

echo "🔍 Checking GitHub Pages Deployment Setup..."
echo ""

echo "1. Checking workflow file..."
if [ -f ".github/workflows/deploy-docs.yml" ]; then
    echo "   ✅ Workflow file exists"
else
    echo "   ❌ Workflow file missing!"
fi

echo ""
echo "2. Checking Storybook build script..."
if grep -q "build-storybook" design-system/package.json; then
    echo "   ✅ Build script exists"
else
    echo "   ❌ Build script missing!"
fi

echo ""
echo "3. Checking lock file..."
if [ -f "design-system/yarn.lock" ]; then
    echo "   ✅ yarn.lock exists"
elif [ -f "design-system/package-lock.json" ]; then
    echo "   ✅ package-lock.json exists"
else
    echo "   ⚠️  No lock file found"
fi

echo ""
echo "4. Checking Storybook config..."
if [ -f "design-system/.storybook/main.ts" ]; then
    echo "   ✅ Storybook config exists"
else
    echo "   ❌ Storybook config missing!"
fi

echo ""
echo "5. Checking repository remote..."
REMOTE_URL=$(git remote get-url origin 2>/dev/null || git config --get remote.origin.url)
echo "   Remote: $REMOTE_URL"

echo ""
echo "📋 Next Steps:"
echo "   - Check Actions tab for errors: https://github.com/gagan-malik/purity-design-system/actions"
echo "   - Verify GH_PAGES_TOKEN secret is added"
echo "   - Check if gagan-malik/gaganmalik.github.io repository exists"

