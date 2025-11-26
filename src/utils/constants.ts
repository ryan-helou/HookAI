import { Tone } from '../types/hooks';

export const TONES: Tone[] = ['funny', 'dramatic', 'inspirational', 'urgent', 'casual', 'professional'];

export const TONE_DESCRIPTIONS: Record<Tone, string> = {
  funny: '😄 Make it hilarious and entertaining',
  dramatic: '🎭 Build tension and drama',
  inspirational: '✨ Motivate and inspire',
  urgent: '⚡ Create FOMO and urgency',
  casual: '😎 Keep it chill and relatable',
  professional: '💼 Keep it polished and credible',
};

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    hookLimit: 3,
    features: ['3 hooks/month', 'Basic tone options', 'Community support'],
  },
  basic: {
    name: 'Basic',
    price: 5,
    hookLimit: 150,
    features: ['150 hooks/month', 'All tones', 'Email support', 'Hook history'],
  },
  pro: {
    name: 'Pro',
    price: 25,
    hookLimit: 1000,
    features: ['1000 hooks/month', 'All tones', 'Priority support', 'Advanced analytics', 'API access'],
  },
};

export const USAGE_WARNING_THRESHOLD = 0.8; // Show warning at 80%
