import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChatController {
  async createConversation(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { topic, initialMessage } = req.body;

      if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
      }

      // Create conversation
      const conversation = await prisma.conversation.create({
        data: {
          userId: req.user.id,
          topic,
          messages: initialMessage
            ? {
                create: [
                  {
                    role: 'user',
                    content: initialMessage,
                  },
                ],
              }
            : undefined,
        },
        include: {
          messages: true,
        },
      });

      res.status(201).json(conversation);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create conversation';
      res.status(400).json({ error: message });
    }
  }

  async getConversations(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const conversations = await prisma.conversation.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        include: {
          messages: {
            take: 1, // Get latest message for preview
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      res.status(200).json(conversations);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get conversations';
      res.status(400).json({ error: message });
    }
  }

  async getConversation(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { conversationId } = req.params;

      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      if (conversation.userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      res.status(200).json(conversation);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get conversation';
      res.status(400).json({ error: message });
    }
  }

  async addMessage(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { conversationId } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      // Verify user owns conversation
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      if (conversation.userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Add user message
      const message = await prisma.message.create({
        data: {
          conversationId,
          role: 'user',
          content,
        },
      });

      res.status(201).json(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add message';
      res.status(400).json({ error: message });
    }
  }
}

export const chatController = new ChatController();
