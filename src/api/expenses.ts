import api from './index';

export const getExpenses = async () => {
  const response = await api.get('/expenses');
  return response.data;
};

export const addExpense = async (expense: any) => {
  const response = await api.post('/expenses', expense);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};