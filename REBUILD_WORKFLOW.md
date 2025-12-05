# Presto Platform Rebuild - Complete Workflow

## Overview
This document outlines the complete workflow for rebuilding and deploying the Presto platform.

## Prerequisites

1. **Repository Access**
   - Valid GitHub Personal Access Token with `repo` scope
   - OR repository names to clone manually
   - See `REPO_ACCESS_GUIDE.md` for details

2. **Local Environment**
   - Node.js (v18 or higher recommended)
   - npm or yarn
   - Git
   - Database (PostgreSQL/MySQL/MongoDB - TBD based on codebase)

3. **Vercel Account**
   - Account at https://vercel.com
   - GitHub integration enabled

## Phase 1: Repository Access ✅ (In Progress)

**Status**: Blocked - Need GitHub token or repository names

**Action Items**:
- [ ] Provide GitHub token OR repository names
- [ ] Run `./list-and-clone-repos.sh TOKEN` to clone all repos
- [ ] Verify all repositories are cloned to `/Users/gaganmalik/Development/`

**Expected Repositories**:
- Main frontend application
- Backend/API (if separate)
- Database migrations (if separate)
- Any other related repos

## Phase 2: Codebase Analysis

**Scripts Prepared**:
- `analyze-codebase.sh` - Analyzes structure and tech stack
- `check-build-errors.sh` - Checks for build and dependency errors

**Action Items**:
- [ ] Run `./analyze-codebase.sh [REPO_DIR]` for each repository
- [ ] Review `codebase-analysis.md` output
- [ ] Identify:
  - Frontend framework (React, Next.js, etc.)
  - Backend framework (Node.js, Python, etc.)
  - Database type and ORM
  - Authentication system
  - Build tools

## Phase 3: Dependency & Build Fixes

**Action Items**:
- [ ] Run `./check-build-errors.sh [REPO_DIR]` for each repository
- [ ] Review `build-errors-report.md`
- [ ] Fix dependency issues:
  - Update outdated packages
  - Resolve version conflicts
  - Fix peer dependency warnings
- [ ] Fix build errors:
  - TypeScript errors
  - Import/module resolution issues
  - Configuration problems

## Phase 4: Database Setup

**Action Items**:
- [ ] Identify database type from codebase analysis
- [ ] Set up local database instance
- [ ] Run migrations to create schema
- [ ] Seed initial data if needed
- [ ] Configure production database:
  - Vercel Postgres (if PostgreSQL)
  - Supabase (if using Supabase)
  - External database service

## Phase 5: Environment Configuration

**Action Items**:
- [ ] Document all required environment variables
- [ ] Create `.env.example` files
- [ ] Set up local `.env` files
- [ ] Configure Vercel environment variables:
  - Database connection strings
  - API keys
  - Authentication secrets
  - Service URLs

## Phase 6: Design System Integration

**Current Design System**: `@purity/design-system` (local package)

**Action Items**:
- [ ] Verify design system is built: `cd design-system && yarn rollup`
- [ ] Check if main app uses `@purity/design-system` or `@presto-labs-ai/design-system`
- [ ] Update package references if needed
- [ ] Verify component imports work
- [ ] Test theme integration (light/dark mode)

## Phase 7: Vercel Configuration

**Action Items**:
- [ ] Analyze project structure (monorepo vs separate repos)
- [ ] Create/update `vercel.json`:
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "framework": "nextjs",
    "env": {
      // Environment variables
    }
  }
  ```
- [ ] Configure build settings for each app
- [ ] Set up serverless functions if needed
- [ ] Configure routing and rewrites

## Phase 8: Testing

**Action Items**:
- [ ] Test locally:
  - Start development server
  - Verify all features work
  - Test authentication flow
  - Test CRUD operations
- [ ] Fix any runtime errors
- [ ] Test responsive design
- [ ] Verify database operations

## Phase 9: Deployment

**Action Items**:
- [ ] Create Vercel project(s)
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Deploy to preview
- [ ] Test preview deployment
- [ ] Deploy to production
- [ ] Set up custom domain (if needed)
- [ ] Configure SSL

## Phase 10: Post-Deployment

**Action Items**:
- [ ] Verify all features work in production
- [ ] Set up monitoring and error tracking
- [ ] Configure CI/CD pipeline
- [ ] Document deployment process
- [ ] Create runbook for future deployments

## Quick Start Commands

```bash
# 1. Clone repositories
./list-and-clone-repos.sh YOUR_GITHUB_TOKEN

# 2. Analyze codebase
./analyze-codebase.sh presto-frontend
./analyze-codebase.sh presto-backend

# 3. Check for errors
./check-build-errors.sh presto-frontend
./check-build-errors.sh presto-backend

# 4. Build design system
cd design-system && yarn rollup && cd ..

# 5. Install and test locally
cd presto-frontend && npm install && npm run dev
```

## Troubleshooting

### Repository Access Issues
- Verify GitHub token has `repo` scope
- Check token hasn't expired
- Ensure token has access to `presto-labs-ai` organization

### Build Errors
- Check Node.js version (should be v18+)
- Clear `node_modules` and reinstall
- Check for TypeScript version conflicts
- Verify all environment variables are set

### Database Issues
- Verify database is running locally
- Check connection strings
- Run migrations in correct order
- Verify database user permissions

### Deployment Issues
- Check Vercel build logs
- Verify environment variables are set in Vercel
- Check build command and output directory
- Verify framework detection

## Next Steps

1. **IMMEDIATE**: Provide GitHub token or repository names
2. Clone all repositories
3. Run analysis scripts
4. Begin fixing identified issues

