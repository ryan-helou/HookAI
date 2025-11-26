import { OpenAI } from 'openai';
import { getSampleHooks } from '../utils/hooksLoader';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface HookWithScore {
  hook: string;
  score: number;
}

export class HookRankingService {
  /**
   * Score hooks based on learned patterns from proven high-performing hooks
   */
  async scoreHooks(hooks: string[], tone: string): Promise<HookWithScore[]> {
    try {
      // Get sample of proven hooks as reference
      const goodHooks = getSampleHooks(20);

      if (goodHooks.length === 0) {
        // Fallback: simple heuristic-based scoring if no examples loaded
        return this.scoreHooksFallback(hooks);
      }

      // Build the prompt with proven hooks as examples
      const examplesText = goodHooks
        .map((hook, i) => `${i + 1}. "${hook}"`)
        .join('\n');

      const hooksToScore = hooks
        .map((hook, i) => `${i + 1}. "${hook}"`)
        .join('\n');

      const prompt = `You are an expert at analyzing short-form video hooks for virality potential.

Here are 20 proven high-performing viral hooks that you should learn from:
${examplesText}

Analyze these hooks and score them based on how well they match the patterns from the proven hooks above.
Tone: ${tone}

Hooks to score:
${hooksToScore}

Score each hook from 1-100 based on:
1. Curiosity gap and pattern interrupt (does it make viewers want to click/watch?)
2. Urgency and FOMO (does it create time pressure?)
3. Specificity and clarity (is it clear what the video is about?)
4. Tone match (does it match the "${tone}" tone?)
5. Engagement potential (based on patterns from proven hooks)

Return ONLY valid JSON array with scores (no markdown, no explanation):
[
  { "hook": "hook text", "score": 85 },
  { "hook": "another hook", "score": 72 }
]`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3, // Low temperature for consistent scoring
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

      const scoredHooks = JSON.parse(jsonMatch[0]) as HookWithScore[];

      // Validate and clamp scores to 1-100
      return scoredHooks.map(h => ({
        hook: h.hook,
        score: Math.max(1, Math.min(100, Math.round(h.score))),
      }));
    } catch (error) {
      console.error('Hook scoring error:', error);
      // Fallback to heuristic scoring
      return this.scoreHooksFallback(hooks);
    }
  }

  /**
   * Fallback scoring when OpenAI is unavailable
   */
  private scoreHooksFallback(hooks: string[]): HookWithScore[] {
    return hooks.map((hook, index) => {
      let score = 50; // Base score

      // Curiosity indicators (+10)
      if (hook.includes('?')) score += 10;
      if (hook.match(/\b(wait|but|actually|never|finally|shocking)\b/i)) score += 5;

      // Urgency indicators (+8)
      if (hook.match(/\b(just|only|limited|before|now|today)\b/i)) score += 8;

      // Power words (+7)
      if (hook.match(/\b(secret|revealed|exact|proven|science|expert)\b/i)) score += 7;

      // Numbers (+5)
      if (hook.match(/\d+/)) score += 5;

      // Hook quality (+10)
      const words = hook.trim().split(/\s+/).length;
      if (words >= 12 && words <= 30) score += 10;
      else if (words > 30) score -= 5;

      // Rank bonus (first hooks get slight boost)
      if (index === 0) score += 5;

      // Clamp to 1-100
      return {
        hook,
        score: Math.max(1, Math.min(100, score)),
      };
    });
  }
}

export const hookRankingService = new HookRankingService();
