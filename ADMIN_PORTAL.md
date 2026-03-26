# Admin Portal Documentation

## Overview
The Admin Portal is a comprehensive platform management interface that provides system-wide oversight and control over all stores, products, users, and analytics.

## Accessing the Admin Portal
- **From Owner Portal**: Click the "🔧 Admin Portal" button at the bottom of the sidebar
- **Direct URL**: Navigate to `/admin` or `/admin/dashboard`

## Features & Sections

### 1. 📊 Dashboard (`/admin/dashboard`)
**Main control center with overview of entire platform**
- **Metrics Cards**: Total stores, products, revenue, and alerts
- **Revenue Trend Chart**: Weekly revenue visualization with line chart
- **Product Categories**: Pie chart showing category distribution
- **AI Insights**: 4 AI-powered recommendations with confidence levels
- **Critical Alerts**: Color-coded system alerts panel
- **Activity Log**: Recent platform activities with user details
- **Top Stores Leaderboard**: Rankings with gold/silver/bronze badges
- **System Health**: Server, database, and API status monitors
- **Quick Actions**: Buttons for add store, add admin, generate report, send notification

### 2. 🏪 Store Management (`/admin/stores`)
**Manage all stores and owners across the platform**
- **Search & Filter**: Search stores by name/owner, filter by status
- **Stats**: Total/Active/Suspended/Pending stores count
- **Store Table**: 8 columns with store details, owner info, products, revenue, status
- **Actions**: View details, edit, enable/disable stores
- **Empty State**: User-friendly message when no stores match filters

### 3. 📦 Global Products (`/admin/products`)
**System-wide product insights and inventory monitoring**
- **Stats Cards**: Total/Low Stock/Out of Stock/Expiring products
- **Top 3 Sellers**: Showcase of best-selling products with gradient cards
- **Category Filter**: Filter by Fruits & Vegetables, Beverages, Dairy, Snacks, Bakery, All
- **Status Filter**: In Stock, Low Stock, Out of Stock, Expiring Soon, All
- **Product Table**: 7 columns with name, category, store, stock, expiry, status, sales
- **Color-coded Status**: Green (In Stock), Yellow (Low Stock), Red (Out of Stock), Orange (Expiring)

### 4. 📈 Platform Analytics (`/admin/analytics`)
**Comprehensive analytics with multiple chart types**
- **Key Metrics**: Total revenue, average revenue, transactions, growth rate
- **Weekly Revenue Trend**: Area chart with gradient fill
- **Monthly Growth**: Bar chart for 3-month comparison
- **Store Growth Timeline**: Line chart showing store acquisition
- **Category Distribution**: Pie chart with percentages
- **Store Comparison**: Horizontal bar chart comparing revenue & products
- **Key Insights**: 3 gradient cards with actionable insights

### 6. 👥 User Management (`/admin/users`)
**Manage users and role-based permissions**
- **Stats**: Total users, owners, managers, staff counts
- **Role Filtering**: Filter by All, Owner, Manager, Staff
- **User Table**: 7 columns with user info, email, role, store, status, joined date
- **Role Cards**: 3 gradient cards explaining each role
- **Permissions Matrix**: Visual table showing what each role can do
- **Actions**: View, edit role, suspend users
- **Add User**: Button to add new users to the platform

### 7. 📄 Reports & Export (`/admin/reports`)
**Generate and export comprehensive reports**
- **Quick Stats**: Revenue, products, stores, weekly revenue
- **Report Types**: 6 gradient cards for different report categories
  - Revenue Report, Inventory Report, Store Performance, User Activity, Sales Analytics, Product Insights
- **Quick Export**: Pre-configured export buttons for common data (stores, inventory, revenue, users)
- **Custom Export**: Form to select data type, format (CSV/PDF/Excel), date range
- **Recent Exports**: List of previously generated exports with download/delete
- **Scheduled Reports**: View and manage recurring reports (weekly revenue, monthly sales)

### 8. 🔔 Notification Center (`/admin/notifications`)
**Send and manage platform-wide notifications**
- **Stats**: Total notifications, high priority, active announcements, unread count
- **Send Announcement**: Form to create new notifications with title, message, priority, type, target audience
- **Recent Notifications**: List of recent alerts with priority badges and actions
- **Platform Announcements**: Major updates and features with NEW badge
- **Activity Feed**: Recent platform activities from activity log
- **Notification Settings**: Email and in-app notification preferences with checkboxes

## Design Features

### Color Scheme
- **Admin Portal**: Indigo/Purple gradient theme (distinct from Owner's blue)
- **Sidebars**: Gradient backgrounds with active state highlighting
- **Cards**: White with shadows, gradient accents for emphasis
- **Charts**: Professional color palette for data visualization

### UI Components
- **Gradients**: Used extensively for headers, cards, and buttons
- **Icons**: Emoji-based icons for visual clarity
- **Badges**: Color-coded status indicators (green/yellow/red/blue/purple)
- **Charts**: Recharts library (Line, Bar, Area, Pie charts)
- **Tables**: Responsive with hover effects and action buttons
- **Empty States**: Friendly messages when no data available

### Navigation
- **Admin Sidebar**: Fixed left sidebar with 7 sections + "Back to Owner Portal" link
- **Active States**: Highlighted nav items with white/20 opacity background
- **Quick Access**: Admin portal link added to Owner sidebar footer

## Mock Data Structure
All admin features run on mock data from `/src/data/adminMockData.js`:
- **mockStores**: 6 stores with revenue, products, status, owner
- **mockGlobalProducts**: 6 products with stock, expiry, status, sales
- **mockUsers**: 6 users with roles (Owner/Manager/Staff)
- **mockRevenueData**: 7-day revenue and transaction data
- **mockStoreGrowth**: 3-month store growth timeline
- **mockCategoryData**: 5 product categories with colors
- **mockAlerts**: 4 system alerts (critical/warning/info/success)
- **mockActivityLog**: 5 recent platform activities
- **mockTopStores**: 5 store leaderboard with rankings
- **mockSystemHealth**: Server, database, API, cache, queue status
- **mockAIInsights**: 4 AI-powered insights with confidence levels

## Technical Stack
- **React 18+**: Component-based architecture
- **React Router**: Multi-portal routing
- **Recharts**: Data visualization library
- **Tailwind CSS**: Utility-first styling
- **No Backend Required**: All features work with mock data

## Screenshots & Use Cases
- **For Evaluators**: Professional SaaS dashboard appearance
- **For Demos**: Fully functional interface with realistic data
- **For Development**: Foundation for future backend integration

## Future Enhancements (when backend available)
- Real API integration replacing mock data
- WebSocket for real-time alerts
- User authentication with JWT
- Database-backed reports and exports
- Email notification system
- Two-factor authentication
- Advanced filtering and search
- Export to actual CSV/PDF files
- Scheduled report generation
- User role management with RBAC

---

**Navigation Tip**: Access admin portal from owner sidebar → Admin Portal button (purple gradient)

**Back to Owner Portal**: Click "← Back to Owner Portal" link at bottom of admin sidebar
