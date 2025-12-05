#!/bin/bash

# Script to check for build errors in Presto codebase
# Usage: ./check-build-errors.sh [REPO_DIRECTORY]

set -e

REPO_DIR="${1:-.}"
OUTPUT_FILE="build-errors-report.md"

echo "🔍 Checking for build errors..."
echo "Directory: $REPO_DIR"
echo ""

cat > "$OUTPUT_FILE" << EOF
# Build Errors Report

Generated: $(date)

## Dependency Check

EOF

# Check for package.json and try to install
if [ -f "$REPO_DIR/package.json" ]; then
    echo "## Installing Dependencies" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    cd "$REPO_DIR"
    
    # Check for lock files
    if [ -f "package-lock.json" ]; then
        echo "Found package-lock.json, using npm" >> "../$OUTPUT_FILE"
        npm install 2>&1 | tee -a "../$OUTPUT_FILE" || echo "⚠️ Installation had errors" >> "../$OUTPUT_FILE"
    elif [ -f "yarn.lock" ]; then
        echo "Found yarn.lock, using yarn" >> "../$OUTPUT_FILE"
        yarn install 2>&1 | tee -a "../$OUTPUT_FILE" || echo "⚠️ Installation had errors" >> "../$OUTPUT_FILE"
    else
        echo "No lock file found, trying npm install" >> "../$OUTPUT_FILE"
        npm install 2>&1 | tee -a "../$OUTPUT_FILE" || echo "⚠️ Installation had errors" >> "../$OUTPUT_FILE"
    fi
    
    cd - > /dev/null
    echo "" >> "$OUTPUT_FILE"
fi

# Try to build
echo "## Build Attempt" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
cd "$REPO_DIR"

if [ -f "package.json" ]; then
    # Check for build script
    if grep -q "\"build\"" package.json; then
        echo "Running build script..." >> "../$OUTPUT_FILE"
        npm run build 2>&1 | tee -a "../$OUTPUT_FILE" || echo "❌ Build failed" >> "../$OUTPUT_FILE"
    else
        echo "No build script found in package.json" >> "../$OUTPUT_FILE"
    fi
    
    # Check for TypeScript
    if [ -f "tsconfig.json" ]; then
        echo "" >> "../$OUTPUT_FILE"
        echo "## TypeScript Check" >> "../$OUTPUT_FILE"
        echo "" >> "../$OUTPUT_FILE"
        if command -v tsc &> /dev/null; then
            npx tsc --noEmit 2>&1 | tee -a "../$OUTPUT_FILE" || echo "⚠️ TypeScript errors found" >> "../$OUTPUT_FILE"
        else
            echo "TypeScript compiler not found, skipping type check" >> "../$OUTPUT_FILE"
        fi
    fi
fi

cd - > /dev/null

echo "" >> "$OUTPUT_FILE"
echo "## Summary" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "Check the output above for:" >> "$OUTPUT_FILE"
echo "- Dependency installation errors" >> "$OUTPUT_FILE"
echo "- Build compilation errors" >> "$OUTPUT_FILE"
echo "- TypeScript type errors" >> "$OUTPUT_FILE"
echo "- Missing environment variables" >> "$OUTPUT_FILE"

echo ""
echo "✅ Build check complete! Results saved to: $OUTPUT_FILE"

