import { Router } from 'express';
import { createMood, getUserMoods, getMoodStats, getProactiveNudges } from '../controllers/moodController';
import { authenticateToken } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/', authenticateToken, upload.fields([
    { name: 'moodPhoto', maxCount: 1 },
    { name: 'moodAudio', maxCount: 1 }
]), createMood);
router.get('/', authenticateToken, getUserMoods);
router.get('/stats', authenticateToken, getMoodStats);
router.get('/nudges', authenticateToken, getProactiveNudges);

export default router;

