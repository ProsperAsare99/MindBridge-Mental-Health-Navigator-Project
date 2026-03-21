import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { mindBridgeMaster } from '../services/ai/mindbridgeMasterService';


export const chatWithOracle = async (req: AuthRequest, res: Response) => {
    const { message, context: liveData } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const result = await mindBridgeMaster.processUserMessage(req.user.userId, message, liveData);

        console.log(`[Oracle 2.0] User: ${req.user.userId} | Model: ${result.model} | Crisis: ${result.isCrisis}`);

        res.json({ 
            response: result.response,
            model: result.model,
            isCrisis: result.isCrisis
        });
    } catch (error) {
        console.error('Oracle Chat Error:', error);
        res.status(500).json({ 
            error: 'The Oracle is currently in deep meditation. Please reach out again in a moment.',
            details: error instanceof Error ? error.message : String(error)
        });
    }
};


export const getChatHistory = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const history = await prisma.chatMessage.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'asc' },
            take: 50
        });

        res.json(history);
    } catch (error) {
        console.error('Fetch Chat History Error:', error);
        res.status(500).json({ error: 'Failed to fetch your wisdom path.', details: error instanceof Error ? error.message : String(error) });
    }
};

