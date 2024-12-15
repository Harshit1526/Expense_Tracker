import express from 'express';
import { body } from 'express-validator';
import { signup, login, forgotPassword, verifySecurityQuestion, resetPassword } from '../controllers/authController.js';
import { passwordResetLimiter, loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Validation middleware
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const signupValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('securityQuestion').notEmpty().withMessage('Security question is required'),
  body('securityAnswer').notEmpty().withMessage('Security answer is required'),
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
];

const resetPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('securityAnswer').notEmpty().withMessage('Security answer is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, loginLimiter, login);
router.post('/forgot-password', forgotPasswordValidation, passwordResetLimiter, forgotPassword);
router.post('/verify-security-question', verifySecurityQuestion);
router.post('/reset-password', resetPasswordValidation, resetPassword);

export default router;