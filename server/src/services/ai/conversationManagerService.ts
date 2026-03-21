import prisma from '../../lib/prisma';
import { MessageRole, ConversationStatus } from '../../generated/client';


export class ConversationManagerService {
    
    /**
     * Fetch recent chat history for a user from their active conversation
     */
    async getRecentHistory(userId: string, limit: number = 20) {
        // Find the most recent active conversation
        const conversation = await prisma.conversation.findFirst({
            where: { userId, status: ConversationStatus.ACTIVE },
            orderBy: { lastMessageAt: 'desc' },
            include: {
                messages: {
                    orderBy: { timestamp: 'asc' },
                    take: limit
                }
            }
        });

        return conversation?.messages || [];
    }

    /**
     * Save a new chat pair (user message and AI response)
     */
    async saveInteraction(userId: string, userMessage: string, aiResponse: string, metadata: any = {}) {
        // 1. Find or create an active conversation
        let conversation = await prisma.conversation.findFirst({
            where: { userId, status: ConversationStatus.ACTIVE },
            orderBy: { lastMessageAt: 'desc' }
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    userId,
                    status: ConversationStatus.ACTIVE,
                    metadata: { initialContext: 'System generated' }
                }
            });
        }

        // 2. Create the messages
        await prisma.message.createMany({
            data: [
                { conversationId: conversation.id, content: userMessage, role: MessageRole.USER },
                { conversationId: conversation.id, content: aiResponse, role: MessageRole.ASSISTANT, metadata }
            ]
        });

        // 3. Update conversation lastMessageAt and counts
        await prisma.conversation.update({
            where: { id: conversation.id },
            data: { lastMessageAt: new Date() }
        });

        await prisma.user.update({
            where: { id: userId },
            data: { 
                conversationsCount: { increment: 1 },
                lastActive: new Date()
            }
        });
        
        // 4. Log AI Interaction separately for diagnostics
        await prisma.aIInteraction.create({
            data: {
                userId,
                userMessage,
                aiResponse,
                model: metadata.model,
                tokensUsed: metadata.tokensUsed,
                crisisDetected: metadata.isCrisis || false,
                responseTime: metadata.responseTime,
                emotionalIntensity: metadata.emotionalIntensity
            }
        });
    }

    /**
     * End a conversation session
     */
    async endConversation(conversationId: string, summary?: string) {
        return await prisma.conversation.update({
            where: { id: conversationId },
            data: { 
                status: ConversationStatus.ENDED,
                endedAt: new Date(),
                summary
            }
        });
    }

    /**
     * Get conversation statistics for a user
     */
    async getConversationStats(userId: string, period: 'daily' | 'weekly' | 'monthly' = 'weekly') {
        const startDate = new Date();
        if (period === 'daily') startDate.setHours(0, 0, 0, 0);
        else if (period === 'weekly') startDate.setDate(startDate.getDate() - 7);
        else if (period === 'monthly') startDate.setMonth(startDate.getMonth() - 1);

        const conversations = await prisma.conversation.findMany({
            where: { userId, lastMessageAt: { gte: startDate } },
            include: { messages: true }
        });

        const totalMessages = conversations.reduce((sum, c) => sum + c.messages.length, 0);
        const crisisCount = conversations.reduce((sum, c) => 
            sum + c.messages.filter(m => (m.metadata as any)?.isCrisis).length, 0
        );

        return {
            period,
            totalConversations: conversations.length,
            totalMessages,
            avgMessages: conversations.length > 0 ? totalMessages / conversations.length : 0,
            crisisCount
        };
    }

    /**
     * Get deep insights for a specific conversation
     */
    async getConversationInsights(conversationId: string) {
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { messages: true }
        });

        if (!conversation) return null;

        return {
            emotionalJourney: this.analyzeEmotionalJourney(conversation.messages),
            crisisPoints: this.identifyCrisisPoints(conversation.messages),
            topics: this.extractTopics(conversation.messages),
            strategies: this.extractCopingStrategies(conversation.messages)
        };
    }

    private analyzeEmotionalJourney(messages: any[]) {
        const points = messages
            .filter(m => m.role === MessageRole.USER && (m.metadata as any)?.emotionalIntensity !== undefined)
            .map(m => ({ timestamp: m.timestamp, intensity: (m.metadata as any).emotionalIntensity }));

        if (points.length === 0) return { trend: 'STABLE', points: [] };

        const start = points.slice(0, 3).reduce((s, p) => s + p.intensity, 0) / Math.min(3, points.length);
        const end = points.slice(-3).reduce((s, p) => s + p.intensity, 0) / Math.min(3, points.length);

        return {
            trend: end < start ? 'IMPROVING' : end > start ? 'WORSENING' : 'STABLE',
            points
        };
    }

    private identifyCrisisPoints(messages: any[]) {
        return messages
            .filter(m => (m.metadata as any)?.isCrisis)
            .map(m => ({ timestamp: m.timestamp, content: m.content.substring(0, 100) }));
    }

    private extractTopics(messages: any[]) {
        const keywords: Record<string, string[]> = {
            ACADEMIC: ['exam', 'study', 'assignment', 'grade', 'lecturer'],
            SOCIAL: ['friend', 'relationship', 'lonely', 'party'],
            FINANCIAL: ['money', 'fee', 'broke', 'allowance'],
            HEALTH: ['sleep', 'tired', 'sick', 'pain']
        };

        const counts: Record<string, number> = {};
        messages.filter(m => m.role === MessageRole.USER).forEach(m => {
            const content = m.content.toLowerCase();
            Object.entries(keywords).forEach(([topic, words]) => {
                if (words.some(w => content.includes(w))) {
                    counts[topic] = (counts[topic] || 0) + 1;
                }
            });
        });

        return Object.entries(counts).map(([topic, count]) => ({ topic, count }));
    }

    private extractCopingStrategies(messages: any[]) {
        const keywords: Record<string, string[]> = {
            BREATHING: ['breathe', 'breathing', 'inhale'],
            JOURNALING: ['write', 'journal', 'express'],
            PROFESSIONAL: ['counselor', 'therapist', 'help'],
            MINDFULNESS: ['present', 'aware', 'meditate']
        };

        const counts: Record<string, number> = {};
        messages.filter(m => m.role === MessageRole.ASSISTANT).forEach(m => {
            const content = m.content.toLowerCase();
            Object.entries(keywords).forEach(([strategy, words]) => {
                if (words.some(w => content.includes(w))) {
                    counts[strategy] = (counts[strategy] || 0) + 1;
                }
            });
        });

        return Object.entries(counts).map(([strategy, count]) => ({ strategy, count }));
    }

    async archiveOldConversations(daysOld: number = 30) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - daysOld);

        const result = await prisma.conversation.updateMany({
            where: { lastMessageAt: { lt: cutoff }, status: ConversationStatus.ACTIVE },
            data: { status: ConversationStatus.ARCHIVED }
        });

        return result.count;
    }
}

export const conversationManager = new ConversationManagerService();

