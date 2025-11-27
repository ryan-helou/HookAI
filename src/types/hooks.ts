export type Tone = 'funny' | 'dramatic' | 'inspirational' | 'urgent' | 'casual' | 'professional';

export interface Hook {
  hook: string;
  score: number;
  section: 'templates' | 'created';
  isTemplate: boolean;
}
