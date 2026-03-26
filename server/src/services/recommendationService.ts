import prisma from '../lib/prisma';
import { AssessmentType, Severity } from '../../prisma/generated/client';
import { isHighStressPeriod } from '../utils/time';

export interface Recommendation {
    id: string;
    type: 'circle' | 'challenge' | 'resource' | 'action';
    title: string;
    description: string;
    icon: string;
    link?: string;
    metadata?: any;
}

export class RecommendationService {
    static async getPersonalizedRecommendations(userId: string): Promise<Recommendation[]> {
        const recommendations: Recommendation[] = [];

        // 1. Fetch latest data
        const assessments = await prisma.assessment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        const latestMoods = await prisma.moodEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        });

        // 2. Assessment-Based Recommendations
        for (const assessment of assessments) {
            if (assessment.type === 'GAD7') {
                if (assessment.severity === 'MODERATE' || assessment.severity === 'MODERATELY_SEVERE' || assessment.severity === 'SEVERE') {
                    recommendations.push({
                        id: `gad7-circle-${assessment.id}`,
                        type: 'circle',
                        title: 'Anxiety Support Circle',
                        description: 'Connect with peers who understand what you are going through.',
                        icon: 'Users',
                        link: '/dashboard/community',
                        metadata: { category: 'ANXIETY' }
                    });
                    recommendations.push({
                        id: `gad7-resource-${assessment.id}`,
                        type: 'resource',
                        title: 'Mindfulness Hub',
                        description: 'Access guided sessions specifically for student anxiety.',
                        icon: 'Wind',
                        link: '/dashboard/resources?category=Mindfulness'
                    });
                }
            } else if (assessment.type === 'PHQ9') {
                if (assessment.severity === 'MODERATELY_SEVERE' || assessment.severity === 'SEVERE') {
                    recommendations.push({
                        id: `phq9-action-${assessment.id}`,
                        type: 'action',
                        title: 'Professional Support',
                        description: 'Your scores suggest you might benefit from professional guidance.',
                        icon: 'PhoneCall',
                        link: '/dashboard/crisis'
                    });
                }
            } else if (assessment.type === 'STRESS') {
                if (assessment.severity === 'HIGH' || assessment.severity === 'MODERATE') {
                    recommendations.push({
                        id: `stress-resource-${assessment.id}`,
                        type: 'resource',
                        title: 'Academic Toolkit',
                        description: 'Practical tools to regain control of your schedule and reduce academic overwhelm.',
                        icon: 'Clock',
                        link: '/dashboard/resources?category=Academic Stress'
                    });
                    recommendations.push({
                        id: `stress-circle-${assessment.id}`,
                        type: 'circle',
                        title: 'Academic Stress Circle',
                        description: 'Join a community sharing strategies for managing university pressure.',
                        icon: 'Users',
                        link: '/dashboard/community',
                        metadata: { category: 'ACADEMIC_STRESS' }
                    });
                }
            } else if (assessment.type === 'SLEEP') {
                if (assessment.severity === 'POOR' || assessment.severity === 'FAIR') {
                    recommendations.push({
                        id: `sleep-action-${assessment.id}`,
                        type: 'action',
                        title: 'Sleep Hygiene Routine',
                        description: 'Personalized steps to improve your restorative cycles tonight.',
                        icon: 'Moon',
                        link: '/dashboard/resources?category=Self-Help'
                    });
                }
            }
        }

        // 3. Mood-Based Recommendations
        if (latestMoods.length > 0) {
            const avgMood = latestMoods.reduce((acc, curr) => acc + curr.mood, 0) / latestMoods.length;
            const avgAnxiety = latestMoods.reduce((acc, curr) => acc + (curr.anxiety || 0), 0) / latestMoods.length;

            if (avgAnxiety > 3) {
                recommendations.push({
                    id: 'anxiety-breathing',
                    type: 'action',
                    title: 'Guided Breathing',
                    description: 'Take 2 minutes for a box-breathing exercise to lower your current anxiety.',
                    icon: 'Wind',
                    link: '/dashboard/activity',
                    metadata: { action: 'BREATHE' }
                });
            }
            
            if (avgMood < 3) {
                recommendations.push({
                    id: 'mood-challenge',
                    type: 'challenge',
                    title: 'Gratitude Journey',
                    description: 'Try noting 3 small wins today to shift your focus.',
                    icon: 'Star',
                    link: '/dashboard/challenges',
                    metadata: { challengeType: 'GRATITUDE' }
                });
            }
        }

        // 4. Academic Context
        if (isHighStressPeriod()) {
            recommendations.push({
                id: 'exam-circle',
                type: 'circle',
                title: 'Exam Season Support',
                description: 'Exam season is here. Share study tips and de-stress with others.',
                icon: 'Zap',
                link: '/dashboard/community',
                metadata: { category: 'ACADEMIC_STRESS' }
            });
        }

        // De-duplicate items by type/title to avoid clutter
        const uniqueRecs = Array.from(new Map(recommendations.map(item => [item.title, item])).values());

        return uniqueRecs.slice(0, 4); // Show top 4 most relevant
    }
}
