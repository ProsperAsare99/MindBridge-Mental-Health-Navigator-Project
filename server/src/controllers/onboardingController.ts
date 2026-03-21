import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

export const updateOnboarding = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const userId = req.user.userId;
        const data = req.body;

        // Clean up the data to ensure we only update allowed fields
        const allowedFields = [
            'displayName',
            'university',
            'academicLevel',
            'program',
            'language',
            'notificationPreference',
            'preferredCheckInTime',
            'concerns',
            'supportLevel',
            'riskLevel',
            'copingStyles',
            'faithLevel',
            'approachPreference',
            'goals',
            'stressors',
            'trackingPreferences',
            'baseline',
            'onboardingStep',
            'onboardingCompleted'
        ];

        const updateData: any = {};
        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                // Special handling for academicLevel to ensure it's an integer
                if (field === 'academicLevel') {
                    updateData[field] = parseInt(data[field]) || 100;
                } else {
                    updateData[field] = data[field];
                }
            }
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        res.json({
            message: 'Onboarding data updated successfully',
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                onboardingStep: user.onboardingStep,
                onboardingCompleted: user.onboardingCompleted
            }
        });

    } catch (error) {
        console.error('Onboarding Update Error:', error);
        res.status(500).json({ error: 'Failed to update onboarding data' });
    }
};

export const getOnboardingStatus = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                onboardingStep: true,
                onboardingCompleted: true,
                displayName: true
            }

        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get Onboarding Status Error:', error);
        res.status(500).json({ error: 'Failed to fetch onboarding status' });
    }
};
