import { Router } from 'express';
import { chatWithOracle, getChatHistory } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';
import { rateLimiter } from '../middleware/rate-limit';

const router = Router();

router.post('/chat', authenticateToken, rateLimiter, chatWithOracle);
router.get('/history', authenticateToken, getChatHistory);


export default router;
