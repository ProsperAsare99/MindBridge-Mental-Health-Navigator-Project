import { MoodEntry } from '@prisma/client';
export declare const XP_REWARDS: {
    MOOD_LOG: number;
    SOCIAL_ACTIVITY: number;
    ASSESSMENT_COMPLETE: number;
    STREAK_MILESTONE: number;
    CHALLENGE_JOIN: number;
    CHALLENGE_COMPLETE: number;
};
export declare const calculateLevel: (xp: number) => number;
export declare const getNextLevelXP: (level: number) => number;
export declare const calculateStreak: (moods: MoodEntry[]) => number;
export declare const ACHIEVEMENTS: {
    type: string;
    title: string;
    threshold: number;
    description: string;
    icon: string;
}[];
