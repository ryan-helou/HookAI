import { OpenAI } from 'openai';
import type { Hook, Tone } from '../types/hooks';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateHooks = async (description: string, tone: Tone): Promise<Hook[]> => {
  try {
    // Generate 5 hooks
    const generationResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate 5 engaging social media hooks for a ${tone} video about: "${description}". Return as JSON array with objects containing only "hook" field. Example: [{"hook": "Watch this..."}, ...]`,
        },
      ],
      temperature: 0.8,
    });

    const generatedContent = generationResponse.choices[0].message.content;
    if (!generatedContent) throw new Error('No content from generation');

    // Parse generated hooks
    const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Could not parse hooks from response');

    const generatedHooks = JSON.parse(jsonMatch[0]) as Array<{ hook: string }>;

    // Score the hooks
    const hooksText = generatedHooks.map((h) => h.hook).join('\n');
    const scoringResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Score these ${tone} hooks 1-100 based on engagement potential. Return as JSON array with objects containing "hook" and "score" fields:\n${hooksText}`,
        },
      ],
      temperature: 0.5,
    });

    const scoringContent = scoringResponse.choices[0].message.content;
    if (!scoringContent) throw new Error('No content from scoring');

    const scoringMatch = scoringContent.match(/\[[\s\S]*\]/);
    if (!scoringMatch) throw new Error('Could not parse scores from response');

    const hooks = JSON.parse(scoringMatch[0]) as Hook[];

    // Sort by score descending
    return hooks.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};
