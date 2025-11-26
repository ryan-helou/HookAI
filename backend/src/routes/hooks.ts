import { Router } from 'express';
import { hooksController } from '../controllers/hooksController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All hooks routes require authentication
router.use(authMiddleware);

router.post('/generate', (req, res) => hooksController.generateHooks(req, res));
router.post('/regenerate', (req, res) => hooksController.regenerateHooks(req, res));
router.get('/:conversationId', (req, res) => hooksController.getHooks(req, res));

export default router;
