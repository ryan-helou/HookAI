import { Router, raw } from 'express';
import { stripeController } from '../controllers/stripeController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Webhook endpoint (must be before body parser)
router.post('/webhook', raw({ type: 'application/json' }), (req, res) =>
  stripeController.handleWebhook(req, res)
);

// Protected routes
router.use(authMiddleware);

router.post('/checkout', (req, res) => stripeController.createCheckoutSession(req, res));

export default router;
