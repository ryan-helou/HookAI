/**
 * Viral Content Hook Generation Framework
 * Based on the Personal Brand Launch (PBL) & Content Academy (CA) Methodology
 *
 * This framework provides comprehensive training data and context for generating
 * high-performing, viral short-form video hooks.
 */

export const CORE_PRINCIPLES = {
  clarity:
    "The hook must make the context and value of the video clear instantly. Omit unnecessary details to maintain speed. Aim for approximately 1 second.",
  specificity:
    "Avoid universal or broad concepts. Viral videos penetrate the noise by being extremely specific to a narrow target audience.",
  curiosityGaps:
    "Plant a question in the viewer's head, forcing them to pause scrolling. Challenge common beliefs as one of the strongest forms of hook creation.",
  relatability:
    "Hooks conveying 'Message to our former self' resonate deeply with target audience. Leverage unique problems, limiting beliefs, pains.",
  actionableLanguage:
    "Focus on the outcome, solution, or process. Use 'you' or 'we' to invite viewer into conversation, avoiding self-obsessed narration.",
};

export const HOOK_TEMPLATES = {
  // A. Educational & How-To Hooks
  educational: [
    "Here's exactly how much [action/item] you need to [result].",
    "Can you tell us how to [result] in 60 seconds?",
    "I'm going to tell you how to get [result], [mind blowing method].",
    "It took me 10 years to learn this but I'll teach it to you in less than 1 minute.",
    "Here's how to develop a [skill] so strong that you physically can't stop [doing skill].",
    "3 Youtube channels that will teach you more than any [industry/niche] degree.",
    "Everyone tells you to [action] but nobody actually tells you how to do it.",
    "[before state] to [after state] in # simple steps.",
    "In 60 seconds I'm going to teach you more about [thing] than you have ever learned.",
    "[noun] for dummies.",
    "This is every way to [action].",
    "Here's every [noun] that you actually need to know.",
    "I am a professional [industry] hacker, and here's every hack.",
    "Here's exactly how to [outcome]. [solution].",
    "Here's the exact 3 step process to [outcome].",
    "Here's the only method/way/strategy/hack that will let you [personal outcome].",
    "I'm gonna show you exactly how to [outcome] in a very very specific way.",
    "In 60 seconds I'm going to logically prove to you how you can literally [outcome].",
    "Here's how to [outcome] in a way a 5 year-old could understand.",
  ],

  // B. Curiosity & Question Hooks
  curiosity: [
    "This is what [thing] looks like when you're [action]. And this is what they look like when you're not.",
    "If you don't have [item/action], do [item/action].",
    "Not to flex, but I'm pretty good at [skill/niche].",
    "Are you still [action]? I've got [result] and I have never [action].",
    "I think I just found the biggest [niche/industry] cheat code.",
    "[trait] Guy vs [trait] Guy.",
    "What if I told you this [item] could [result].",
    "If you can't solve this [problem] in under 5 seconds go back to [pre-qualifying stage].",
    "You wouldn't get [bad result] if you [action].",
    "This is harder than getting into Harvard.",
    "This is why no one remembers you.",
    "Don't touch this.",
    "If I [action] right now would you believe me if I told you [truth].",
    "What [title] says vs what they mean.",
    "[trend] is the most disgusting trend on social media.",
  ],

  // C. Comparison & Contrast Hooks
  comparison: [
    "Money can buy you [item] but it can not buy you [result].",
    "[industry] tier list for [year].",
    "Ranking all the most popular [noun], from worst to best.",
    "Your [noun] looks like this and you want them to look like this.",
    "[last year] [noun], [current year] [noun].",
    "This is an [noun], and this is an [noun].",
    "A lot of people ask me what's better [option #1] or [option #2]. I achieved [dream result] doing one of these.",
    "For this [item] you could have all of these [item].",
    "This is [metric] of [noun] for [price], and this is also [metric] for [price].",
    "Cheap vs. Expensive [noun].",
    "[thing 1] or [thing 2]? Now having done both, let me tell you the pros and cons.",
  ],

  // D. Authority & Transformation Hooks
  authority: [
    "This represents your X before, during, and after X.",
    "My money rules as a [description] working towards financial independence.",
    "If I woke up [pain point] and wanted to [dream result] by [time].",
    "If I were starting over with no [item] here are the top # things I would do.",
    "I make more money than doctors, engineers, and lawyers without a traditional degree.",
    "I worked at [company] and now I am exposing everything they keep from customers.",
    "You've heard of the viral [method] right? Well I invented that!",
    "My [before state] used to look like this and now they look like this.",
    "How to turn this into this in X simple steps.",
    "Over the past [time] I've grown my [thing] from [before] to [after].",
    "Just # [item/action] took my client from [before] to [after].",
    "I became a [achievement] at [age].",
    "I lost over [metric] in [time frame].",
    "No because my transformation from [age] to [age] ought to be studied.",
    "How I took this [title] from 0 to [#] in 1 week.",
  ],

  // E. Problem/Pain Point & Prevention Hooks
  problemPain: [
    "If you are [age group] do not do [action].",
    "If you're [age range] these are the # things you need to do so you don't end up [pain point].",
    "If you want to end up [pain point] then skip this video.",
    "If you're between the ages of [age] and feel like [pain point].",
    "This is why doing [action] makes you [pain point].",
    "If you're really a [dream result], why aren't you doing [common belief]?",
    "Just because you do [action] doesn't make you a good [label].",
    "Let me de-influence you from [action].",
    "It's time to throw away your [item], you don't need it anymore.",
    "You are not bad at [action], you probably were just never taught how.",
    "The biggest problem with the [XX system] that nobody talks about is [bold claim].",
    "The WORST [thing they do/choose] in 2024 is...",
    "Here are the 3 biggest 'no-nos' when it comes to [your niche].",
    "If you're under 25 and you feel like you [problem], please just watch this video.",
  ],

  // F. Personal Storytelling Hooks
  storytelling: [
    "I started my [business] when I was [age] with [insert $].",
    "X years ago my [person] told me [quote/statement].",
    "I have [time] to get my stuff together.",
    "I don't have a backup plan so this kind of needs to work.",
    "This is how my [event/item/result] changed my life.",
    "X days/months/years into my [action], my worst nightmare became my reality.",
    "I'm [age] and I'm not ashamed to admit that >>",
    "I am a [title] by day and a [title] by night.",
    "I am leaving my [salary] dream job at [company] to [action].",
    "This is day # of making [noun] for our dream clients.",
    "I [action] almost everyday for a week and here is what happened.",
    "Day # of [action] until I [dream result].",
    "This is the story of how I managed to do [achievement].",
    "X years it took me from [bad situation] to [good situation].",
    "I used to be in a super toxic relationship back in [time frame].",
    "I just left my 9-5 corporate job to start my [business].",
    "I [traumatic event] at [age] but it's what happened after that changed my life.",
  ],

  // G. Day in the Life & Status Hooks
  dayInLife: [
    "[goal] day # [event about that day].",
    "Day 1 of starting over my whole entire life.",
    "Day in the life of a future millionaire.",
    "This is what an average day of a [title] looks like a week out from [event].",
    "We all have the same 24 hours in a day so here I am putting my 24 hours to work.",
    "I am a # year old [title], and I am heading to [event/location].",
    "This is what my morning looks like while [situation].",
  ],
};

