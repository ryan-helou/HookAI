import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { ChatInterface } from '../components/chat/ChatInterface';
import { HooksDisplay } from '../components/hooks/HooksDisplay';
import { chatService } from '../services/chatService';
import { hooksService } from '../services/hooksService';
import { usageTrackingService } from '../services/usageTrackingService';
import { Conversation } from '../types/chat';
import { Hook, Tone, HookResponse } from '../types/hooks';
import { UsageInfo } from '../types/subscription';

export const ChatPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(!!conversationId);

  // Load existing conversation if ID is provided
  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
    }
  }, [conversationId]);

  const loadConversation = async (id: string) => {
    try {
      setIsLoadingConversation(true);
      const conv = await chatService.getConversation(id);
      setConversation(conv);
      // Load hooks for this conversation
      const hooksList = await hooksService.getHooks(id);
      setHooks(hooksList);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      setIsLoadingConversation(false);
    }
  };

  const handleSendMessage = async (message: string, tone: Tone) => {
    setIsLoading(true);

    try {
      // Generate hooks through API
      const response: HookResponse = await hooksService.generateHooks(conversation?.id, message, tone);

      // Update hooks
      setHooks(response.hooks as Hook[]);

      // Update usage
      setUsage(response.usage as any);

      // If new conversation was created, update conversation ID
      if (!conversation && response.conversationId) {
        const newConv = await chatService.getConversation(response.conversationId);
        setConversation(newConv);
      } else if (conversation) {
        // Add message to existing conversation
        await chatService.addMessage(conversation.id, message);
        const updated = await chatService.getConversation(conversation.id);
        setConversation(updated);
      }
    } catch (error) {
      console.error('Failed to generate hooks:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate hooks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!conversation) return;

    setIsLoading(true);

    try {
      const response: HookResponse = await hooksService.regenerateHooks(conversation.id);
      setHooks(response.hooks as Hook[]);
      setUsage(response.usage as any);
    } catch (error) {
      console.error('Failed to regenerate hooks:', error);
      alert(error instanceof Error ? error.message : 'Failed to regenerate hooks');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar title="HookAI" showUsage={!!usage} usage={usage} />

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex gap-6 p-6 max-w-7xl mx-auto">
          {/* Chat Column */}
          <div className="flex-1 min-w-0 bg-white rounded-lg shadow-sm overflow-hidden">
            {isLoadingConversation ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin">Loading...</div>
              </div>
            ) : (
              <ChatInterface
                conversationId={conversation?.id}
                messages={conversation?.messages || []}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Hooks Column */}
          <div className="w-full lg:w-96 min-w-0 bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            <HooksDisplay
              hooks={hooks}
              isLoading={isLoading}
              onRegenerateClick={conversation ? handleRegenerate : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
