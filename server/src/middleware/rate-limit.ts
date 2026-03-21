import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { AuthRequest } from './auth';

// Resilient Redis connection
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    lazyConnect: true,
    maxRetriesPerRequest: 3,
});

redis.on('error', (err) => {
    console.warn('[Redis] Connection failed, falling back to memory store.');
});

const getStore = (prefix: string) => {
    // If redis is not connected, use memory store (default)
    if (process.env.NODE_ENV === 'test' || !process.env.REDIS_HOST) {
        return undefined;
    }
    return new RedisStore({
        // @ts-ignore
        sendCommand: (...args: string[]) => redis.call(...args),
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
    validate: { ip: false } // Disable IPv6 validation for dev if needed
});

// AI Chat rate limiter
export const aiChatLimiter = rateLimit({
    store: getStore('ai'),
    windowMs: 60 * 1000,
    max: 10,
    message: { error: 'Too many AI requests', message: 'Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: any) => {
        // Safe key generation for IPv6 + Auth
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
    max: 5,
    message: { error: 'Too many login attempts', message: 'Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
    validate: { ip: false }
});

export const rateLimiter = generalLimiter;
