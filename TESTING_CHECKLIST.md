# MarketMinds - Integration Testing Checklist

## ✅ Quick Verification Steps

### 1. Backend Connection Test

- [ ] Open terminal in `backend` folder
- [ ] Run `npm start`
- [ ] Verify: "Server running in development mode on port 5000"
- [ ] Verify: "MongoDB Connected" (after fixing IP whitelist)

### 2. Frontend Start Test

- [ ] Open terminal in root folder
- [ ] Run `npm run dev`
- [ ] Browser opens to `http://localhost:5173`
- [ ] No console errors

### 3. Authentication Flow Test

#### Sign Up

- [ ] Navigate to Sign Up page
- [ ] Leave name empty → Show "name is required"
- [ ] Enter invalid email → Show "invalid email"
- [ ] Enter password < 6 chars → Show "minimum 6 characters"
- [ ] Passwords don't match → Show "passwords do not match"
- [ ] Fill all fields correctly → Submit to API
- [ ] Success message appears → Redirect to Login

#### Login

- [ ] Enter non-existent email → Show API error
- [ ] Enter wrong password → Show API error
- [ ] Enter valid credentials → Redirect to Store Setup or Dashboard
- [ ] Token saved to localStorage → browser DevTools → Application → localStorage

### 4. Product Management Test

#### Add Product

- [ ] Click "Add New Product"
- [ ] Leave name empty → No error initially
- [ ] Click away from name field → "name is required" appears
- [ ] Enter name < 3 chars → "must be at least 3 characters"
- [ ] Don't select category → "category is required" after blur
- [ ] Enter negative price → "must be positive"
- [ ] Enter all valid data → Button shows "Saving..."
- [ ] Submit → Product appears in table
- [ ] Product saved to database → Refresh page → Product still there

#### Edit Product

- [ ] Click edit button on product
- [ ] Change price to negative → "must be positive"
- [ ] Update valid data → Submit
- [ ] Changes reflected in table
- [ ] Changes persist after refresh

#### Delete Product

- [ ] Click delete on product
- [ ] Product removed from table
- [ ] Refresh page → Product gone from database

### 5. Store Profile Test

- [ ] Update store profile
- [ ] Leave fields empty → Show validation errors
- [ ] Fill all required fields
- [ ] Submit → Data saved
- [ ] Refresh page → Data persists

### 6. Dashboard Test

- [ ] Dashboard loads products from API
- [ ] Displays correct product count
- [ ] Shows low stock alerts
- [ ] Shows expiring soon items
- [ ] All stats are correct

## 📋 Validation Testing Matrix

### Form Validation Tests

| Component    | Field      | Input       | Expected        |
| ------------ | ---------- | ----------- | --------------- |
| SignUp       | Email      | invalid     | Error when blur |
| SignUp       | Password   | 5 chars     | Error when blur |
| SignUp       | Confirm    | different   | Error when blur |
| Login        | Email      | any invalid | Error when blur |
| Login        | Password   | too short   | Error when blur |
| Product      | Name       | empty       | Error when blur |
| Product      | Name       | 2 chars     | Error when blur |
| Product      | Price      | -100        | Error when blur |
| Product      | Quantity   | negative    | Error when blur |
| Product      | Expiry     | before mfg  | Error when blur |
| StoreProfile | Store Name | empty       | Error on submit |
| StoreProfile | Owner Name | empty       | Error on submit |

## 🔍 API Response Testing

### Check Network Tab (F12 → Network)

#### Successful Responses

- Status: 200 or 201
- Body contains `success: true`
- Data fields populated

#### Error Responses

- Status: 400 (validation error)
- Body contains error message
- User sees error notification

## 📊 Data Persistence Test

After each operation:

1. Open Network Tab (F12 → Network)
2. Check request was sent to correct endpoint
3. Check response status is 200/201
4. Close tab and reopen browser
5. Verify data still exists (not just in memory)

## 🎯 End-to-End Workflow

```
1. Start both servers (backend + frontend)
   ↓
2. Sign up with new account
   ↓
3. See store setup page
   ↓
4. Fill store profile → Save
   ↓
5. See dashboard
   ↓
6. Add product with all fields
   ↓
7. Verify in product table
   ↓
8. Edit product
   ↓
9. Delete product
   ↓
10. Logout (clears token)
   ↓
11. Try accessing protected route → Redirect to Login
   ↓
12. Login with same credentials
   ↓
13. All products loaded from API
   ✅ Success
```

## ⚠️ Common Issues & Fixes

| Issue                      | Cause                        | Fix                                    |
| -------------------------- | ---------------------------- | -------------------------------------- |
| 401 Unauthorized           | Token missing/invalid        | Clear localStorage, login again        |
| "Cannot POST /api/product" | Typo in endpoint             | Check URL path matches backend route   |
| Validation doesn't show    | Error not set                | Ensure `touched` state is true         |
| API call fails silently    | Missing error handling       | Check browser console for error        |
| MongoDB connection refuses | IP not whitelisted           | Add IP in MongoDB Atlas Network Access |
| CORS error                 | Backend doesn't allow origin | Check CORS middleware in server.js     |

## 🚀 Performance Checklist

- [ ] API responses < 1 second on good connection
- [ ] Form validation instant (no lag)
- [ ] Page loads don't show loading spinner for > 2 seconds
- [ ] No console errors or warnings
- [ ] No memory leaks (check DevTools Performance tab)

## 📱 Browser Compatibility Test

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 🔐 Security Checklist

- [ ] Token stored in localStorage (not sent in URL)
- [ ] Password sent only over HTTPS (in production)
- [ ] No sensitive data in error messages
- [ ] HTTPS enforced in production
- [ ] CORS properly configured

---

**Run this checklist before considering the project complete.**
