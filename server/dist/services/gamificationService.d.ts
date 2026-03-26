import { XP_REWARDS } from '../utils/gamification';
export declare class GamificationService {
    static rewardXP(userId: string, activityType: keyof typeof XP_REWARDS): Promise<{
        xpAdded: number;
        currentXP: any;
        currentLevel: number;
    }>;
    static checkAchievements(userId: string): Promise<any[]>;
    static updateMoodGarden(userId: string): Promise<void>;
}
