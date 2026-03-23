import { Router } from 'express';
import { 
    getCircles, 
    joinCircle, 
    getPosts, 
    createPost, 
    getStories, 
    createStory, 
    sendEncouragement, 
    requestMentor 
} from '../controllers/socialController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Circles
router.get('/circles', authenticateToken, getCircles);
router.post('/circles/:id/join', authenticateToken, joinCircle);
router.get('/circles/:id/posts', authenticateToken, getPosts);
router.post('/circles/:id/posts', authenticateToken, createPost);

// Stories
router.get('/stories', authenticateToken, getStories);
router.post('/stories', authenticateToken, createStory);

// Encouragement & Mentorship
router.post('/encourage', authenticateToken, sendEncouragement);
router.post('/mentor/request', authenticateToken, requestMentor);

export default router;
