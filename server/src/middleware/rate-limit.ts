import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { AuthRequest } from './auth';

let redis: Redis | null = null;
let redisConnected = false;

// Attempt Redis connection if configured
if (process.env.REDIS_HOST && process.env.NODE_ENV !== 'test') {
    try {
        redis = new Redis({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD,
            lazyConnect: true,
            maxRetriesPerRequest: null,
            enableOfflineQueue: false,
            connectTimeout: 500,
        });

        redis.on('connect', () => {
            console.log('[Redis] Connection established.');
            redisConnected = true;
        });

        redis.on('error', (err) => {
            // Silently fail to memory store - don't log errors unless it's production
            if (process.env.NODE_ENV === 'production') {
                console.warn('[Redis] Connection failed:', err.message);
            }
            redisConnected = false;
        });
        
        // Initial attempt
        redis.connect().catch(() => {
            // Error handled by 'error' event
        });
    } catch (e) {
        console.warn('[Redis] Initialization error:', e);
    }
}

// Higher-order store logic: returns undefined (MemoryStore) if Redis is not ready
const getStore = (prefix: string) => {
    // During module initialization, we might not be "ready" yet, but rate-limit-redis 
    // needs an object that doesn't throw if its first command fails.
    // However, the cleanest way is just to return 'undefined' to trigger memory store 
    // used by express-rate-limit.
    
    if (!redisConnected || !redis) return undefined;
    
    return new RedisStore({
        // @ts-ignore
        sendCommand: (...args: string[]) => {
            if (!redisConnected) throw new Error('Redis not connected');
            // @ts-ignore
            return redis!.call(...args);
        },
        prefix: `rl:${prefix}:`,
    });
};

// General API rate limiter
export const generalLimiter = rateLimit({
    store: getStore('general'),
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { error: 'Too many requests', message: 'Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { ip: false }
});

// AI Chat rate limiter
export const aiChatLimiter = rateLimit({
    store: getStore('ai'),
    windowMs: 60 * 1000,
    max: 20,
    message: { error: 'Too many AI requests', message: 'Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: any) => {
        const userId = (req as AuthRequest).userId;
        if (userId) return userId;
        return req.ip; 
    },
    validate: { ip: false }
});

// Login rate limiter
export const loginLimiter = rateLimit({
    store: getStore('login'),
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many login attempts', message: 'Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { ip: false }
});

export const rateLimiter = generalLimiter;
