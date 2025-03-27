#!/bin/bash

# Function to check if last command was successful
check_status() {
    if [ $? -eq 0 ]; then
        echo "✅ $1 successful"
    else
        echo "❌ $1 failed"
        exit 1
    fi
}

echo "🚀 Updating Scholar Fair..."

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main
check_status "Git pull"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
check_status "npm install"

# Build the application
echo "🔨 Building application..."
npm run build
check_status "npm build"

# Restart the application
echo "🔄 Restarting application..."
pm2 restart scholar-fair
check_status "pm2 restart"

echo "✨ Update complete!" 