"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeChallenges = exports.joinChallenge = exports.getChallenges = exports.getGamificationStats = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const gamification_1 = require("../utils/gamification");
const getGamificationStats = async (req, res) => {
    try {
        if (!req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;
        // 1. Get user data with XP and level
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            include: {
                moodEntries: { orderBy: { createdAt: 'desc' }, take: 100 },
                achievements: true,
                moodGarden: true
            }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        const currentStreak = (0, gamification_1.calculateStreak)(user.moodEntries);
        // 2. Garden Evolution (Rule-based)
        let garden = user.moodGarden;
        if (!garden) {
            garden = await prisma_1.default.moodGarden.create({
                data: {
                    userId,
                    growthLevel: 1,
                    plantType: 'OAK',
                    healthScore: 50.0
                }
            });
        }
        const avgMood = user.moodEntries.length > 0
            ? user.moodEntries.slice(0, 5).reduce((acc, curr) => acc + curr.mood, 0) / Math.min(user.moodEntries.length, 5)
            : 3;
        const newGrowthLevel = Math.min(5, Math.ceil(currentStreak / 7) + (avgMood >= 4 ? 1 : 0));
        if (newGrowthLevel !== garden.growthLevel) {
            garden = await prisma_1.default.moodGarden.update({
                where: { userId },
                data: { growthLevel: newGrowthLevel }
            });
        }
        res.json({
            streak: currentStreak,
            longestStreak: user.longestStreak,
            wellnessLevel: user.wellnessLevel,
            wellnessXP: user.wellnessXP,
            achievements: user.achievements,
            garden,
            totalCheckIns: user.moodEntries.length
        });
    }
    catch (error) {
        console.error('Gamification Stats Error:', error);
        res.status(500).json({ error: 'Failed to retrieve wellness milestones.' });
    }
};
exports.getGamificationStats = getGamificationStats;
const getChallenges = async (req, res) => {
    try {
        const challenges = await prisma_1.default.challenge.findMany({
            include: {
                participants: {
                    where: { userId: req.userId }
                }
            }
        });
        res.json(challenges);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch challenges.' });
    }
};
exports.getChallenges = getChallenges;
const joinChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const participation = await prisma_1.default.challengeParticipation.create({
            data: {
                userId: req.userId,
                challengeId: challengeId,
                startDate: new Date(),
                progress: 0
            }
        });
        res.status(201).json(participation);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to join challenge.' });
    }
};
exports.joinChallenge = joinChallenge;
const initializeChallenges = async () => {
    try {
        const count = await prisma_1.default.challenge.count();
        if (count === 0) {
            const initialChallenges = [
                {
                    title: 'Gratitude Journey',
                    description: 'Note 3 things you are thankful for every day to boost your mood and perspective.',
                    durationDays: 30,
                    type: 'GRATITUDE',
                    isCommunity: true
                },
                {
                    title: 'Mindfulness Month',
                    description: 'Complete a 5-minute breathing or meditation exercise daily to build focus and calm.',
                    durationDays: 30,
                    type: 'MINDFULNESS',
                    isCommunity: false
                },
                {
                    title: 'Active Resiliency',
                    description: 'Take a 15-minute walk outside every day to connect with nature and clear your mind.',
                    durationDays: 14,
                    type: 'EXERCISE',
                    isCommunity: true
                }
            ];
            for (const challenge of initialChallenges) {
                await prisma_1.default.challenge.create({ data: challenge });
            }
            console.log('[GAMIFICATION] Initial challenges seeded successfully.');
        }
    }
    catch (error) {
        console.error('[GAMIFICATION] Challenge seeding failed:', error.message);
    }
};
exports.initializeChallenges = initializeChallenges;
//# sourceMappingURL=gamificationController.js.map