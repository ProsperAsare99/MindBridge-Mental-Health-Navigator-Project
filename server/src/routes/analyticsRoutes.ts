import { Router } from 'express';
import { getUserAnalytics, getMoodInsight } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getUserAnalytics);
router.post('/mood-insight', authenticateToken, getMoodInsight);

export default router;
