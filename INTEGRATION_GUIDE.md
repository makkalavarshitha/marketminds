# MarketMinds - Backend Integration & Validation Setup Guide

## ✅ Completed - All Integration Tasks

### 1. **README.md - Merge Conflicts Fixed** ✓

- Resolved all Git merge conflict markers
- Updated with comprehensive project documentation
- Added API endpoint reference
- Included setup and installation instructions

### 2. **Frontend-to-Backend Integration** ✓

#### App.jsx (Main Component)

- Replaced all localStorage product calls with API calls using `productsAPI`
- Integrated `storeAPI` for store profile management
- Added proper error handling for API failures
- Implemented loading states
- Synced user authentication with backend token storage

#### Updated Components with API Integration:

**Authentication Components:**

- `Login.jsx` - Uses `authAPI.login()` with email/password validation
- `SignUp.jsx` - Uses `authAPI.register()` with form validation

**Product Management:**

- `product-form.jsx` - Integrated with `productsAPI.createProduct()` and `.updateProduct()`
- Form submits validated data to backend

**Store Profile:**

- `StoreProfile.jsx` - Uses `storeAPI.updateProfile()` to save store data

### 3. **Frontend Input Validation** ✓

#### Login Form

- Email format validation (regex check)
- Password minimum length validation (6+ characters)
- Real-time error display on blur
- Disabled submit during loading

#### SignUp Form

- Name validation (required, non-empty)
- Email validation (valid email format)
- Password validation (6+ characters)
- Confirm password matching
- Real-time error feedback

#### Product Form

- Product name validation (3+ characters)
- Category required
- Price validation (positive number)
- Quantity validation (non-negative number)
- SKU validation (required)
- Supplier validation (required)
- Manufacturing date <= Expiry date validation
- Touch-based error display (errors shown only after blur)
- Loading state during submission

#### Store Profile Form

- Store name validation (required)
- Owner name validation (required)
- Phone validation (required)
- Address validation (required)

### 4. **Component Integration** ✓

All frontend components now properly wired to backend:

```
Users
 ├─ Login/SignUp → /api/auth/register, /api/auth/login
 └─ Authentication Token stored in localStorage

Products
 ├─ ProductForm → /api/products (POST/PUT)
 ├─ ProductTable → /api/products (GET/DELETE)
 └─ Dashboard → fetches from /api/products

Store Profile
 └─ StoreProfile → /api/store (GET/PUT)

Sales
 ├─ Sales → /api/sales (POST)
 └─ Dashboard Stats → /api/sales/dashboard/stats
```

## 🔧 API Endpoints Reference

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns token)
- `GET /api/auth/me` - Get current user info

### Products (All require authentication)

- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sales (All require authentication)

- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create sale
- `GET /api/sales/dashboard/stats` - Get dashboard statistics

### Store (All require authentication)

- `GET /api/store` - Get store profile
- `PUT /api/store` - Create/update store profile

## 🚀 Setup Instructions

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
```

**Important: Add your IP to MongoDB Atlas Network Access**

- Go to MongoDB Atlas → Network Access
- Add your current IP or use 0.0.0.0/0 for development

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

## 📋 Validation Rules

### Product Form

| Field       | Rules                          | Error Message                                  |
| ----------- | ------------------------------ | ---------------------------------------------- |
| Name        | Required, 3+ chars             | "Product name must be at least 3 characters"   |
| SKU         | Required, non-empty            | "SKU is required"                              |
| Category    | Required selection             | "Category is required"                         |
| Price       | Required, > 0                  | "Price must be a positive number"              |
| Quantity    | Required, ≥ 0                  | "Quantity must be a positive number"           |
| Supplier    | Required, non-empty            | "Supplier is required"                         |
| Expiry Date | If set, must be after Mfg Date | "Expiry date must be after manufacturing date" |

### Auth Forms

| Field            | Rules               | Error Message                                 |
| ---------------- | ------------------- | --------------------------------------------- |
| Email            | Valid email format  | "Please enter a valid email address"          |
| Password         | 6+ characters       | "Password must be at least 6 characters long" |
| Confirm Password | Must match password | "Passwords do not match"                      |
| Name             | Required, non-empty | "Please enter your name"                      |

## 🔐 Authentication Flow

1. **User Registration**
   - User fills SignUp form with validation
   - Submits to `POST /api/auth/register`
   - Backend validates and returns user + token

2. **User Login**
   - User enters credentials on Login page
   - Submits to `POST /api/auth/login`
   - Token stored in localStorage
   - User redirected to Dashboard or Store Setup

3. **Authenticated Requests**
   - All API calls include `Authorization: Bearer {token}` header
   - Backend middleware (`protect`) validates token
   - Requests fail with 401 if no/invalid token

## ⚙️ Key Features Implemented

✅ Frontend validation before API calls
✅ Backend validation on API endpoints
✅ Error handling with user-friendly messages
✅ Loading states during API operations
✅ JWT authentication with token storage
✅ Protected routes (authenticated users only)
✅ Real-time error display on form blur
✅ Data persistence via API (not localStorage)
✅ Toast/Alert notifications for errors

## 🐛 Troubleshooting

### Backend Won't Start

- Check MongoDB connection string in `.env`
- Verify your IP is whitelisted in MongoDB Atlas
- Check if port 5000 is already in use

### Login Fails

- Verify backend is running on port 5000
- Check email/password format
- Ensure user exists (try signing up first)

### API Calls Fail

- Check browser console for error details
- Verify CORS is enabled in backend
- Ensure token is stored in localStorage

## 📝 Next Steps (Optional Enhancements)

1. Add React Toasts for better UX notifications
2. Implement refresh token logic
3. Add forgot password functionality
4. Implement role-based access control
5. Add API request caching
6. Implement file uploads (product images)
7. Add unit tests for validation functions
8. Setup CI/CD pipeline

---

**All validation has been implemented. Backend and Frontend are now properly integrated.**
