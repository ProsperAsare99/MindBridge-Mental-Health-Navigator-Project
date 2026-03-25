import { Router } from 'express';
import { getGamificationStats, getChallenges, joinChallenge } from '../controllers/gamificationController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/stats', authenticateToken, getGamificationStats);
router.get('/challenges', authenticateToken, getChallenges);
router.post('/challenges/:challengeId/join', authenticateToken, joinChallenge);

export default router;
