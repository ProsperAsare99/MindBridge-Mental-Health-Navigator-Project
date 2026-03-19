import { Router } from 'express';
import { createMood, getUserMoods, getMoodStats, getProactiveNudges } from '../controllers/moodController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, createMood);
router.get('/', authenticateToken, getUserMoods);
router.get('/stats', authenticateToken, getMoodStats);
router.get('/nudges', authenticateToken, getProactiveNudges);

export default router;

