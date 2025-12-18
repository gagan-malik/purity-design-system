# Environment Variables Template

This document lists common environment variables needed for the Presto platform. Update based on actual codebase analysis.

## Database Configuration

```bash
# PostgreSQL
DATABASE_URL=postgresql://presto_user:password@localhost:5432/presto_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=presto_db
DB_USER=presto_user
DB_PASSWORD=your_password

# MySQL
DATABASE_URL=mysql://presto_user:password@localhost:3306/presto_db

# MongoDB
MONGODB_URI=mongodb://localhost:27017/presto_db

# Supabase
DATABASE_URL=postgresql://user:password@db.xxx.supabase.co:5432/postgres
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

## Authentication

```bash
# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## API Configuration

```bash
API_URL=http://localhost:3000/api
API_KEY=your_api_key_here
NODE_ENV=development
PORT=3000
```

## File Storage

```bash
# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=presto-uploads

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Email Service

```bash
# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@presto.com

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## Third-Party Services

```bash
# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Error Tracking
SENTRY_DSN=your_sentry_dsn

# Feature Flags
FLAGS_SECRET=your_flags_secret
```

## Vercel Specific

```bash
# Vercel automatically provides:
# - VERCEL
# - VERCEL_ENV
# - VERCEL_URL

# Add these for production:
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Usage

1. Copy this template to `.env.example` in each repository
2. Create `.env.local` for local development
3. Add all variables to Vercel project settings
4. Never commit `.env` files to git

## Security Notes

- Use strong, random secrets for production
- Rotate secrets regularly
- Use Vercel's environment variable encryption
- Never expose secrets in client-side code
- Use `NEXT_PUBLIC_` prefix only for safe-to-expose variables

