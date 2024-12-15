export interface User {
  id: string;
  email: string;
  name: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

export interface Expense {
  _id: string; 
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: string;
}


export const SECURITY_QUESTIONS = [
  "What was your first pet's name?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was the name of your first school?",
  "What is your favorite book?",
  "What was your childhood nickname?",
] as const;

export type SecurityQuestion = typeof SECURITY_QUESTIONS[number];