# Expense Tracker Pro

A modern, secure, and feature-rich expense tracking application built with React, Node.js, and MongoDB.

## 🌟 Features

### Authentication & Security
- 🔐 Secure user authentication with JWT
- 🔑 Password reset with security questions
- 🛡️ Rate limiting for enhanced security
- 📧 Email notifications (configurable)

### Expense Management
- 📊 Interactive charts and analytics
- 💰 Real-time expense tracking
- 🏷️ Category-based organization
- 🔍 Advanced filtering and search
- 📅 Date-based expense views

### User Experience
- 🎨 Modern and responsive design
- ⚡ Real-time updates
- 📱 Mobile-friendly interface
- 🌙 Intuitive user interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker-pro.git
cd expense-tracker-pro
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=5000
MONGODB_URI=your mongodb url
JWT_SECRET=your-secret-key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=your.email@gmail.com

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# Security Settings
PASSWORD_RESET_EXPIRES=3600
PASSWORD_RESET_LIMIT=3
```

4. Start the development server:
```bash
# Start frontend
npm run dev

# Start backend
npm run server
```

## 🏗️ Project Structure

```
expense-tracker/
├── src/                    # Frontend source code
│   ├── api/               # API integration
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── store/            # State management
│   └── types/            # TypeScript types
├── server/                # Backend source code
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
└── public/               # Static assets
```

## 🔧 Core Technologies

### Frontend
- React 18
- TypeScript
- Zustand (State Management)
- React Router v6
- Recharts
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- Rate Limiting

## 🔐 Security Features

1. **Password Security**
   - Bcrypt hashing
   - Minimum password requirements
   - Security question verification

2. **API Security**
   - JWT authentication
   - Rate limiting
   - Input validation
   - XSS protection

3. **Data Protection**
   - Secure password reset flow
   - Session management
   - Environment variable protection

## 📱 Features In Detail

### User Authentication
- Secure signup and login
- Password reset via security questions
- Session management
- Rate limiting for security

### Expense Management
- Add, edit, and delete expenses
- Categorize expenses
- Search and filter functionality
- Date range selection

### Analytics
- Visual expense breakdown
- Category-wise analysis
- Trend analysis
- Monthly/yearly comparisons

## 🛠️ Development

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component best practices

### Testing
```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Building for Production
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Expense Endpoints
```
GET    /api/expenses
POST   /api/expenses
DELETE /api/expenses/:id
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

## 📞 Support

For support, email support@expensetracker.com or join our Slack channel.

---

Made with ❤️ by Harshit Sharma
```
