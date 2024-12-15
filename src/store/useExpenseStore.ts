import { create } from 'zustand';
import { Expense } from '../types';
import * as api from '../api/expenses';

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  fetchExpenses: () => Promise<void>;
  addExpense: (expense: Omit<Expense, '_id'>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async () => {
    try {
      set({ loading: true, error: null });
      const expenses = await api.getExpenses();
      set({ expenses, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch expenses', loading: false });
      throw error;
    }
  },

  addExpense: async (expense) => {
    try {
      set({ error: null });
      const newExpense = await api.addExpense(expense);
      set({ expenses: [...get().expenses, newExpense] });
    } catch (error: any) {
      set({ error: error.message || 'Failed to add expense' });
      throw error;
    }
  },

  deleteExpense: async (id) => {
    try {
      set({ error: null });
      await api.deleteExpense(id);
      set({
        expenses: get().expenses.filter((expense) => expense._id !== id),
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete expense' });
      throw error;
    }
  },
}));
