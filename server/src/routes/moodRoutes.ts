import { Router } from 'express';
import { createMood, getUserMoods, getMoodStats, getProactiveNudges } from '../controllers/moodController';
import { authenticateToken } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/', authenticateToken, upload.fields([
    { name: 'moodPhoto', maxCount: 1 },
    { name: 'moodAudio', maxCount: 1 }
]), createMood);
router.get('/', authenticateToken, getUserMoods);
router.get('/stats', authenticateToken, getMoodStats);
router.get('/nudges', authenticateToken, getProactiveNudges);

export default router;

