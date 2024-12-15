import express from 'express';
import Expense from '../models/Expense.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all expenses for a user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// Add new expense
router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user.userId,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense' });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
});

export default router;