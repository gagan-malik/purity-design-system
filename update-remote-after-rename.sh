#!/bin/bash

# Script to update git remote after renaming repository on GitHub

echo "🔄 Updating git remote to new repository name..."
echo ""

# Update remote URL
git remote set-url origin https://github.com/gagan-malik/purity-design-system.git

echo "✅ Remote URL updated!"
echo ""

# Verify the change
echo "📋 Current remote configuration:"
git remote -v

echo ""
echo "🧪 Testing connection..."
git fetch origin --dry-run 2>&1 | head -5

echo ""
echo "✅ Done! Your repository remote is now pointing to:"
echo "   https://github.com/gagan-malik/purity-design-system.git"
echo ""

