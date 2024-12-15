import { create } from 'zustand';
import { User } from '../types';
import * as api from '../api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    name: string,
    email: string,
    password: string,
    securityQuestion: string,
    securityAnswer: string
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
  verifySecurityQuestion: (email: string, answer: string) => Promise<void>;
  resetPassword: (email: string, securityAnswer: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  login: async (email, password) => {
    try {
      const { user, token } = await api.login(email, password);
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
  signup: async (name, email, password, securityQuestion, securityAnswer) => {
    try {
      const { user, token } = await api.signup(name, email, password, securityQuestion, securityAnswer);
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },
  forgotPassword: async (email) => {
    const response = await api.forgotPassword(email);
    return response.securityQuestion;
  },
  verifySecurityQuestion: async (email, answer) => {
    await api.verifySecurityQuestion(email, answer);
  },
  resetPassword: async (email, securityAnswer, newPassword) => {
    await api.resetPassword(email, securityAnswer, newPassword);
  },
}));