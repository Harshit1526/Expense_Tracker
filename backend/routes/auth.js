import express from 'express';
import { body } from 'express-validator';
import { signup, login, forgotPassword, resetPassword } from '../controllers/authController.js';
import { passwordResetLimiter, loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Validation middleware
const signupValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, loginLimiter, login);
router.post('/forgot-password', forgotPasswordValidation, passwordResetLimiter, forgotPassword);
router.post('/reset-password', resetPasswordValidation, resetPassword);

export default router;