export const LM_GENERATION_INSTRUCTIONS = {
  priority:
    "Clarity, Concision, and Specificity with tangible numbers and timeframes.",
  structure:
    "Generate variations using templates, ensuring 50% create Curiosity Gaps (open loops that force viewers to watch).",
  audienceConnection:
    "Incorporate target audience into the hook. Generate at least two 'Message to Former Self' hooks that speak to the viewer's past self.",
  lengthConstraint:
    "All hooks under 3 seconds, ideally under 1.5 seconds of spoken word.",
};

export const HOOK_PERFORMANCE_ANALOGY =
  "Think of a hook as an ultra-specific key designed to unlock a particular door. A general key (broad, cliché hook) fits many locks slightly but won't open any quickly. A viral key (hyper-specific, curiosity-driven hook) opens your target audience's lock instantly, leading to high retention and algorithmic distribution.";

export const FRAMEWORK_SUMMARY = `
You are operating under the Viral Content Hook Generation Framework, which prioritizes:

1. CLARITY & CONCISION: Make context and value instantly clear (aim for 1 second)
2. SPECIFICITY: Target narrow audiences with specific details, not broad concepts
3. CURIOSITY GAPS: Create open loops that force viewers to watch (challenge common beliefs)
4. RELATABILITY: Use "Message to Former Self" hooks that speak to past struggles
5. ACTIONABLE LANGUAGE: Focus on outcomes and solutions, use "you" or "we"

GENERATION RULES:
- Aim for 50% of hooks to create strong curiosity gaps
- Include tangible numbers, timeframes, and specific details
- Generate at least 2 "Message to Former Self" hooks
- Keep all hooks under 1.5 seconds of spoken word
- Be extremely specific to the target audience and topic
- Challenge assumptions and common beliefs where possible

Remember: A viral hook is a hyper-specific, curiosity-driven key that instantly unlocks your audience's attention.
`;
