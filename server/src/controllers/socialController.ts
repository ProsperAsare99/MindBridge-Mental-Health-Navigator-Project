import { Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { Concern } from '../generated/client_new';

// ============================================
// SUPPORT CIRCLES
// ============================================

export const getCircles = async (req: AuthRequest, res: Response) => {
    try {
        const circles = await prisma.supportCircle.findMany({
            include: {
                _count: {
                    select: { members: true, posts: true }
                }
            }
        });
        res.json(circles);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch circles', details: error.message });
    }
};

export const joinCircle = async (req: AuthRequest, res: Response) => {
    const circleId = req.params.id as string;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const membership = await prisma.circleMembership.upsert({
            where: {
                userId_circleId: { userId, circleId }
            },
            create: { userId, circleId },
            update: {} // No change if already joined
        });
        res.json(membership);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to join circle', details: error.message });
    }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
    const circleId = req.params.id as string;
    try {
        const posts = await prisma.circlePost.findMany({
            where: { 
                circleId: circleId as string,
                isApproved: true // Only show moderated content
            },
            include: {
                author: {
                    select: { displayName: true, image: true }
                },
                _count: {
                    select: { encouragements: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Hide author info if anonymous
        const sanitizedPosts = posts.map((post: any) => ({
            ...post,
            author: post.isAnonymous ? { displayName: 'Anonymous Peer', image: null } : post.author
        }));

        res.json(sanitizedPosts);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }
};

export const createPost = async (req: AuthRequest, res: Response) => {
    const circleId = req.params.id as string;
    const { content, isAnonymous } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const post = await prisma.circlePost.create({
            data: {
                circleId,
                authorId: userId,
                content,
                isAnonymous: isAnonymous ?? true,
                isApproved: true // Auto-approve for now (can be changed to false for full moderation)
            }
        });
        res.status(201).json(post);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to create post', details: error.message });
    }
};

// ============================================
// ANONYMOUS STORIES
// ============================================

export const getStories = async (req: AuthRequest, res: Response) => {
    try {
        const stories = await prisma.supportStory.findMany({
            where: { isApproved: true },
            include: {
                author: {
                    select: { displayName: true, image: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(stories);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch stories', details: error.message });
    }
};

export const createStory = async (req: AuthRequest, res: Response) => {
    const { title, content, category } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const story = await prisma.supportStory.create({
            data: {
                authorId: userId,
                title,
                content,
                category: category as Concern,
                isApproved: true // Auto-approve for now
            }
        });
        res.status(201).json(story);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to share story', details: error.message });
    }
};

// ============================================
// ENCOURAGEMENT & MENTORSHIP
// ============================================

export const sendEncouragement = async (req: AuthRequest, res: Response) => {
    const { postId, content, receiverId } = req.body;
    const senderId = req.userId;

    if (!senderId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const encouragement = await prisma.supportEncouragement.create({
            data: {
                senderId,
                postId,
                receiverId,
                content
            }
        });
        res.status(201).json(encouragement);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to send encouragement', details: error.message });
    }
};

export const requestMentor = async (req: AuthRequest, res: Response) => {
    const { mentorId, topic } = req.body;
    const menteeId = req.userId;

    if (!menteeId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const match = await prisma.mentorMatch.create({
            data: {
                menteeId,
                mentorId,
                topic: topic as Concern,
                status: 'PENDING'
            }
        });
        res.status(201).json(match);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to request mentor', details: error.message });
    }
};

// Seed initial circles if none exist
export const initializeCircles = async () => {
    const count = await prisma.supportCircle.count();
    if (count === 0) {
        const initialCircles = [
            { name: 'Academic Stress Circle', description: 'Share strategies for managing exams, deadlines, and study pressure.', category: Concern.ACADEMIC_STRESS },
            { name: 'Anxiety Support', description: 'A safe space to talk about coping with anxiety and finding calm.', category: Concern.ANXIETY },
            { name: 'Growth & Resilience', description: 'Focus on building strength and overcoming personal challenges.', category: Concern.OTHER },
            { name: 'Loneliness & Connection', description: 'Find community and share experiences of navigated university life.', category: Concern.LONELINESS },
        ];

        for (const circle of initialCircles) {
            await prisma.supportCircle.create({ data: circle });
        }
        console.log('[SOCIAL] Initial circles seeded successfully.');
    }
};
