import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hookGenerationService } from '../services/hookGenerationService';
import { hookRankingService } from '../services/hookRankingService';
import { usageTrackingService } from '../services/usageTrackingService';
import { hookGenerationSchema, hookRegenerationSchema } from '../utils/validators';

const prisma = new PrismaClient();

export class HooksController {
  async generateHooks(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Validate input
      const validation = hookGenerationSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.error.errors,
        });
      }

      const { conversationId, message, tone } = validation.data;

      // Check usage limit
      const isLimitExceeded = await usageTrackingService.isLimitExceeded(req.user.id);
      if (isLimitExceeded) {
        return res.status(429).json({ error: 'Monthly hook limit exceeded. Please upgrade your plan.' });
      }

      // Get or create conversation
      let conversation;
      if (conversationId) {
        conversation = await prisma.conversation.findUnique({
          where: { id: conversationId },
        });

        if (!conversation || conversation.userId !== req.user.id) {
          return res.status(403).json({ error: 'Conversation not found or forbidden' });
        }
      } else {
        conversation = await prisma.conversation.create({
          data: {
            userId: req.user.id,
            topic: message.substring(0, 100),
          },
        });
      }

      // Add user message
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: 'user',
          content: message,
        },
      });

      // Generate hooks with AI
      const generatedHooks = await hookGenerationService.generateHooks(message, tone);

      // Score hooks based on learned patterns
      const hooksToScore = generatedHooks.map(h => h.hook);
      const scoredHooks = await hookRankingService.scoreHooks(hooksToScore, tone);

      // Sort by score descending and take top 5
      const topHooks = scoredHooks
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((h, index) => ({
          text: h.hook,
          score: h.score,
          rank: index + 1,
          tone,
        }));

      // Save hooks to database
      const savedHooks = await Promise.all(
        topHooks.map(hook =>
          prisma.hook.create({
            data: {
              conversationId: conversation.id,
              userId: req.user!.id,
              text: hook.text,
              tone: hook.tone,
              score: hook.score,
              rank: hook.rank,
            },
          })
        )
      );

      // Increment usage
      await usageTrackingService.incrementUsage(req.user.id, 1);

      // Get updated usage
      const usage = await usageTrackingService.getUsage(req.user.id);

      // Add assistant response message
      const assistantMessage = await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: 'assistant',
          content: `Generated ${topHooks.length} hooks with scores.`,
        },
      });

      res.status(200).json({
        conversationId: conversation.id,
        hooks: savedHooks,
        usage,
        message: assistantMessage,
      });
    } catch (error) {
      console.error('Hook generation error:', error);
      const message = error instanceof Error ? error.message : 'Failed to generate hooks';
      res.status(500).json({ error: message });
    }
  }

  async regenerateHooks(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const validation = hookRegenerationSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: 'Validation failed',
          details: validation.error.errors,
        });
      }

      const { conversationId } = validation.data;

      // Check usage limit
      const isLimitExceeded = await usageTrackingService.isLimitExceeded(req.user.id);
      if (isLimitExceeded) {
        return res.status(429).json({ error: 'Monthly hook limit exceeded. Please upgrade your plan.' });
      }

      // Get conversation
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            where: { role: 'user' },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      });

      if (!conversation || conversation.userId !== req.user.id) {
        return res.status(403).json({ error: 'Conversation not found or forbidden' });
      }

      if (conversation.messages.length === 0) {
        return res.status(400).json({ error: 'No previous message to regenerate from' });
      }

      // Get the last tone used (from last hooks)
      const lastHooks = await prisma.hook.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'desc' },
        take: 1,
      });

      const tone = (lastHooks[0]?.tone || 'funny') as any;
      const message = conversation.messages[0].content;

      // Generate new hooks
      const generatedHooks = await hookGenerationService.generateHooks(message, tone);
      const hooksToScore = generatedHooks.map(h => h.hook);
      const scoredHooks = await hookRankingService.scoreHooks(hooksToScore, tone);

      const topHooks = scoredHooks
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((h, index) => ({
          text: h.hook,
          score: h.score,
          rank: index + 1,
          tone,
        }));

      // Save new hooks
      const savedHooks = await Promise.all(
        topHooks.map(hook =>
          prisma.hook.create({
            data: {
              conversationId: conversation.id,
              userId: req.user!.id,
              text: hook.text,
              tone: hook.tone,
              score: hook.score,
              rank: hook.rank,
            },
          })
        )
      );

      // Increment usage
      await usageTrackingService.incrementUsage(req.user.id, 1);

      const usage = await usageTrackingService.getUsage(req.user.id);

      res.status(200).json({
        hooks: savedHooks,
        usage,
      });
    } catch (error) {
      console.error('Hook regeneration error:', error);
      const message = error instanceof Error ? error.message : 'Failed to regenerate hooks';
      res.status(500).json({ error: message });
    }
  }

  async getHooks(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { conversationId } = req.params;

      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation || conversation.userId !== req.user.id) {
        return res.status(403).json({ error: 'Conversation not found or forbidden' });
      }

      const hooks = await prisma.hook.findMany({
        where: { conversationId },
        orderBy: { rank: 'asc' },
      });

      res.status(200).json(hooks);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get hooks';
      res.status(400).json({ error: message });
    }
  }
}

export const hooksController = new HooksController();
