#!/bin/bash

# Script to analyze Presto codebase structure and tech stack
# Usage: ./analyze-codebase.sh [REPO_DIRECTORY]

set -e

REPO_DIR="${1:-.}"
OUTPUT_FILE="codebase-analysis.md"

echo "🔍 Analyzing Presto codebase..."
echo "Directory: $REPO_DIR"
echo ""

# Create analysis file
cat > "$OUTPUT_FILE" << 'EOF'
# Presto Codebase Analysis

Generated: $(date)

## Repository Structure

EOF

echo "## Repository Structure" >> "$OUTPUT_FILE"
echo "\`\`\`" >> "$OUTPUT_FILE"
find "$REPO_DIR" -maxdepth 3 -type f -name "package.json" -o -name "*.config.js" -o -name "*.config.ts" -o -name "tsconfig.json" -o -name ".env.example" 2>/dev/null | head -50 >> "$OUTPUT_FILE" || true
echo "\`\`\`" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Find all package.json files
echo "## Package.json Files" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
for pkg in $(find "$REPO_DIR" -name "package.json" -not -path "*/node_modules/*" 2>/dev/null); do
    echo "### $pkg" >> "$OUTPUT_FILE"
    echo "\`\`\`json" >> "$OUTPUT_FILE"
    cat "$pkg" | head -30 >> "$OUTPUT_FILE" || true
    echo "\`\`\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

# Find build configs
echo "## Build Configuration Files" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
for config in $(find "$REPO_DIR" -name "*.config.*" -o -name "rollup.config.*" -o -name "webpack.config.*" -o -name "vite.config.*" -o -name "next.config.*" 2>/dev/null | head -20); do
    echo "### $config" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
    head -50 "$config" >> "$OUTPUT_FILE" || true
    echo "\`\`\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

# Find environment files
echo "## Environment Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
for env in $(find "$REPO_DIR" -name ".env.example" -o -name ".env.template" -o -name ".env.local.example" 2>/dev/null); do
    echo "### $env" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
    cat "$env" >> "$OUTPUT_FILE" || true
    echo "\`\`\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

# Database files
echo "## Database Files" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
find "$REPO_DIR" -name "*migration*" -o -name "*schema*" -o -name "*.sql" -o -name "prisma" -type d 2>/dev/null | head -20 >> "$OUTPUT_FILE" || echo "No database files found" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# TypeScript config
echo "## TypeScript Configuration" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
for tsconfig in $(find "$REPO_DIR" -name "tsconfig.json" -not -path "*/node_modules/*" 2>/dev/null); do
    echo "### $tsconfig" >> "$OUTPUT_FILE"
    echo "\`\`\`json" >> "$OUTPUT_FILE"
    cat "$tsconfig" >> "$OUTPUT_FILE" || true
    echo "\`\`\`" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "✅ Analysis complete! Results saved to: $OUTPUT_FILE"

