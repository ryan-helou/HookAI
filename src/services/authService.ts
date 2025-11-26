import { api } from './api';
import { AuthResponse, LoginPayload, SignupPayload, User } from '../types/auth';

class AuthService {
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    const response = await api.post('/auth/signup', payload);
    const data = response.data as AuthResponse;

    // Store tokens
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post('/auth/login', payload);
    const data = response.data as AuthResponse;

    // Store tokens
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Logout anyway even if API fails
      console.error('Logout API error:', error);
    }

    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  async getMe(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data.user;
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { oldPassword, newPassword });
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

export const authService = new AuthService();
