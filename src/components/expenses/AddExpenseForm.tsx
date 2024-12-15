import React, { useState } from 'react';
import { useExpenseStore } from '../../store/useExpenseStore';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function AddExpenseForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addExpense = useExpenseStore((state) => state.addExpense);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const selectedCategory = category === 'Other' ? otherCategory : category;

      if (!selectedCategory) {
        toast.error('Please specify a category.');
        return;
      }

      await addExpense({
        amount: parseFloat(amount),
        description,
        category: selectedCategory,
        date: new Date().toISOString(),
        userId: 'user-id-placeholder', // Replace with the actual user ID
      });

      toast.success('Expense added successfully!');
      setAmount('');
      setDescription('');
      setCategory('');
      setOtherCategory('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter description"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {category === 'Other' && (
        <div>
          <label htmlFor="otherCategory" className="block text-sm font-medium text-gray-700">
            Specify Category
          </label>
          <input
            type="text"
            id="otherCategory"
            required
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter custom category"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <PlusCircle className="h-5 w-5 mr-2" />
        {isSubmitting ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
}
