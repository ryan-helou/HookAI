import { OpenAI } from 'openai';

const PROVEN_TEMPLATES = [
  "Here's exactly how to [outcome]. [solution].",
  "Here's exactly how you're gonna [outcome].",
  "Here's the exact 3 step process to [outcome].",
  "Here's exactly how to NEVER [opposite of outcome].",
  "If there's one piece of advice about how to [outcome] today, please let it be this.",
  "Wanna know why most people never [outcome]?",
  "Here's how to stop [opposite of outcome]. [Solution].",
  "Alright I'm gonna teach you exactly how to [outcome] in one video.",
  "In 60 seconds I'm going to logically prove to you how you can literally [outcome].",
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description, tone = 'urgent' } = req.body;

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const openai = new OpenAI({ apiKey });

    // Select random template samples
    const templateSample = [...PROVEN_TEMPLATES]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    // Call OpenAI to select and fill templates
    const templateResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `You are an expert at analyzing viral social media hooks. A creator is making a video about: "${description}".

Here are proven viral hook templates:
${templateSample.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Select the BEST 4 templates and fill in the [brackets] with specific details based on "${description}".
Show your work by making filled text BOLD.

Return ONLY a JSON array with 4 objects:
[{"hook": "filled hook with **bold** text", "hookPlain": "plain text version", "relevanceScore": 85}]`,
        },
      ],
      temperature: 0.7,
    });

    const templateContent = templateResponse.choices[0].message.content;
    if (!templateContent) {
      throw new Error('No content from template selection');
    }

    // Parse template JSON
    const templateMatch = templateContent.match(/\[[\s\S]*\]/);
    if (!templateMatch) {
      throw new Error('Could not parse template response');
    }

    const allTemplates = JSON.parse(templateMatch[0]);
    // Ensure we have at least 3 templates
    const templates = allTemplates.slice(0, 3);

    // Generate 2 original hooks
    const toneInstructions = {
      funny: 'Use humor, witty jokes, and laugh-out-loud moments.',
      dramatic: 'Use suspense, cliffhangers, and intense language.',
      inspirational: 'Use motivational language and empowerment themes.',
      urgent: 'Use urgent language, FOMO, and high-energy words.',
      casual: 'Use relaxed, conversational tone and friendly language.',
      professional: 'Use formal, authoritative tone and data-driven insights.',
    };

    const originalResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate 2 COMPLETELY ORIGINAL viral hooks for a video about: "${description}".
Tone: ${tone}. ${toneInstructions[tone] || 'Be engaging and compelling.'}

Requirements:
- Under 1.5 seconds of spoken word
- Specific to the topic
- Create curiosity gaps
- Use "you" or "we"

Return ONLY a JSON array:
[{"hook": "hook text"}]`,
        },
      ],
      temperature: 0.95,
    });

    const originalContent = originalResponse.choices[0].message.content;
    if (!originalContent) {
      throw new Error('No content from original generation');
    }

    const originalMatch = originalContent.match(/\[[\s\S]*\]/);
    if (!originalMatch) {
      throw new Error('Could not parse original hooks');
    }

    const originals = JSON.parse(originalMatch[0]);

    // Score the original hooks
    const hooksText = originals.map((h) => h.hook).join('\n');
    const scoringResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Score these hooks on a scale of 1-100 for engagement potential for a ${description} video:
${hooksText}

Return ONLY JSON:
[{"hook": "hook text", "score": 85}]`,
        },
      ],
      temperature: 0.5,
    });

    const scoringContent = scoringResponse.choices[0].message.content;
    const scoringMatch = scoringContent.match(/\[[\s\S]*\]/);
    const scores = JSON.parse(scoringMatch[0]);

    // Combine and format all hooks
    const allHooks = [
      ...templates.map((t) => ({
        hook: t.hook,
        hookPlain: t.hookPlain,
        score: t.relevanceScore,
        isTemplate: true,
      })),
      ...scores.map((s) => ({
        hook: s.hook,
        hookPlain: s.hook,
        score: s.score,
        isTemplate: false,
      })),
    ];

    // Sort by score descending
    allHooks.sort((a, b) => b.score - a.score);

    res.json({ success: true, hooks: allHooks });
  } catch (error) {
    console.error('Error generating hooks:', error);
    const errorMessage = error.message || 'Unknown error';
    res.status(500).json({ error: `Failed to generate hooks: ${errorMessage}` });
  }
}
