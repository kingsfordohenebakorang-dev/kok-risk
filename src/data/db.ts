import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

// Prevent multiple instances in development due to hot reloading
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['error', 'warn'], // Log only errors and warnings to keep console clean
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Connection handling
prisma.$connect()
    .then(() => logger.info('✅ Connected to PostgreSQL Audit Vault'))
    .catch((e) => logger.error('❌ Failed to connect to DB', e));
