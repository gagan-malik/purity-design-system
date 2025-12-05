#!/bin/bash

# Script to list and clone Presto repositories from presto-labs-ai organization
# Usage: ./list-and-clone-repos.sh [GITHUB_TOKEN]

set -e

GITHUB_TOKEN="${1:-${GITHUB_TOKEN}}"
ORG="presto-labs-ai"
WORKSPACE_DIR="/Users/gaganmalik/Development"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GitHub token required"
    echo "Usage: $0 [GITHUB_TOKEN]"
    echo "Or set GITHUB_TOKEN environment variable"
    exit 1
fi

echo "🔍 Listing repositories in $ORG organization..."
echo ""

# List all repositories
RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/orgs/$ORG/repos?per_page=100")

# Check for errors
if echo "$RESPONSE" | grep -q '"message"'; then
    ERROR_MSG=$(echo "$RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('message', 'Unknown error'))" 2>/dev/null || echo "Unknown error")
    echo "❌ Error: $ERROR_MSG"
    echo "Please check:"
    echo "  1. Token is valid and not expired"
    echo "  2. Token has 'repo' scope"
    echo "  3. Token has access to $ORG organization"
    exit 1
fi

REPOS=$(echo "$RESPONSE" | python3 -c "import sys, json; repos = json.load(sys.stdin); print('\n'.join([r['name'] for r in repos if isinstance(repos, list)]))" 2>/dev/null)

if [ -z "$REPOS" ] || [ "$REPOS" = "None" ]; then
    echo "❌ No repositories found or invalid response"
    echo "Response: $RESPONSE" | head -20
    exit 1
fi

echo "📦 Found repositories:"
echo "$REPOS"
echo ""

# Clone each repository
cd "$WORKSPACE_DIR"
for repo in $REPOS; do
    if [ -d "$repo" ]; then
        echo "⏭️  Skipping $repo (already exists)"
    else
        echo "📥 Cloning $repo..."
        git clone "https://${GITHUB_TOKEN}@github.com/${ORG}/${repo}.git" || {
            echo "⚠️  Failed to clone $repo, trying without token..."
            git clone "git@github.com:${ORG}/${repo}.git" || echo "❌ Failed to clone $repo"
        }
    fi
done

echo ""
echo "✅ Done! Repositories cloned to: $WORKSPACE_DIR"

