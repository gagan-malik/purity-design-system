#!/bin/bash

# Database setup script for Presto platform
# Usage: ./setup-database.sh [database-type]

set -e

DB_TYPE="${1:-postgresql}"

echo "🗄️  Setting up $DB_TYPE database for Presto platform..."
echo ""

case $DB_TYPE in
  postgresql|postgres)
    echo "📦 Installing PostgreSQL..."
    if command -v brew &> /dev/null; then
      brew install postgresql@15 || echo "PostgreSQL may already be installed"
      brew services start postgresql@15 || echo "PostgreSQL service may already be running"
    else
      echo "⚠️  Homebrew not found. Please install PostgreSQL manually."
      echo "   Visit: https://www.postgresql.org/download/"
    fi
    
    echo ""
    echo "📝 Creating database and user..."
    echo "Run these commands:"
    echo "  createdb presto_db"
    echo "  createuser presto_user"
    echo "  psql presto_db -c \"ALTER USER presto_user WITH PASSWORD 'your_password';\""
    echo "  psql presto_db -c \"GRANT ALL PRIVILEGES ON DATABASE presto_db TO presto_user;\""
    ;;
    
  mysql)
    echo "📦 Installing MySQL..."
    if command -v brew &> /dev/null; then
      brew install mysql || echo "MySQL may already be installed"
      brew services start mysql || echo "MySQL service may already be running"
    else
      echo "⚠️  Homebrew not found. Please install MySQL manually."
      echo "   Visit: https://dev.mysql.com/downloads/"
    fi
    
    echo ""
    echo "📝 Creating database and user..."
    echo "Run these commands:"
    echo "  mysql -u root -p"
    echo "  CREATE DATABASE presto_db;"
    echo "  CREATE USER 'presto_user'@'localhost' IDENTIFIED BY 'your_password';"
    echo "  GRANT ALL PRIVILEGES ON presto_db.* TO 'presto_user'@'localhost';"
    echo "  FLUSH PRIVILEGES;"
    ;;
    
  mongodb|mongo)
    echo "📦 Installing MongoDB..."
    if command -v brew &> /dev/null; then
      brew tap mongodb/brew
      brew install mongodb-community || echo "MongoDB may already be installed"
      brew services start mongodb-community || echo "MongoDB service may already be running"
    else
      echo "⚠️  Homebrew not found. Please install MongoDB manually."
      echo "   Visit: https://www.mongodb.com/try/download/community"
    fi
    
    echo ""
    echo "📝 MongoDB setup complete!"
    echo "Connection string: mongodb://localhost:27017/presto_db"
    ;;
    
  supabase)
    echo "📦 Setting up Supabase..."
    echo ""
    echo "1. Create account at: https://supabase.com"
    echo "2. Create a new project"
    echo "3. Get your connection string from Project Settings > Database"
    echo "4. Add connection string to .env file"
    ;;
    
  *)
    echo "❌ Unknown database type: $DB_TYPE"
    echo "Supported types: postgresql, mysql, mongodb, supabase"
    exit 1
    ;;
esac

echo ""
echo "✅ Database setup instructions provided!"
echo ""
echo "Next steps:"
echo "1. Set up the database as shown above"
echo "2. Update .env file with connection string"
echo "3. Run migrations from the application codebase"

