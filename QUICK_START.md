# 🚀 MarketMinds - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Backend Setup (2 minutes)

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/marketminds
JWT_SECRET=your_super_secret_key_123
```

**Important:** [Add your IP to MongoDB Atlas](https://www.mongodb.com/docs/atlas/security/ip-access-list/)

Start backend:

```bash
npm start
```

✅ Should see: `Server running in development mode on port 5000`

---

### Step 2: Frontend Setup (2 minutes)

```bash
npm install
npm run dev
```

✅ Should see: `Local: http://localhost:5173`

---

### Step 3: Test It (1 minute)

1. Open `http://localhost:5173` in browser
2. Click "Sign Up"
3. Create account and fill store profile
4. Add a product
5. ✅ See it in the table

---

## 📋 What Changed

| Component      | Old          | New               |
| -------------- | ------------ | ----------------- |
| Products       | localStorage | MongoDB API       |
| Authentication | Demo users   | JWT from database |
| Validation     | Basic        | Comprehensive     |
| Store Profile  | localStorage | MongoDB API       |

---

## 🔑 Key Files

**Modified (8 files):**

1. `README.md` - Fixed merge conflicts
2. `src/App.jsx` - API integration
3. `src/components/Login.jsx` - API + validation
4. `src/components/SignUp.jsx` - API + validation
5. `src/components/product-form.jsx` - Full validation
6. `src/components/StoreProfile.jsx` - API integration
7. `src/utils/api.js` - Fixed endpoints
8. `backend/src/routes/*.js` - Verified endpoints

**Documentation (4 files):**

- `INTEGRATION_GUIDE.md` - Full reference
- `TESTING_CHECKLIST.md` - QA guide
- `PROJECT_COMPLETION_SUMMARY.md` - Overview
- `DETAILED_CHANGES_LOG.md` - All changes

---

## ✅ Validation Examples

### Login Form

```
Email: example@com       ❌ "Please enter a valid email"
Password: 12345          ❌ "Must be at least 6 characters"
Password: password123    ✅ Submits
```

### Product Form

```
Name: xy                 ❌ "Must be at least 3 characters"
Name: Apple              ✅ OK
Category: (empty)        ❌ "Category is required" (after blur)
Price: -50               ❌ "Must be a positive number"
Price: 50.99             ✅ OK
Quantity: abc            ❌ "Must be a number"
Quantity: 100            ✅ OK
```

---

## 🔐 Authentication Flow

```
Sign Up → Register API → Validate → Save to DB → Redirect to Login
           ✓ email unique
           ✓ password 6+ chars
           ✓ all fields filled

Login → Login API → Validate Credentials → Generate JWT → Store Token
        ✓ user exists
        ✓ password correct
        ✓ token saved in localStorage

Protected Routes → Check Token → Valid → Show Dashboard
                                ✗ Invalid/Missing → Redirect to Login
```

---

## 🗄️ Data Flow

### Adding a Product

```
Form Input → Validation → Valid? → API POST /api/products
                              ↓
                          Backend Validation → MongoDB → Response
                              ↓
                          Success? → Update UI
```

### Fetching Products

```
App Mount → API GET /api/products
              ↓
          Backend Query → MongoDB → Response
              ↓
          setProducts State → Render Table
```

---

## 🐛 Troubleshooting

| Problem                     | Solution                                        |
| --------------------------- | ----------------------------------------------- |
| "Cannot connect to MongoDB" | Add IP to MongoDB Atlas Network Access          |
| "401 Unauthorized"          | Clear localStorage, login again                 |
| "Cannot POST /api/products" | Check backend is running on port 5000           |
| Form won't submit           | Check browser console for validation errors     |
| API call fails silently     | Open DevTools → Network tab → see request error |

---

## 📱 API Quick Reference

### User Auth

```
POST /api/auth/register  { name, email, password }
POST /api/auth/login     { email, password }
GET /api/auth/me         (requires token)
```

### Products

```
GET  /api/products              (list all)
POST /api/products              (create)
GET  /api/products/:id          (single)
PUT  /api/products/:id          (update)
DELETE /api/products/:id        (delete)
```

### Store

```
GET  /api/store                 (get profile)
PUT  /api/store                 (upsert profile)
```

### Sales

```
GET  /api/sales                 (list)
POST /api/sales                 (create)
GET  /api/sales/dashboard/stats (dashboard)
```

---

## 💡 Tips

- ✅ Check Network tab (F12) to see API calls
- ✅ Look at localStorage to see token stored
- ✅ Check backend console for errors
- ✅ Refresh page after adding product to verify it persists
- ✅ Use demo validation messages as guide

---

## 🎯 Next Steps

1. ✅ Start both servers
2. ✅ Test signup/login flow
3. ✅ Add/edit/delete products
4. ✅ Fill store profile
5. ✅ Check TESTING_CHECKLIST.md for comprehensive testing

---

## 📞 Need Help?

**See these docs:**

- 📖 `INTEGRATION_GUIDE.md` - Full technical reference
- ✅ `TESTING_CHECKLIST.md` - Step-by-step verification
- 📝 `DETAILED_CHANGES_LOG.md` - What changed and why
- 🎉 `PROJECT_COMPLETION_SUMMARY.md` - Project overview

---

**Everything is integrated and ready to go! 🚀**

Start both servers and begin testing!
