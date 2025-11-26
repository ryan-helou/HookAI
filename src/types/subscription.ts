export interface Plan {
  id: 'free' | 'basic' | 'pro';
  name: string;
  price: number;
  hookLimit: number;
  features: string[];
}

export interface UsageInfo {
  current: number;
  limit: number;
  remaining: number;
  percentage: number;
  planId: 'free' | 'basic' | 'pro';
  renewalDate: string;
}

export interface CheckoutSession {
  id: string;
  clientSecret: string;
  publishableKey: string;
}
