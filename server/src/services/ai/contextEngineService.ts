import prisma from '../../lib/prisma';
import { PromptContext } from './promptBuilderService';
import { getAICoreContext } from '../../lib/personalization-utils';
import { University, Language, SupportLevel, RiskLevel, FaithLevel, ApproachPreference } from '../../generated/client';

export class ContextEngineService {
    
    /**
     * Build comprehensive context for a specific user
     */
    async buildContext(userId: string, liveData?: any): Promise<PromptContext> {
        // 1. Fetch user profile
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
                displayName: true,
                university: true,
                academicLevel: true,
                program: true,
                language: true,
                notificationPreference: true,
                preferredCheckInTime: true,
                concerns: true,
                supportLevel: true,
                riskLevel: true,
                copingStyles: true,
                faithLevel: true,
                approachPreference: true,
                goals: true,
                stressors: true,
                trackingPreferences: true,
                baselineMood: true,
                baseline: true,
                emergencyContacts: true,
                createdAt: true,
            }
        });

        if (!user) throw new Error('User not found');

        const personalization = getAICoreContext(user);

        // 2. Fetch recent mood entries
        const recentMoods = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 14
        });

        // 3. Analyze mood trends
        let moodTrend: 'improving' | 'declining' | 'stable' | 'unknown' = 'unknown';
        if (recentMoods.length >= 2) {
            const mostRecent = recentMoods[0].mood;
            const oldest = recentMoods[recentMoods.length - 1].mood;
            moodTrend = mostRecent > oldest ? 'improving' : mostRecent < oldest ? 'declining' : 'stable';
        }

        const avgMood = recentMoods.length > 0 
            ? parseFloat((recentMoods.reduce((acc, m) => acc + m.mood, 0) / recentMoods.length).toFixed(1))
            : 3;

        // 4. Extract stressors
        const stressors = user.stressors as any || {};

        // 5. Build final context
        return {
            user: {
                displayName: personalization.displayName,
                academicLevel: user.academicLevel || 100,
                program: user.program || 'N/A',
                university: this.mapUniversity(user.university),
                daysActive: Math.ceil((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
                isNewUser: (new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24) < 7,
                examHeavyProgram: (user.program || '').includes('Engineering') || (user.program || '').includes('Medicine'),
                isGraduating: user.academicLevel === 400,
                language: this.mapLanguage(user.language),
                supportLevel: this.mapSupportLevel(user.supportLevel),
                needsSupport: user.supportLevel === SupportLevel.ALONE,
                copingStyles: user.copingStyles.map(s => s.toLowerCase()),
                prefersFaith: user.faithLevel !== FaithLevel.NOT_IMPORTANT,
                faithLevel: this.mapFaithLevel(user.faithLevel),
                approachPreference: user.approachPreference.toLowerCase(),
                culturalContext: {
                    region: 'Ashanti',
                    commonLanguages: ['English', 'Twi']
                },
                emergencyContacts: (user.emergencyContacts as any[]) || []
            },
            temporal: {
                currentTime: new Date(),
                recentMoods: {
                    average: avgMood,
                    trend: moodTrend,
                    volatility: 1.5,
                    lowestPoint: recentMoods.length > 0 ? Math.min(...recentMoods.map(m => m.mood)) : 1,
                    highestPoint: recentMoods.length > 0 ? Math.max(...recentMoods.map(m => m.mood)) : 5
                },
                academicCalendar: {
                    isExamPeriod: stressors.exams >= 4,
                    isBeginningOfSemester: false,
                    isEndOfSemester: stressors.exams >= 3,
                    isThesisPeriod: user.academicLevel === 400
                }
            },
            behavioral: {
                patterns: {
                    triggers: [] 
                },
                engagementLevel: 'MEDIUM'
            },
            clinical: {
                riskAssessment: {
                    level: (user.riskLevel || 'LOW') as any,
                    score: user.riskLevel === 'HIGH' ? 15 : user.riskLevel === 'CRITICAL' ? 25 : 5,
                    interventionNeeded: user.riskLevel === 'HIGH' || user.riskLevel === 'CRITICAL',
                    recommendations: ['Speak to a counselor', 'Call emergency hotline'],
                    factors: []
                },
                concernTrends: {
                    'Academic Stress': { isPrimary: true, mentionFrequency: 5, assessmentTrend: 'Decreased' }
                }
            }
        };

    }

    private mapUniversity(uni: University | null): string {
        const mapping: Record<string, string> = {
            [University.KNUST]: 'KNUST',
            [University.UNIVERSITY_OF_GHANA]: 'University of Ghana',
            [University.UNIVERSITY_OF_CAPE_COAST]: 'University of Cape Coast',
            [University.ASHESI_UNIVERSITY]: 'Ashesi University',
            [University.GIMPA]: 'GIMPA',
            [University.OTHER]: 'Other University'
        };
        return (uni && mapping[uni]) || 'KNUST';
    }

    private mapLanguage(lang: Language): string {
        return lang.charAt(0) + lang.slice(1).toLowerCase();
    }

    private mapSupportLevel(level: SupportLevel): string {
        return level.toLowerCase();
    }

    private mapFaithLevel(level: FaithLevel): string {
        return level.toLowerCase();
    }
}

export const contextEngine = new ContextEngineService();

