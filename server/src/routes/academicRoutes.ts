import { Router } from 'express';
import { getAcademicEvents, createAcademicEvent } from '../controllers/academicController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAcademicEvents);
router.post('/', authenticateToken, createAcademicEvent);

export default router;
