import api from './index';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  securityQuestion: string,
  securityAnswer: string
) => {
  const response = await api.post('/auth/signup', {
    name,
    email,
    password,
    securityQuestion,
    securityAnswer,
  });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const verifySecurityQuestion = async (email: string, answer: string) => {
  const response = await api.post('/auth/verify-security-question', { email, answer });
  return response.data;
};

export const resetPassword = async (email: string, securityAnswer: string, newPassword: string) => {
  const response = await api.post('/auth/reset-password', {
    email,
    securityAnswer,
    newPassword,
  });
  return response.data;
};