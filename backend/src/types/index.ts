// Auth types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
  refreshToken: string;
}

// Hook types
export interface HookGenerationRequest {
  conversationId: string;
  message: string;
  tone: string;
}

export interface Hook {
  text: string;
  tone: string;
  score: number;
}

export interface HookResponse {
  hooks: Hook[];
  usage: {
    current: number;
    limit: number;
    remaining: number;
  };
}

// Subscription types
export type PlanId = 'free' | 'basic' | 'pro';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  monthlyLimit: number;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    monthlyLimit: 3,
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 5,
    monthlyLimit: 150,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 25,
    monthlyLimit: 1000,
  },
};
