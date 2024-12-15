import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useExpenseStore } from '../../store/useExpenseStore';

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#8B5CF6', '#6366F1', '#A855F7'];

export function ExpenseChart() {
  const expenses = useExpenseStore((state) => state.expenses);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const categoryData = expenses.reduce((acc: Record<string, number>, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Expenses by Category</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-md text-sm ${
              chartType === 'bar'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 rounded-md text-sm ${
              chartType === 'pie'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pie
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="amount" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ category, percent }) => 
                  `${category} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}