import { PrismaClient } from '@prisma/client';
import { PLANS } from '../types';

const prisma = new PrismaClient();

export class UsageTrackingService {
  /**
   * Check if user can generate hooks
   */
  async canGenerateHooks(userId: string): Promise<boolean> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return subscription.currentUsage < subscription.monthlyLimit;
  }

  /**
   * Get current usage info for user
   */
  async getUsage(userId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const remaining = subscription.monthlyLimit - subscription.currentUsage;
    const percentage = (subscription.currentUsage / subscription.monthlyLimit) * 100;

    return {
      current: subscription.currentUsage,
      limit: subscription.monthlyLimit,
      remaining: Math.max(0, remaining),
      percentage: Math.min(100, percentage),
      planId: subscription.planId,
      renewalDate: subscription.renewalDate,
    };
  }

  /**
   * Increment usage after hook generation
   */
  async incrementUsage(userId: string, count: number = 1): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Update subscription usage
    await prisma.subscription.update({
      where: { userId },
      data: {
        currentUsage: {
          increment: count,
        },
      },
    });

    // Record usage in log
    await prisma.usageRecord.create({
      data: {
        userId,
        action: 'hook_generated',
        tokensUsed: count,
      },
    });
  }

  /**
   * Check if monthly limit is reached and reset if renewal date passed
   */
  async checkAndResetMonthlyLimit(userId: string): Promise<void> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return;
    }

    // Check if renewal date has passed
    const now = new Date();
    if (subscription.renewalDate < now) {
      // Reset usage and update renewal date
      await prisma.subscription.update({
        where: { userId },
        data: {
          currentUsage: 0,
          renewalDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      });
    }
  }

  /**
   * Get usage percentage (0-100)
   */
  async getUsagePercentage(userId: string): Promise<number> {
    const usage = await this.getUsage(userId);
    return usage.percentage;
  }

  /**
   * Check if usage is at warning threshold (80%)
   */
  async isAtWarningThreshold(userId: string): Promise<boolean> {
    const percentage = await this.getUsagePercentage(userId);
    return percentage >= 80;
  }

  /**
   * Check if limit exceeded
   */
  async isLimitExceeded(userId: string): Promise<boolean> {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return subscription.currentUsage >= subscription.monthlyLimit;
  }

  /**
   * Upgrade user subscription plan
   */
  async upgradePlan(userId: string, planId: 'basic' | 'pro'): Promise<void> {
    const plan = PLANS[planId];

    if (!plan) {
      throw new Error(`Invalid plan: ${planId}`);
    }

    const now = new Date();
    const renewalDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    await prisma.subscription.update({
      where: { userId },
      data: {
        planId,
        monthlyLimit: plan.monthlyLimit,
        currentUsage: 0,
        renewalDate,
        status: 'active',
      },
    });
  }

  /**
   * Cancel subscription (downgrade to free)
   */
  async cancelSubscription(userId: string): Promise<void> {
    const freeLimit = PLANS.free.monthlyLimit;

    await prisma.subscription.update({
      where: { userId },
      data: {
        planId: 'free',
        monthlyLimit: freeLimit,
        currentUsage: 0,
        status: 'canceled',
      },
    });
  }
}

export const usageTrackingService = new UsageTrackingService();
