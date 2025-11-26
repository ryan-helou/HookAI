import { api } from './api';
import { Hook, HookGenerationRequest, HookRegenerationRequest, HookResponse, Tone } from '../types/hooks';

class HooksService {
  async generateHooks(conversationId: string | undefined, message: string, tone: Tone): Promise<HookResponse> {
    const payload: HookGenerationRequest = {
      conversationId,
      message,
      tone,
    };

    const response = await api.post('/hooks/generate', payload);
    return response.data;
  }

  async regenerateHooks(conversationId: string): Promise<HookResponse> {
    const payload: HookRegenerationRequest = {
      conversationId,
    };

    const response = await api.post('/hooks/regenerate', payload);
    return response.data;
  }

  async getHooks(conversationId: string): Promise<Hook[]> {
    const response = await api.get(`/hooks/${conversationId}`);
    return response.data;
  }

  /**
   * Copy hook text to clipboard
   */
  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }
}

export const hooksService = new HooksService();
