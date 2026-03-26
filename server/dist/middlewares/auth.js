"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_for_development';
if (JWT_SECRET === 'your_fallback_secret_for_development') {
    console.warn('[AUTH WARNING] JWT_SECRET is using the fallback value. This will cause authentication failures if NextAuth is using a different secret.');
}
else {
    console.log('[AUTH INFO] JWT_SECRET loaded from environment.');
}
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Find user to verify they still exist
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.userId }
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }
        // Update last active
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: { lastActive: new Date() }
        });
        req.user = user;
        req.userId = user.id;
        next();
    }
    catch (error) {
        // Detailed error logging for stability monitoring
        console.error(`[AUTH FAILURE] ${new Date().toISOString()}:`, {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack?.split('\n')[1] // Just the first line of trace
        });
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired.' });
        }
        // Handle Database connection issues specifically (Prisma codes or Node network codes)
        const isDbError = error.code?.startsWith('P') ||
            error.code === 'ENOTFOUND' ||
            error.code === 'EAI_AGAIN' ||
            error.message?.includes('ECONNRESET') ||
            error.message?.includes('ENOTFOUND');
        if (isDbError) {
            return res.status(503).json({
                error: 'Service temporarily unavailable due to database connectivity. Please try again in a moment.',
                details: 'DB_CONNECTION_FAILURE'
            });
        }
        res.status(500).json({
            error: `Authentication process failed: ${error.message}`,
            details: error.message
        });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map