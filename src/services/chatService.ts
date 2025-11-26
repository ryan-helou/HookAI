import { api } from './api';
import { Conversation, ConversationListItem, Message } from '../types/chat';

class ChatService {
  async createConversation(topic: string, initialMessage?: string): Promise<Conversation> {
    const response = await api.post('/chat/conversations', {
      topic,
      initialMessage,
    });
    return response.data;
  }

  async getConversations(): Promise<ConversationListItem[]> {
    const response = await api.get('/chat/conversations');
    return response.data;
  }

  async getConversation(conversationId: string): Promise<Conversation> {
    const response = await api.get(`/chat/conversations/${conversationId}`);
    return response.data;
  }

  async addMessage(conversationId: string, content: string): Promise<Message> {
    const response = await api.post(`/chat/conversations/${conversationId}/messages`, {
      content,
    });
    return response.data;
  }
}

export const chatService = new ChatService();
