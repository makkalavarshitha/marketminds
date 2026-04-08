# MarketMinds - Supermarket Inventory Management System

A comprehensive full-stack inventory management system designed for supermarket owners. Built with React + Vite (frontend) and Node.js + Express (backend).

## 🚀 Tech Stack

**Frontend:**

- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Fetch API for backend communication

**Backend:**

- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing

## 📋 Features

- **Dashboard**: Real-time inventory overview with key metrics
- **Product Management**: Add, edit, delete products with categories
- **Inventory Tracking**: Monitor stock levels and expiry dates
- **Sales Module**: Process transactions and manage billing
- **Store Profile**: Manage store information and settings
- **User Authentication**: Secure login and registration
- **Search & Filter**: Find products by name and category
- **Status Tracking**: Color-coded alerts for low stock and expiring items

## 🏗 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

**Backend Setup:**

```bash
cd backend
npm install
# Add your MongoDB URI and JWT secret to .env
npm start
```

**Frontend Setup:**

```bash
npm install
npm run dev
```

### Environment Variables

**Backend (.env):**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📁 Project Structure

```
marketminds/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sales

- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create sale
- `GET /api/sales/dashboard/stats` - Get dashboard stats

### Store

- `GET /api/store/profile` - Get store profile
- `PUT /api/store/profile` - Update store profile

## 🤝 Contributing

Feel free to fork this project and submit pull requests.

## 📝 License

ISC
