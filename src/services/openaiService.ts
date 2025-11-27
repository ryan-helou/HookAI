import type { Hook, Tone } from '../types/hooks';

const API_BASE_URL = 'http://localhost:3004';

export const generateHooks = async (description: string, tone: Tone): Promise<Hook[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-hooks`, {
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
