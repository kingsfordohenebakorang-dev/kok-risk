import Redis from 'ioredis';
import { config } from '../config/env';
import { logger } from '../utils/logger';

let redis: Redis | null = null;

try {
    if (config.REDIS_URL) {
        redis = new Redis(config.REDIS_URL);
        redis.on('error', (err) => {
            logger.error('Redis connection error:', err);
        });
    } else {
        logger.warn('Redis URL not provided. Running in memory/fallback mode (NOT FOR PRODUCTION).');
    }
} catch (error) {
    logger.error('Failed to initialize Redis:', error);
}

export const featureStore = {
    async get(key: string): Promise<string | null> {
        if (!redis) return null;
        try {
            return await redis.get(key);
        } catch (err) {
            logger.error('FeatureStore Get Error:', err);
            return null;
        }
    },

    async set(key: string, value: string, ttlSeconds: number = 3600): Promise<void> {
        if (!redis) return;
        try {
            await redis.setex(key, ttlSeconds, value);
        } catch (err) {
            logger.error('FeatureStore Set Error:', err);
        }
    }
};
