# MarketMind - Supermarket Inventory Management System

## 🎯 Project Overview
MarketMind is a comprehensive full-stack inventory management system designed specifically for supermarket owners. It allows you to efficiently manage all items in your supermarket, track manufacturing and expiry dates, monitor stock levels, and manage restocking needs.

## ✨ Features

### 📊 Dashboard
- **Total Products Count**: View total number of items in inventory
- **Inventory Value**: Real-time calculation of total inventory worth in rupees
- **Low Stock Alerts**: Immediate notification of items below 5 units
- **Expiring Soon Tracker**: Items expiring within 30 days
- **Expired Items Count**: Track products that have already expired
- **Status Indicators**: Color-coded cards for quick insights

### 📦 Product Management

#### Add Products
- Product name
- SKU/Barcode number for tracking
- Category selection (11 predefined categories)
  - Fruits & Vegetables
  - Dairy & Eggs
  - Meat & Fish
  - Grains & Cereals
  - Snacks
  - Beverages
  - Bakery
  - Frozen Foods
  - Spices & Condiments
  - Personal Care
  - Other
- Price per unit
- Stock quantity
- Manufacturing date
- Expiry date
- Form validation with error messages

#### Edit Products
- Update any product information
- Modal-based editing interface
- Preserve product ID for seamless updates

#### Delete Products
- Remove products from inventory
- Instant removal from database

### 🔍 Search & Filter
- **Real-time Search**: Search products by name
- **Category Filtering**: Filter by product category
- **Smart Sorting**: Sort by:
  - Product Name (A-Z)
  - Expiry Date (earliest first)
  - Stock Quantity (ascending)
  - Price (ascending)

### 🏷️ Inventory List
- Comprehensive product table with:
  - Product name and SKU
  - Category
  - Price per unit
  - Current stock quantity
  - Stock status badge (In Stock/Low Stock/Out of Stock)
  - Expiry status (Good/Soon/Urgent/Expired)
  - Manufacturing and expiry dates
  - Total inventory value per product
  - Edit and delete actions

### ⚠️ Status Indicators
- **In Stock**: Products with adequate stock
- **Low Stock**: Items below 5 units (orange badge)
- **Out of Stock**: Zero quantity items (red)
- **Expiring Soon**: 30+ days until expiry (yellow)
- **Urgent**: 7+ days until expiry (red)
- **Expired**: Past expiry date (red with Expired label)

### 🎨 User Interface
- Modern, gradient-based design
- Responsive layout (mobile, tablet, desktop)
- Professional color scheme (Blue/Indigo/Green/Orange/Red)
- Smooth animations and transitions
- Shadow effects for depth
- Consistent padding and spacing

### 💾 Data Persistence
- All data saved in browser's localStorage
- Automatic saving on product changes
- Data persists across browser sessions
- No server required for basic functionality

### 📱 Navigation
- Sticky header with search bar
- User profile section
- Quick access to all features
- Smooth scrolling

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Visit `http://localhost:5174/` (or assigned port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

## 📋 Tech Stack
- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 3.4.19
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser LocalStorage
- **Post-processing**: PostCSS with Autoprefixer
- **Linting**: ESLint

## 📝 Component Structure

### Components
1. **Navbar.jsx** - Header with search functionality
2. **DashboardCards.jsx** - KPI cards displaying key metrics
3. **ProductForm.jsx** - Form for adding/editing products
4. **ProductTable.jsx** - Inventory list with filters and actions
5. **App.jsx** - Main application component with state management

## 💡 Usage Tips

### Adding a Product
1. Click "+ Add Product" button
2. Fill in required fields (marked with *)
3. Optionally add manufacturing and expiry dates
4. Click "Add Product"

### Editing a Product
1. Find the product in the inventory list
2. Click "Edit" button
3. Modify the details
4. Click "Update Product"

### Searching Products
1. Use the search bar in the navbar
2. Type product name or partial match
3. Results update in real-time

### Filtering by Category
1. Click "⚙️ Filters" in the inventory section
2. Select a category from the dropdown
3. Products instantly filter
4. Click "Clear All Filters" to reset

### Managing Stock
- Regular products show "In Stock"
- Products below 5 units show "Low Stock"
- Zero quantity shows "Out of Stock"
- Set reorder alerts based on low stock warnings

## 🔐 Data Management
- All data stored locally in browser (no cloud sync by default)
- Export data by copying from browser's DevTools
- Clear all data by clearing browser cache/localStorage

## 🎯 Future Enhancements
- Backend API integration
- User authentication
- Multi-store management
- Automated reordering
- Sales analytics
- Barcode scanning
- PDF invoice generation
- Email notifications for expiring items
- Bulk import/export
- Role-based access control

## ⚙️ Configuration

### Tailwind CSS
Customize colors, spacing, and other settings in `tailwind.config.js`

### ESLint
Code quality rules configured in `eslint.config.js`

### Vite
Build and dev configuration in `vite.config.js`

## 📞 Support
For issues or feature requests, please refer to the project documentation or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: ✅ Production Ready
