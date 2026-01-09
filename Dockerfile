# Stage 1: Build
FROM node:18-slim AS builder

WORKDIR /app

# Install OpenSSL (Standard Debian libs for Prisma)
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

COPY src ./src
COPY public ./public

# Build TypeScript
RUN npm run build
# Generate Prisma Client (Debian compatible)
RUN npx prisma generate

# Stage 2: Production Run
FROM node:18-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install OpenSSL in runner too
RUN apt-get update -y && apt-get install -y openssl ca-certificates

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Create a non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Fix permissions
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 10000

CMD ["npm", "start"]
