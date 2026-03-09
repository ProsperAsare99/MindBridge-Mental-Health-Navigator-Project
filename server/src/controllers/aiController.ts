import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const chatWithOracle = async (req: AuthRequest, res: Response) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

        // 1. Fetch user context (recent moods)
        const recentMoods = await prisma.mood.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        const moodContext = recentMoods.length > 0
            ? `Recent moods (1-5 scale): ${recentMoods.map(m => `${m.value}${m.note ? ` (${m.note})` : ''}`).join(', ')}.`
            : 'No recent mood data available.';

        // 2. Prepare the prompt for Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are "The Oracle", a highly empathetic, wise, and supportive AI mental health assistant for students. 
        Your goal is to provide a safe space for students to express their feelings, offer gentle guidance, and help them understand their emotional trends.
        
        User Context:
        - ${moodContext}
        
        Guidelines:
        - Be warm, empathetic, and non-judgmental.
        - Use simple but profound language.
        - If the user seems to be in immediate danger or severe distress, gently remind them of the "Crisis Support" resources available in their dashboard.
        - Encourage self-reflection.
        - Keep responses concise but meaningful.
        
        User says: "${message}"`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // 3. Save messages to database
        await prisma.chatMessage.createMany({
            data: [
                { userId: req.user.userId, content: message, role: 'user' },
                { userId: req.user.userId, content: responseText, role: 'assistant' }
            ]
        });

        res.json({ response: responseText });
    } catch (error) {
        console.error('Oracle Chat Error:', error);
        res.status(500).json({ error: 'The Oracle is resting. Please try again later.' });
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
        res.status(500).json({ error: 'Failed to fetch your wisdom path.' });
    }
};
