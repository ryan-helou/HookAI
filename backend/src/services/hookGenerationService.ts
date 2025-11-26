import { OpenAI } from 'openai';
import { getSampleHooks } from '../utils/hooksLoader';
import { Tone } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GeneratedHook {
  hook: string;
  tone: string;
}

export class HookGenerationService {
  async generateHooks(topic: string, tone: Tone): Promise<GeneratedHook[]> {
    try {
      // Get sample of proven hooks as reference
      const goodHooks = getSampleHooks(15);

      // Build the prompt with examples
      const examplesText = goodHooks
        .map((hook, i) => `${i + 1}. "${hook}"`)
        .join('\n');

      const prompt = `You are an expert short-form video hook writer. Your task is to generate viral hooks based on proven patterns.

Here are 15 proven high-performing viral hooks for reference:
${examplesText}

Now, generate 5 NEW unique viral hooks for a video about: "${topic}"
Tone: ${tone}

Requirements:
- Each hook should be 15-30 words
- Create curiosity gaps, urgency, or pattern interrupts
- Match the "${tone}" tone
- Be original (don't copy the examples)
- Format each as a complete, standalone hook

Return ONLY valid JSON array (no markdown, no extra text):
[
  { "hook": "hook text here", "tone": "${tone}" },
  { "hook": "another hook here", "tone": "${tone}" }
]`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8, // Slightly creative but consistent
        max_tokens: 1000,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      // Parse JSON response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Invalid JSON in OpenAI response');
      }

      const hooks = JSON.parse(jsonMatch[0]) as GeneratedHook[];

      // Validate hooks
      if (!Array.isArray(hooks) || hooks.length === 0) {
        throw new Error('No hooks generated');
      }

      return hooks.slice(0, 5); // Return max 5 hooks
    } catch (error) {
      console.error('Hook generation error:', error);
      throw new Error(`Failed to generate hooks: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const hookGenerationService = new HookGenerationService();
