import { Router } from 'express';
import { register, login, getMe, updateProfile, changePassword, verifyEmail } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.get('/verify', verifyEmail);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.post('/profile', authenticateToken, updateProfile);
router.post('/change-password', authenticateToken, changePassword);

export default router;
