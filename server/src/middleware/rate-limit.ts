import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { AuthRequest } from './auth';

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
});

// General API rate limiter
export const generalLimiter = rateLimit({
    store: new RedisStore({
        // @ts-ignore
        sendCommand: (...args: string[]) => redis.call(...args),
        prefix: 'rl:general:',
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests', message: 'Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// AI Chat rate limiter (per user)
export const aiChatLimiter = rateLimit({
    store: new RedisStore({
        // @ts-ignore
        sendCommand: (...args: string[]) => redis.call(...args),
        prefix: 'rl:ai:',
    }),
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    message: { error: 'Too many AI requests', message: 'Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: any) => {
        return (req as AuthRequest).userId || req.ip;
    }
});

// Login rate limiter
export const loginLimiter = rateLimit({
    store: new RedisStore({
        // @ts-ignore
        sendCommand: (...args: string[]) => redis.call(...args),
        prefix: 'rl:login:',
    }),
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many login attempts', message: 'Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Compatibility export
export const rateLimiter = generalLimiter;
