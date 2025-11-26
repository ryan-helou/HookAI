import { Request, Response } from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { PLANS } from '../types';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20',
});

export class StripeController {
  async createCheckoutSession(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { planId } = req.body;

      if (!planId || !['basic', 'pro'].includes(planId)) {
        return res.status(400).json({ error: 'Invalid plan ID' });
      }

      const plan = PLANS[planId];

      // Get or create Stripe customer
      let user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let stripeCustomerId = user.stripeCustomerId;

      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            userId: user.id,
          },
        });

        stripeCustomerId = customer.id;

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId },
        });
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `HookAI ${plan.name} Plan`,
                description: `${plan.monthlyLimit} hooks per month`,
              },
              unit_amount: plan.price * 100, // Convert to cents
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/chat?success=true`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/chat?canceled=true`,
        metadata: {
          userId: user.id,
          planId,
        },
      });

      res.status(200).json({
        sessionId: session.id,
        checkoutUrl: session.url,
      });
    } catch (error) {
      console.error('Stripe checkout error:', error);
      const message = error instanceof Error ? error.message : 'Failed to create checkout session';
      res.status(500).json({ error: message });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers['stripe-signature'] as string;

      if (!signature) {
        return res.status(400).json({ error: 'No signature' });
      }

      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      // Save event
      await prisma.stripeEvent.create({
        data: {
          stripeEventId: event.id,
          type: event.type,
          data: event.data,
        },
      });

      // Handle different event types
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object as any);
          break;

        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as any);
          break;

        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as any);
          break;
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ error: 'Webhook error' });
    }
  }

  private async handleCheckoutCompleted(session: any) {
    const { userId, planId } = session.metadata;

    if (!userId || !planId) return;

    const plan = PLANS[planId];

    // Update subscription
    await prisma.subscription.update({
      where: { userId },
      data: {
        planId,
        stripeSubId: session.subscription,
        status: 'active',
        monthlyLimit: plan.monthlyLimit,
        currentUsage: 0,
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  private async handleSubscriptionUpdated(subscription: any) {
    const userId = subscription.metadata?.userId;

    if (!userId) return;

    const status = subscription.status === 'active' ? 'active' : 'inactive';

    await prisma.subscription.update({
      where: { userId },
      data: {
        status,
      },
    });
  }

  private async handleSubscriptionDeleted(subscription: any) {
    const userId = subscription.metadata?.userId;

    if (!userId) return;

    // Downgrade to free plan
    await prisma.subscription.update({
      where: { userId },
      data: {
        planId: 'free',
        status: 'canceled',
        monthlyLimit: 3,
        currentUsage: 0,
      },
    });
  }
}

export const stripeController = new StripeController();
