# Presto Platform - Codebase Analysis

## Repository Structure

### Main Application Repositories

1. **web-app-frontend** - React Frontend Application
   - Framework: Create React App (React 18.2.0)
   - Build Tool: react-scripts 5.0.1
   - Design System: `@presto-labs-ai/design-system-new` (v0.0.86)
   - State Management: Redux + Redux Saga
   - Routing: React Router DOM 6.22.3
   - Key Features:
     - Authentication (Auth0)
     - Workspaces/Spaces (Notion-like)
     - Dashboards
     - Tasks/Issues
     - AI Assistant
     - Billing/Payments (Stripe)

2. **web-app-server** - Node.js Backend API
   - Framework: Express.js 4.18.2
   - Database: MySQL (mysql2)
   - ORM: Sequelize 6.32.1
   - Additional: Redis, Puppeteer, Swagger
   - Port: 4000 (default)

3. **web-app-ui** - Design System Package
   - Package Name: `@presto-labs-ai/design-system`
   - Version: 0.0.565
   - Build Tool: Rollup
   - Framework: React + TypeScript
   - Note: Frontend uses `@presto-labs-ai/design-system-new` but this repo has `@presto-labs-ai/design-system`

4. **genai** - Django/Python AI Backend
   - Framework: Django
   - Database: SQLite (dev) / PostgreSQL (prod)
   - Features:
     - AI Assistant (Presto Assistant)
     - Vector DB (Chroma DB)
     - Workspaces
     - Templates
     - Payments
     - Notifications

5. **crons** - Python Cron Jobs
   - Purpose: Scheduled tasks
   - Features:
     - Daily/hourly analytics
     - Web scraping (OSHA)
     - Vector generation
     - Notifications

6. **whisper** - Audio Transcription Service
   - Purpose: Convert audio to text
   - Uses: OpenAI Whisper (likely)

7. **web-app** - Monorepo (contains frontend + server)
   - Contains both web-app-frontend and web-app-server

## Tech Stack Summary

### Frontend
- React 18.2.0
- Create React App
- Redux + Redux Saga
- Tailwind CSS
- BlockNote (rich text editor)
- Firebase (storage)
- Stripe (payments)

### Backend
- Node.js/Express (main API)
- Django/Python (AI features)
- MySQL (main database)
- Redis (caching)
- Sequelize (ORM)

### Infrastructure
- Vercel (target deployment)
- AWS/GCP (likely for storage/services)

## Database Schema (MySQL)

Tables created automatically:
- user
- reset_token
- site
- board
- lane
- issue
- ticket
- comment
- time_log
- reaction
- multimedia
- access
- activity_log
- dashboard
- dashboard_share
- dashboard_access
- dashboard_card
- notifications
- acc_man_hours

## Environment Variables Needed

### Frontend (.env.dev, .env.prod, .env.stag)
- API endpoints
- Auth0 configuration
- Firebase configuration
- Stripe keys
- Environment-specific settings

### Backend
- MYSQL_HOST
- MYSQL_USER
- MYSQL_PASSWORD
- MYSQL_DATABASE
- PORT
- JWT_SECRET
- Redis configuration
- CORS origins

### GenAI (Django)
- Database configuration
- AI service keys
- Vector DB configuration
- Email service

## Key Issues to Address

1. **Design System Mismatch**
   - Frontend uses: `@presto-labs-ai/design-system-new`
   - web-app-ui has: `@presto-labs-ai/design-system`
   - Need to verify if they're the same or need alignment

2. **Build Configuration**
   - Frontend uses Create React App (older)
   - May need to check for outdated dependencies
   - Build scripts use env-cmd for environment files

3. **Database Setup**
   - MySQL required
   - Schema auto-created on connection
   - Need to set up local and production databases

4. **Multiple Backends**
   - Node.js server (main API)
   - Django server (AI features)
   - Need to coordinate both for deployment

## Next Steps

1. Check for build errors in each repository
2. Fix dependency issues
3. Set up MySQL database
4. Configure environment variables
5. Integrate design system properly
6. Configure Vercel deployment

