import { Router } from 'express';
import { getNearbyResources, getResourceById } from '../controllers/resourceController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/nearby', authenticateToken, getNearbyResources);
router.get('/:id', authenticateToken, getResourceById);

export default router;
