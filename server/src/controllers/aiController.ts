import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { mindBridgeMaster } from '../services/ai/mindbridgeMasterService';
import { ConversationStatus } from '../generated/client';

export const chatWithOracle = async (req: AuthRequest, res: Response) => {
    // ... same ...
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        const conversation = await prisma.conversation.findFirst({
            where: { 
                userId: req.user.userId,
                status: ConversationStatus.ACTIVE 
            },
            orderBy: { lastMessageAt: 'desc' },
            include: {
                messages: {
                    orderBy: { timestamp: 'asc' },
                    take: 50
                }
            }
        });

        // Map to expected format if necessary, or just return messages
        const messages = conversation?.messages.map(m => ({
            id: m.id,
            content: m.content,
            role: m.role.toLowerCase(), // Frontend expects lowercase 'user'/'assistant'
            createdAt: m.timestamp
        })) || [];

        res.json(messages);
    } catch (error) {
        console.error('Fetch Chat History Error:', error);
        res.status(500).json({ error: 'Failed to fetch your wisdom path.', details: error instanceof Error ? error.message : String(error) });
    }
};


