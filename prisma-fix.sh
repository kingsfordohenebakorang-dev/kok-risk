#!/bin/bash
set -e

echo "🔧 Starting Prisma Repair..."

# 1. Clean old generated files to prevent caching issues
echo "🧹 Cleaning Prisma cache..."
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client

# 2. Re-install to ensure correct binaries are downloaded for current OS
echo "⬇️  Re-installing Prisma..."
npm install prisma @prisma/client

# 3. Generate Client
echo "⚡ Generating Prisma Client..."
npx prisma generate

# 4. Verify Connection (optional, if credentials are set)
if [ -n "$DATABASE_URL" ]; then
    echo "🔍 Verifying Database Connection..."
    # npx prisma db pull --print # Dry run to check connection
    echo "   (Skipping active connection check to avoid side-effects, but client is ready)"
fi

echo "✅ Prisma Fixed & Ready!"
echo "👉 Try running: npm run build"
