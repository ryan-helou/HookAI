export type Tone = 'funny' | 'dramatic' | 'inspirational' | 'urgent' | 'casual' | 'professional';

export interface Hook {
  text: string;
  tone: Tone;
  score: number;
  rank: number;
}

export interface HookGenerationRequest {
  conversationId?: string;
  message: string;
  tone: Tone;
}

export interface HookRegenerationRequest {
  conversationId: string;
}

export interface HookResponse {
  hooks: Hook[];
  usage: {
    current: number;
    limit: number;
    remaining: number;
    percentage: number;
  };
}
