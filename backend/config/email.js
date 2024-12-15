import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify email configuration on server start
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"Expense Tracker" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Reset Your Password - Expense Tracker',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(to right, #4F46E5, #7C3AED); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0;">Reset Your Password</h1>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hello,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(to right, #4F46E5, #7C3AED);
                      color: white;
                      padding: 12px 24px;
                      text-decoration: none;
                      border-radius: 6px;
                      display: inline-block;
                      font-weight: bold;
                      text-transform: uppercase;
                      letter-spacing: 1px;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            This link will expire in 1 hour for security reasons.
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            If you didn't request this reset, please ignore this email or contact support if you have concerns.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #6b7280; font-size: 14px;">
            © ${new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};