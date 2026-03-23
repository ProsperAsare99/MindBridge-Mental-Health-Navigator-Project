import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
// AI imports removed to maintain "Advanced Analytics" identity

export const getUserAnalytics = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.user.userId;

        // 1. Mood Statistics
        const moodStats = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 30
        });

        const totalMoods = moodStats.length;
        const averageMood = totalMoods > 0 
            ? moodStats.reduce((acc, entry) => acc + entry.mood, 0) / totalMoods 
            : 0;


        // 3. Crisis Incidents
        const crisisCount = await prisma.moodEntry.count({
            where: { userId, crisisFlag: true }
        });

        // 4. Activity Over Time (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentActivity = await prisma.moodEntry.groupBy({
            by: ['createdAt'],
            where: {
                userId,
                createdAt: { gte: sevenDaysAgo }
            },
            _avg: { mood: true },
            _count: { id: true }
        });

        res.json({
            summary: {
                totalMoods,
                averageMood: Number(averageMood.toFixed(1)),
                crisisCount
            },
            moodHistory: moodStats.map(m => ({
                value: m.mood,
                date: m.createdAt
            })),
            isHighlyActive: totalMoods > 20
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ error: 'Failed to generate your insight map.' });
    }
};

export const getMoodInsight = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.userId) return res.status(401).json({ error: 'Not authenticated' });
        const { moodData } = req.body;

        if (!moodData || moodData.length < 3) {
            return res.json({ insight: "Complete more mood check-ins (at least 3) to unlock personalized therapeutic insights." });
        }

        const values = moodData.map((m: any) => m.mood);
        const average = values.reduce((acc: number, curr: number) => acc + curr, 0) / values.length;
        
        // Calculate Trend (Recent half vs Older half)
        const half = Math.floor(values.length / 2);
        const recentAvg = values.slice(0, half).reduce((a: number, b: number) => a + b, 0) / (half || 1);
        const olderAvg = values.slice(half).reduce((a: number, b: number) => a + b, 0) / (values.length - half || 1);
        
        let insight = "";
        
        if (recentAvg > olderAvg + 0.5) {
            insight = "Your mood is showing a strong positive upward trend. Keep focusing on the activities and routines that are supporting this growth!";
        } else if (recentAvg < olderAvg - 0.5) {
            insight = "We've noticed a slight downward trend in your recent check-ins. Consider reaching out to a peer or using one of your learned coping strategies today.";
        } else if (average >= 4.0) {
            insight = "You've been maintaining a consistently high mood! This stability is a great foundation for tackling complex academic or personal goals.";
        } else if (average >= 2.5) {
            insight = "Your mood has been steady and balanced recently. Reflect on the small habits that are helping you stay grounded in the middle ground.";
        } else {
            insight = "Things have been challenging lately, but your consistency in tracking is a powerful first step. Small, intentional self-care acts can make a big difference today.";
        }

        res.json({ insight });

    } catch (error) {
        console.error('Mood Insight Calculation Error:', error);
        res.status(500).json({ error: 'Failed to process clinical insights.' });
    }
};
