export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  topic: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationListItem {
  id: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
}
