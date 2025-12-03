#!/bin/bash

echo "🔍 GitHub Pages Deployment Diagnostic"
echo "======================================"
echo ""

echo "1. Workflow Configuration:"
if [ -f ".github/workflows/deploy-docs.yml" ]; then
    echo "   ✅ Workflow file exists"
    if grep -q "GH_PAGES_TOKEN" .github/workflows/deploy-docs.yml; then
        echo "   ✅ Token secret referenced"
    else
        echo "   ❌ Token secret not found in workflow"
    fi
else
    echo "   ❌ Workflow file missing!"
fi

echo ""
echo "2. Repository Configuration:"
REMOTE=$(git remote get-url origin 2>/dev/null || echo "not set")
echo "   Remote: $REMOTE"
if echo "$REMOTE" | grep -q "purity-design-system"; then
    echo "   ✅ Repository name correct"
else
    echo "   ⚠️  Repository name may need update"
fi

echo ""
echo "3. Storybook Configuration:"
if [ -f "design-system/.storybook/main.ts" ]; then
    echo "   ✅ Storybook config exists"
    if grep -q "outputDir" design-system/.storybook/main.ts; then
        echo "   ✅ Output directory configured"
    fi
else
    echo "   ❌ Storybook config missing"
fi

echo ""
echo "4. Build Script:"
if grep -q "build-storybook" design-system/package.json; then
    echo "   ✅ Build script exists"
else
    echo "   ❌ Build script missing"
fi

echo ""
echo "5. Target Repository Check:"
echo "   Target: gagan-malik/gaganmalik.github.io"
echo "   ⚠️  Please verify this repository exists on GitHub"

echo ""
echo "6. Secret Check:"
echo "   ⚠️  Please verify GH_PAGES_TOKEN secret is added:"
echo "   https://github.com/gagan-malik/purity-design-system/settings/secrets/actions"

echo ""
echo "📋 Common Issues:"
echo "   1. Missing GH_PAGES_TOKEN secret"
echo "   2. Token doesn't have 'repo' scope"
echo "   3. Target repository doesn't exist"
echo "   4. Build errors in Storybook"
echo ""
echo "✅ To fix: Check Actions logs for specific error messages"

