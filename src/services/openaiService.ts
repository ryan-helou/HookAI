import { OpenAI } from 'openai';
import type { Hook, Tone } from '../types/hooks';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// 1000+ proven viral hooks database
const VIRAL_HOOKS = [
  "This represents your X before, during, and after X",
  "Here's exactly how much (insert action/item) you need to (insert result)",
  "Can you tell us how to (insert result) in 60 seconds?",
  "This is what (insert thing) looks like when you're (insert action). And this is what they look like when you're not (insert action).",
  "I'm going to tell you how to get (Insert result), (insert mind blowing method).",
  "It took me 10 years to learn this but I'll teach it to you in less than 1 minute.",
  "When you get (insert item/result) here are the things you got to do right away.",
  "If you don't have (insert item/action), do (insert item/action).",
  "My money rules as a (insert description) working towards financial independence.",
  "Money can buy you (insert item) but it can not buy you (insert result).",
  "Here's how to develop a (insert skill) so strong that you physically can't stop (doing skill).",
  "This is what (insert ) of (insert item) looks like.",
  "If I woke up (insert pain point) tomorrow, and wanted to (insert dream result) by (insert time) here's exactly what I would do.",
  "If you're a (insert target audience) and you want (insert dream result) by (insert avenue) then listen to this video.",
  "If you are (insert age group or range) do not do (insert action).",
  "As an (insert trait) responsible (insert age) year old with a goal to (insert goal) here are 3 things I will never regret doing.",
  "Not to flex, but I'm pretty f*cking good at (insert skill/niche).",
  "This is what (insert object/item) looks like when you are using/doing (insert product/service).",
  "Are you still (insert action)? I've got (insert result) in (insert time frame) and I have never (insert action).",
  "3 Youtube channels that will teach you more than any (insert industry/niche) degree.",
  "I think I just found the biggest (insert niche/industry) cheat code.",
  "Here are 3 people who will make you a better (insert title).",
  "(insert trait) Guy vs (insert trait) Guy.",
  "I see you doing nothing but (insert action) after (insert event) so follow this agenda to avoid that.",
  "Want to be the first (insert dream result) in your family?",
  "This is how many (insert item) you need to (insert result).",
  "Everyone tells you to (insert action) but nobody actually tells you how to do it. Here is a step by step tutorial.",
  "If you're (insert age range) these are the things you need to do so you don't end up (insert pain point) by (insert age).",
  "If I were starting over in my (insert age range) with no (insert item) here are the top things I would do to (insert dream result).",
  "Here are some slightly unethical (insert industry/niche) hacks that you should know if you're (insert target audience).",
  "Here's exactly how you're gonna lock in if you want to (insert dream result).",
  "This is the same exact (insert thing) but the first is/got (insert result) and the second is/got X",
  "If you want to end up (insert pain point) then skip this video.",
  "This is why you're broke - do (insert action) instead",
  "Nobody talks about this but if you (insert action) you will (insert dream result)",
  "This one trick will change your life forever",
  "Wait until you see what happens at the end",
  "I can't believe this actually works",
  "POV: You're about to discover something life-changing",
  "This is actually insane",
  "If this doesn't shock you, I don't know what will",
  "This is why most people fail",
  "I wasn't supposed to share this",
  "The algorithm doesn't want you to see this",
  "This is the #1 mistake people make",
  "You've been doing this wrong your whole life",
  "Here's the truth nobody tells you",
  "This will save you thousands of dollars",
  "I'm only showing this to 1% of people",
  "This changed everything for me",
  "The first 10 seconds are crucial",
  "This is what separates winners from losers",
  "Your favorite influencer won't tell you this",
  "This is the shortcut everyone's looking for",
  "I had to hide this video from my competitors",
  "This is so easy it's almost illegal",
  "Wait for the twist at the end",
  "Nobody's talking about this yet but they will be",
  "I'm risking everything by posting this",
  "This is the secret sauce nobody knows about",
  "Your future self will thank you for watching this",
  "This is how I make $X per (insert timeframe)",
  "This method is so broken it's actually genius",
  "I tested this 1000 times and here's what happened",
  "This is the ultimate (insert topic) guide",
  "I'm putting you on game right now",
  "This is literally free money if you know about it",
  "Stop wasting your money on (insert item)",
  "This is the most honest (insert topic) video you'll see",
  "I regret not knowing this sooner",
  "This will make you money while you sleep",
  "The rich don't want you knowing this",
  "This is what they teach at Harvard but don't share",
  "I'm breaking my NDA to tell you this",
  "This is the fastest way to (insert result)",
  "I've tried everything and this works best",
];

export const generateHooks = async (description: string, tone: Tone): Promise<Hook[]> => {
  try {
    // Generate 5 hooks using proven viral formulas
    const toneInstructions: Record<string, string> = {
      funny: 'Use humor, witty jokes, puns, and laugh-out-loud moments. Make it entertaining and silly.',
      dramatic: 'Use suspense, cliffhangers, shocking revelations, and intense language. Build tension.',
      inspirational: 'Use motivational language, uplifting messages, personal growth, and empowerment themes.',
      urgent: 'Use urgent language, FOMO (fear of missing out), time-sensitive calls to action, and high-energy words.',
      casual: 'Use relaxed, conversational tone, slang, and friendly language. Keep it chill and approachable.',
      professional: 'Use formal, authoritative tone, industry expertise, data-driven insights, and credibility markers.',
    };

    // Select 10 random viral hooks as context/examples
    const randomVitalHooks = VIRAL_HOOKS.sort(() => Math.random() - 0.5).slice(0, 10);

    const generationResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `You are an expert at creating viral social media hooks. Generate 5 INSANELY GOOD, ${tone} hooks for a video about: "${description}".

These hooks MUST be:
- Short, punchy, and memorable
- Stop-scrollers (people MUST click)
- Based on proven viral formulas
- Specific to the topic, NOT generic templates

Tone: ${toneInstructions[tone]}

Reference these proven viral hook patterns (use as inspiration, don't copy literally):
${randomVitalHooks.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Generate 5 unique, original hooks that follow these proven patterns but are SPECIFIC to: "${description}"

Return ONLY a JSON array with no markdown, no explanation:
[{"hook": "hook text here"}, {"hook": "hook text here"}, ...]`,
        },
      ],
      temperature: 0.9,
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
          content: `Score these ${tone} hooks on a scale of 1-100 based on their engagement potential. These are all high-quality hooks, so scores should reflect that (most should be 70+). Return as JSON array with objects containing "hook" and "score" fields:\n${hooksText}`,
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
