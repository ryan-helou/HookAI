import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import { Tone, TONES } from '../../utils/constants';
import { MessageList } from './MessageList';
import { InputBox } from './InputBox';
import { ToneSelector } from './ToneSelector';

interface ChatInterfaceProps {
  conversationId?: string;
  initialMessages?: Message[];
  onSendMessage: (message: string, tone: Tone) => Promise<void>;
  isLoading?: boolean;
  messages?: Message[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  messages = initialMessages,
}) => {
  const [selectedTone, setSelectedTone] = useState<Tone>('funny');
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to local state
    const userMessage: Message = {
      id: `local-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    setLocalMessages([...localMessages, userMessage]);

    try {
      await onSendMessage(content, selectedTone);
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the user message if sending failed
      setLocalMessages(localMessages.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tone Selector */}
      <div className="bg-white border-b border-gray-200 p-4">
        <ToneSelector selectedTone={selectedTone} onToneChange={setSelectedTone} />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={localMessages} />
        {isLoading && (
          <div className="flex justify-center items-center gap-2 py-4">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <InputBox onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};
