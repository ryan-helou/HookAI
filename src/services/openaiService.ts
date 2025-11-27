import type { Hook, Tone } from '../types/hooks';

export const generateHooks = async (description: string, tone: Tone): Promise<Hook[]> => {
  try {
    const response = await fetch('/api/generate-hooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, tone }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !data.hooks) {
      throw new Error('Invalid response format from server');
    }

    return data.hooks;
  } catch (error) {
    console.error('Hook generation error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};
