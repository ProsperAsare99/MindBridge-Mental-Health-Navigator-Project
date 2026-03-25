import { Request, Response, NextFunction } from 'express';

/**
 * Rate limiting has been completely disabled as requested.
 * All limiters are now transparent pass-through middlewares.
 */

const noopMiddleware = (req: Request, res: Response, next: NextFunction) => next();

export const generalLimiter = noopMiddleware;
export const aiChatLimiter = noopMiddleware;
export const loginLimiter = noopMiddleware;
export const rateLimiter = noopMiddleware;

export default rateLimiter;
