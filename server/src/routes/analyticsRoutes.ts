import { Router } from 'express';
import { getUserAnalytics, getMoodInsight, getActivityFeed } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getUserAnalytics);
router.get('/activity-feed', authenticateToken, getActivityFeed);
router.post('/mood-insight', authenticateToken, getMoodInsight);

export default router;
