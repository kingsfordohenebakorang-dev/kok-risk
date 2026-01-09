#!/bin/bash
set -e

echo "🦄 Starting Unicorn-Grade Fixer..."

# 1. Install Dependencies (ensures all libraries including 'ncp' are present)
echo "📦 Installing dependencies..."
npm install

# 2. Generate Prisma Client (ensures database types are ready)
echo "⚡ Generating Prisma Client..."
npx prisma generate

# 3. Build Project (compiles TypeScript to dist/)
echo "🏗️  Building Project..."
npm run build

echo "✅ Fix Complete! Your project is ready to run."
echo "👉 To start locally: npm run start"
echo "👉 To deploy: git push"
