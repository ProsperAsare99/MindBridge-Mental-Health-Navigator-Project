"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const gamification_1 = require("../utils/gamification");
class GamificationService {
    static async rewardXP(userId, activityType) {
        const xpAmount = gamification_1.XP_REWARDS[activityType];
        const user = await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                wellnessXP: { increment: xpAmount }
            }
        });
        // Check for level up
        const newLevel = (0, gamification_1.calculateLevel)(user.wellnessXP);
        if (newLevel > user.wellnessLevel) {
            await prisma_1.default.user.update({
                where: { id: userId },
                data: { wellnessLevel: newLevel }
            });
            // TODO: Trigger level-up notification/event
        }
        return { xpAdded: xpAmount, currentXP: user.wellnessXP, currentLevel: newLevel };
    }
    static async checkAchievements(userId) {
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            include: {
                moodEntries: { orderBy: { createdAt: 'desc' } },
                achievements: true
            }
        });
        if (!user)
            return [];
        const currentStreak = (0, gamification_1.calculateStreak)(user.moodEntries);
        const unlockedTypes = user.achievements.map(a => a.type);
        const newAchievements = [];
        for (const ach of gamification_1.ACHIEVEMENTS) {
            if (!unlockedTypes.includes(ach.type)) {
                let unlocked = false;
                if (ach.type.startsWith('milestone_') && currentStreak >= ach.threshold) {
                    unlocked = true;
                }
                else if (ach.type === 'self_awareness_champion' && user.moodEntries.length >= ach.threshold) {
                    unlocked = true;
                }
                // Add more logic for social/mindfulness achievements here
                if (unlocked) {
                    const newAch = await prisma_1.default.achievement.create({
                        data: {
                            userId,
                            type: ach.type,
                            title: ach.title,
                            description: ach.description,
                            icon: ach.icon || 'Star'
                        }
                    });
                    newAchievements.push(newAch);
                    // Reward bonus XP for achievement
                    await this.rewardXP(userId, 'STREAK_MILESTONE'); // Use a generic bonus key or similar
                }
            }
        }
        // Update longest streak if needed
        if (currentStreak > user.longestStreak) {
            await prisma_1.default.user.update({
                where: { id: userId },
                data: { longestStreak: currentStreak }
            });
        }
        return newAchievements;
    }
    static async updateMoodGarden(userId) {
        try {
            const user = await prisma_1.default.user.findUnique({
                where: { id: userId },
                include: {
                    moodEntries: { orderBy: { createdAt: 'desc' }, take: 10 },
                    moodGarden: true
                }
            });
            if (!user)
                return;
            let garden = user.moodGarden;
            if (!garden) {
                garden = await prisma_1.default.moodGarden.create({
                    data: {
                        userId,
                        growthLevel: 1,
                        plantType: 'oak',
                        healthScore: 50.0
                    }
                });
            }
            const currentStreak = (0, gamification_1.calculateStreak)(user.moodEntries);
            const avgMood = user.moodEntries.length > 0
                ? user.moodEntries.reduce((acc, curr) => acc + curr.mood, 0) / user.moodEntries.length
                : 3;
            // Growth Level: Based on streak
            // L1: 0-7 days, L2: 8-14 days, L3: 15-21 days, L4: 22-28 days, L5: 29+ days
            const newGrowthLevel = Math.min(5, Math.floor(currentStreak / 7) + 1);
            // Health Score: Based on recent mood average (1-5 scale to 0-100)
            const newHealthScore = Math.min(100, Math.max(10, (avgMood / 5) * 100));
            await prisma_1.default.moodGarden.update({
                where: { userId },
                data: {
                    growthLevel: newGrowthLevel,
                    healthScore: newHealthScore
                }
            });
        }
        catch (error) {
            console.error('[GAMIFICATION] Garden update failed:', error);
        }
    }
}
exports.GamificationService = GamificationService;
//# sourceMappingURL=gamificationService.js.map