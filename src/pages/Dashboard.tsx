import React, { useEffect, useState } from 'react';
import { AddExpenseForm } from '../components/expenses/AddExpenseForm';
import { ExpenseList } from '../components/expenses/ExpenseList';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { useAuthStore } from '../store/useAuthStore';
import { useExpenseStore } from '../store/useExpenseStore';
import { LogOut, DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export function Dashboard() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { expenses, fetchExpenses, error } = useExpenseStore((state) => ({
    expenses: state.expenses,
    fetchExpenses: state.fetchExpenses,
    error: state.error,
  }));
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        await fetchExpenses();
      } catch (error: any) {
        toast.error(error.message || 'Failed to load expenses');
      }
    };
    loadExpenses();
  }, [fetchExpenses]);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const highestExpense = expenses.length > 0 
    ? Math.max(...expenses.map(e => e.amount))
    : 0;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="bg-white shadow-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Expense Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Expense</p>
                <p className="text-2xl font-semibold text-gray-900">${averageExpense.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Highest Expense</p>
                <p className="text-2xl font-semibold text-gray-900">${highestExpense.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Add New Expense</h2>
              <button
                onClick={() => setShowAddExpense(!showAddExpense)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {showAddExpense ? 'Hide Expense Form' : 'Add Expense Form'}
              </button>
            </div>
            {showAddExpense && <AddExpenseForm />}
            <ExpenseChart />
          </div>
          <div>
            <ExpenseList />
          </div>
        </div>
      </main>
    </div>
  );
}