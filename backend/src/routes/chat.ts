import { Router } from 'express';
import { chatController } from '../controllers/chatController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All chat routes require authentication
router.use(authMiddleware);

router.post('/conversations', (req, res) => chatController.createConversation(req, res));
router.get('/conversations', (req, res) => chatController.getConversations(req, res));
router.get('/conversations/:conversationId', (req, res) => chatController.getConversation(req, res));
router.post('/conversations/:conversationId/messages', (req, res) => chatController.addMessage(req, res));

export default router;
