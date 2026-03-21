import prisma from '../../lib/prisma';
import { PromptContext } from './promptBuilderService';
import { getAICoreContext } from '../../lib/personalization-utils';

export class ContextEngineService {
    
    /**
     * Build comprehensive context for a specific user
     */
    async buildContext(userId: string, liveData?: any): Promise<PromptContext> {
        // 1. Fetch user profile
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
                name: true,
                nickname: true,
                yearOfStudy: true,
                fieldOfStudy: true,
                preferredLanguage: true,
                reasonsForJoining: true,
                spiritualityImportance: true,
                preferredApproach: true,
                selfHarmRisk: true,
                academicStressors: true,
                institution: true,
                copingStyles: true,
                goals: true,
                hasSupportSystem: true,
                wellbeingBaseline: true,
                trackingMetrics: true,
                checkInTime: true,
                notificationPreference: true,
            }
        });

        if (!user) throw new Error('User not found');

        const personalization = getAICoreContext(user);

        // 2. Fetch recent mood entries
        const recentMoods = await prisma.mood.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 14
        });

        // 3. Analyze mood trends
        let moodTrend: 'improving' | 'declining' | 'stable' | 'unknown' = 'unknown';
        if (recentMoods.length >= 2) {
            const mostRecent = recentMoods[0].value;
            const oldest = recentMoods[recentMoods.length - 1].value;
            moodTrend = mostRecent > oldest ? 'improving' : mostRecent < oldest ? 'declining' : 'stable';
        }

        const avgMood = recentMoods.length > 0 
            ? parseFloat((recentMoods.reduce((acc, m) => acc + m.value, 0) / recentMoods.length).toFixed(1))
            : 3;

        // 4. Extract stressors
        const stressors = user.academicStressors as any || {};

        // 5. Build final context
        return {
            user: {
                displayName: personalization.displayName,
                academicLevel: parseInt(personalization.academicLevel.replace('Level ', '')) || 100,
                program: personalization.program,
                university: personalization.institution || 'KNUST',
                daysActive: 30, // Mocked for now - could be calculated from createdAt
                isNewUser: false,
                examHeavyProgram: personalization.program.includes('Engineering') || personalization.program.includes('Medicine'),
                isGraduating: personalization.academicLevel.includes('400'),
                language: personalization.language,
                supportLevel: user.hasSupportSystem || 'Standard',
                needsSupport: user.hasSupportSystem === 'I feel mostly alone',
                copingStyles: user.copingStyles || [],
                prefersFaith: personalization.faithLevel !== 'Not important',
                faithLevel: personalization.faithLevel.toLowerCase().replace(' ', '_'),
                approachPreference: personalization.approach.toLowerCase(),
                culturalContext: {
                    region: 'Ashanti', // Default to Ashanti for Ghana-centric context if not specified
                    commonLanguages: ['English', 'Twi']
                },
                emergencyContacts: [] // Could be expanded in future schema
            },
            temporal: {
                currentTime: new Date(),
                recentMoods: {
                    average: avgMood,
                    trend: moodTrend,
                    volatility: 1.5, // Mocked
                    lowestPoint: recentMoods.length > 0 ? Math.min(...recentMoods.map(m => m.value)) : 1,
                    highestPoint: recentMoods.length > 0 ? Math.max(...recentMoods.map(m => m.value)) : 5
                },
                academicCalendar: {
                    isExamPeriod: stressors.exams >= 4,
                    isBeginningOfSemester: false,
                    isEndOfSemester: stressors.exams >= 3,
                    isThesisPeriod: personalization.academicLevel.includes('400')
                }
            },
            behavioral: {
                patterns: {
                    triggers: [] // Could be extracted from mood notes in future
                },
                engagementLevel: 'MEDIUM'
            },
            clinical: {
                riskAssessment: {
                    level: user.selfHarmRisk === 'High' ? 'HIGH' : user.selfHarmRisk === 'Extreme' ? 'CRITICAL' : 'LOW',
                    score: user.selfHarmRisk === 'High' ? 15 : 5,
                    interventionNeeded: user.selfHarmRisk === 'High' || user.selfHarmRisk === 'Extreme',
                    recommendations: ['Speak to a counselor', 'Call emergency hotline'],
                    factors: [] // Logic could be added here
                },
                concernTrends: {
                    'Academic Stress': { isPrimary: true, mentionFrequency: 5, assessmentTrend: 'Decreased' }
                }
            }
        };
    }
}

export const contextEngine = new ContextEngineService();
