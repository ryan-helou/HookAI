export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Subscription {
  id: string;
  planId: 'free' | 'basic' | 'pro';
  status: 'active' | 'inactive' | 'canceled';
  currentUsage: number;
  monthlyLimit: number;
  renewalDate: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  subscription?: Subscription;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}
