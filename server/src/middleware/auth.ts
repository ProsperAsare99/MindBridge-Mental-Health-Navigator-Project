import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';

export interface AuthRequest extends Request {
    user?: any;
    userId?: string;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
        
        // Find user to verify they still exist
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        // Update last active
        await prisma.user.update({
            where: { id: user.id },
            data: { lastActive: new Date() }
        });

        req.user = user;
        req.userId = user.id;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token.' });
    }
};
