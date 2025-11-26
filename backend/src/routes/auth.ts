import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Protected routes
router.get('/me', authMiddleware, (req, res) => authController.getMe(req, res));
router.post('/logout', authMiddleware, (req, res) => authController.logout(req, res));
router.post('/change-password', authMiddleware, (req, res) => authController.updatePassword(req, res));

export default router;
