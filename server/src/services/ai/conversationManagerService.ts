import prisma from '../../lib/prisma';

export class ConversationManagerService {
    
    /**
     * Fetch recent chat history for a user
     */
    async getRecentHistory(userId: string, limit: number = 12) {
        return await prisma.chatMessage.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    }

    /**
     * Save a new chat pair (user message and AI response)
     */
    async saveInteraction(userId: string, userMessage: string, aiResponse: string) {
        return await prisma.chatMessage.createMany({
            data: [
                { userId, content: userMessage, role: 'user' },
                { userId, content: aiResponse, role: 'assistant' }
            ]
        });
    }

    /**
     * Clear or archive history if needed (Placeholder for future functionality)
     */
}

export const conversationManager = new ConversationManagerService();
