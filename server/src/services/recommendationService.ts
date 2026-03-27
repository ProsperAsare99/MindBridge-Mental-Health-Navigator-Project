import prisma from '../lib/prisma';
import { AssessmentType, Severity } from '../../prisma/generated/client';
import { isHighStressPeriod } from '../utils/time';

export interface Feedback {
    tier: 'ENCOURAGEMENT' | 'COPING' | 'PROFESSIONAL';
    message: string;
    description: string;
}

export interface RecommendationResult {
    recommendations: Recommendation[];
    feedback: Feedback;
}

export class RecommendationService {
    static async getPersonalizedRecommendations(userId: string): Promise<RecommendationResult> {
        const recommendations: Recommendation[] = [];
        let feedback: Feedback = {
            tier: 'ENCOURAGEMENT',
            message: "You're doing great!",
            description: "Keep up with your daily check-ins to maintain your wellness momentum."
        };

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

        // 2. Assessment-Based Recommendations & Feedback
        if (assessments.length > 0) {
            const latest = assessments[0];
            
            // Set Base Feedback based on latest assessment severity
            if (latest.severity === 'SEVERE' || latest.severity === 'MODERATELY_SEVERE' || latest.severity === 'HIGH') {
                feedback = {
                    tier: 'PROFESSIONAL',
                    message: "Support is Available",
                    description: "Your recent scores suggest you're going through a tough time. We've highlighted some professional resources for you."
                };
            } else if (latest.severity === 'MODERATE' || latest.severity === 'FAIR') {
                feedback = {
                    tier: 'COPING',
                    message: "Proactive Care",
                    description: "You're experiencing some challenges. Trying out a few coping strategies might help you regain your balance."
                };
            }

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
                            description: 'Speak with a licensed counselor who can provide personalized guidance.',
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
                            description: 'Practical tools to reduce academic overwhelm.',
                            icon: 'Clock',
                            link: '/dashboard/resources?category=Academic Stress'
                        });
                    }
                } else if (assessment.type === 'SLEEP') {
                    if (assessment.severity === 'POOR' || assessment.severity === 'FAIR') {
                        recommendations.push({
                            id: `sleep-action-${assessment.id}`,
                            type: 'action',
                            title: 'Sleep Hygiene Routine',
                            description: 'Steps to improve your restorative cycles tonight.',
                            icon: 'Moon',
                            link: '/dashboard/resources?category=Self-Help'
                        });
                    }
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
                    description: 'Take 2 minutes for a box-breathing exercise to lower anxiety.',
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
                    description: 'Note 3 small wins today to shift your focus.',
                    icon: 'Star',
                    link: '/dashboard/challenges',
                    metadata: { challengeType: 'GRATITUDE' }
                });

                if (feedback.tier === 'ENCOURAGEMENT') {
                    feedback = {
                        tier: 'COPING',
                        message: "Gentle Reminder",
                        description: "You've been feeling a bit lower lately. Taking a moment for self-care could make a big difference."
                    };
                }
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

        // De-duplicate items by title
        const uniqueRecs = Array.from(new Map(recommendations.map(item => [item.title, item])).values());

        return {
            recommendations: uniqueRecs.slice(0, 4),
            feedback
        };
    }
}
