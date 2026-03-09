import { Router } from 'express';
import { chatWithOracle, getChatHistory } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/chat', authenticateToken, chatWithOracle);
router.get('/history', authenticateToken, getChatHistory);

export default router;
