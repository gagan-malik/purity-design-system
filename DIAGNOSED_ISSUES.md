# Diagnosed Issues - Presto Platform

## Critical Issues Found

### 1. Design System Package Authentication ❌
**Issue**: Frontend cannot install `@presto-labs-ai/design-system-new` (401 Unauthorized)
- **Location**: `web-app-frontend/package.json`
- **Error**: `Request failed "401 Unauthorized"` when trying to install from GitHub Packages
- **Root Cause**: Private GitHub package requires authentication token
- **Solution Options**:
  a) Build design system from `web-app-ui/design-system` and link locally
  b) Update `.npmrc` with valid GitHub token
  c) Use local design system package instead

### 2. Design System Not Built ❌
**Issue**: `web-app-ui/design-system` has no `dist/` directory
- **Location**: `web-app-ui/design-system/`
- **Impact**: Cannot use the design system package
- **Solution**: Run `yarn rollup` or `npm run rollup` to build

### 3. Package Name Mismatch ⚠️
**Issue**: Frontend uses `@presto-labs-ai/design-system-new` but `web-app-ui` has `@presto-labs-ai/design-system`
- **Location**: 
  - Frontend: `web-app-frontend/package.json` (line 13)
  - Design System: `web-app-ui/design-system/package.json` (line 2)
- **Impact**: Potential confusion, need to verify if they're the same
- **Solution**: Align package names or verify they're compatible

### 4. Missing Environment Files ⚠️
**Issue**: No `.env.example` files found in repositories
- **Location**: `web-app-frontend`, `web-app-server`
- **Impact**: Unclear what environment variables are needed
- **Solution**: Create `.env.example` files based on code analysis

### 5. Database Connection Required ⚠️
**Issue**: Backend requires MySQL database connection
- **Location**: `web-app-server/config/db.js`
- **Required Variables**:
  - `MYSQL_HOST`
  - `MYSQL_USER`
  - `MYSQL_PASSWORD`
  - `MYSQL_DATABASE`
- **Impact**: Backend won't start without database
- **Solution**: Set up MySQL database and configure connection

### 6. Multiple Backend Services ⚠️
**Issue**: Two separate backend services (Node.js + Django)
- **Services**: 
  - `web-app-server` (Node.js/Express) - Main API
  - `genai` (Django) - AI features
- **Impact**: Need to deploy and coordinate both services
- **Solution**: Configure both for Vercel or separate deployments

## Build Dependencies Status

### web-app-frontend
- ❌ Cannot install dependencies (design system auth issue)
- ⚠️ Uses Create React App (older, may need updates)
- ⚠️ Requires environment files (.env.dev, .env.prod, .env.stag)

### web-app-server
- ⚠️ Not tested yet (needs database)
- ⚠️ Requires MySQL connection
- ⚠️ Uses older Express patterns

### web-app-ui/design-system
- ❌ Not built (no dist/ directory)
- ⚠️ Needs to be built before frontend can use it

### genai (Django)
- ⚠️ Not tested yet
- ⚠️ Requires Python environment
- ⚠️ Has environment files (env_dev, env_prod, env_qa)

## Priority Fix Order

1. **HIGH**: Build design system from web-app-ui
2. **HIGH**: Fix design system package authentication/usage
3. **HIGH**: Set up MySQL database
4. **MEDIUM**: Create environment variable templates
5. **MEDIUM**: Test and fix backend connections
6. **MEDIUM**: Update dependencies if needed
7. **LOW**: Optimize build configurations

## Next Actions

1. Build `web-app-ui/design-system`
2. Link design system locally or fix authentication
3. Set up MySQL database
4. Create environment files
5. Test installations
6. Fix any remaining build errors

