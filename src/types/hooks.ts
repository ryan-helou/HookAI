export type Tone = 'funny' | 'dramatic' | 'inspirational' | 'urgent' | 'casual' | 'professional';

export interface Hook {
  hook: string;
  hookPlain?: string; // Plain text version for copying (used for templates)
  score: number;
  section: 'templates' | 'created';
  isTemplate: boolean;
}
