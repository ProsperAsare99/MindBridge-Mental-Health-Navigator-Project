import { Request, Response, NextFunction } from 'express';

interface RateLimitConfig {
    windowMs: number;
    max: number;
}

const config: RateLimitConfig = {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
};

// In-memory store for rate limiting (can be replaced with Redis later as per architecture)
const ipRequestStore: Record<string, { count: number; resetTime: number }> = {};

/**
 * Basic rate limiting middleware
 */
export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    const now = Date.now();

    if (!ipRequestStore[ip] || now > ipRequestStore[ip].resetTime) {
        ipRequestStore[ip] = {
            count: 1,
            resetTime: now + config.windowMs
        };
        return next();
    }

    ipRequestStore[ip].count++;

    if (ipRequestStore[ip].count > config.max) {
        return res.status(429).json({
            error: 'Too many requests',
            message: 'You have exceeded the request limit. Please try again later.',
            retryAfter: Math.ceil((ipRequestStore[ip].resetTime - now) / 1000)
        });
    }

    // Add headers for transparency
    res.setHeader('X-RateLimit-Limit', config.max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, config.max - ipRequestStore[ip].count));
    res.setHeader('X-RateLimit-Reset', new Date(ipRequestStore[ip].resetTime).toISOString());

    next();
};
