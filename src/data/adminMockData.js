// Admin Portal Mock Data

export const mockStores = [
  { id: 1, name: "Fresh Mart", owner: "Ravi Kumar", email: "ravi@freshmart.com", status: "Active", products: 245, revenue: 125000, lastActive: "2024-03-09", location: "Mumbai" },
  { id: 2, name: "Green Basket", owner: "Anil Sharma", email: "anil@greenbasket.com", status: "Active", products: 180, revenue: 89000, lastActive: "2024-03-09", location: "Delhi" },
  { id: 3, name: "Daily Needs", owner: "Priya Singh", email: "priya@dailyneeds.com", status: "Suspended", products: 156, revenue: 45000, lastActive: "2024-03-05", location: "Bangalore" },
  { id: 4, name: "Super Store", owner: "Vijay Mehta", email: "vijay@superstore.com", status: "Active", products: 320, revenue: 198000, lastActive: "2024-03-09", location: "Pune" },
  { id: 5, name: "Quick Shop", owner: "Neha Patel", email: "neha@quickshop.com", status: "Active", products: 98, revenue: 56000, lastActive: "2024-03-08", location: "Ahmedabad" },
  { id: 6, name: "City Mart", owner: "Rahul Verma", email: "rahul@citymart.com", status: "Pending", products: 67, revenue: 12000, lastActive: "2024-03-07", location: "Jaipur" },
];

export const mockGlobalProducts = [
  { id: 1, name: "Fresh Tomatoes", store: "Fresh Mart", stock: 45, expiry: "2024-03-15", category: "Vegetables", status: "Good", sales: 120 },
  { id: 2, name: "Milk (1L)", store: "Green Basket", stock: 3, expiry: "2024-03-10", category: "Dairy", status: "Low Stock", sales: 98 },
  { id: 3, name: "Basmati Rice", store: "Super Store", stock: 0, expiry: "2024-06-20", category: "Grocery", status: "Out of Stock", sales: 156 },
  { id: 4, name: "Bananas", store: "Daily Needs", stock: 89, expiry: "2024-03-12", category: "Fruits", status: "Good", sales: 234 },
  { id: 5, name: "Bread", store: "Fresh Mart", stock: 12, expiry: "2024-03-11", category: "Bakery", status: "Expiring Soon", sales: 187 },
  { id: 6, name: "Paneer", store: "Quick Shop", stock: 8, expiry: "2024-03-10", category: "Dairy", status: "Expiring Soon", sales: 76 },
];

export const mockUsers = [
  { id: 1, name: "Ravi Kumar", email: "ravi@freshmart.com", role: "Owner", store: "Fresh Mart", status: "Active", joined: "Jan 2024" },
  { id: 2, name: "Anil Sharma", email: "anil@greenbasket.com", role: "Owner", store: "Green Basket", status: "Active", joined: "Feb 2024" },
  { id: 3, name: "Priya Singh", email: "priya@dailyneeds.com", role: "Owner", store: "Daily Needs", status: "Active", joined: "Jan 2024" },
  { id: 4, name: "Vijay Mehta", email: "vijay@superstore.com", role: "Owner", store: "Super Store", status: "Active", joined: "Dec 2023" },
  { id: 5, name: "Neha Patel", email: "neha@quickshop.com", role: "Owner", store: "Quick Shop", status: "Active", joined: "Feb 2024" },
  { id: 6, name: "Rahul Verma", email: "rahul@citymart.com", role: "Owner", store: "City Mart", status: "Active", joined: "Mar 2024" },
  { id: 7, name: "Admin User", email: "admin@marketmind.com", role: "Admin", store: "Platform Admin", status: "Active", joined: "Jan 2024" },
  { id: 8, name: "Super Admin", email: "superadmin@marketmind.com", role: "Admin", store: "Platform Admin", status: "Active", joined: "Dec 2023" },
];

export const mockRevenueData = [
  { day: "Mon", revenue: 45000, transactions: 120 },
  { day: "Tue", revenue: 52000, transactions: 145 },
  { day: "Wed", revenue: 48000, transactions: 132 },
  { day: "Thu", revenue: 61000, transactions: 167 },
  { day: "Fri", revenue: 73000, transactions: 198 },
  { day: "Sat", revenue: 89000, transactions: 234 },
  { day: "Sun", revenue: 67000, transactions: 187 },
];

export const mockStoreGrowth = [
  { month: "Jan", stores: 20 },
  { month: "Feb", stores: 32 },
  { month: "Mar", stores: 50 },
];

export const mockCategoryData = [
  { name: "Fruits", value: 30, color: "#22C55E" },
  { name: "Vegetables", value: 25, color: "#3B82F6" },
  { name: "Dairy", value: 20, color: "#F59E0B" },
  { name: "Grocery", value: 15, color: "#EF4444" },
  { name: "Bakery", value: 10, color: "#8B5CF6" },
];

export const mockAlerts = [
  { id: 1, type: "critical", title: "Low Stock Alert", message: "12 stores have products with low stock", count: 12, time: "5 mins ago" },
  { id: 2, type: "warning", title: "Expired Products", message: "5 stores have expired items", count: 5, time: "15 mins ago" },
  { id: 3, type: "info", title: "Inactive Stores", message: "2 stores inactive for 7 days", count: 2, time: "1 hour ago" },
  { id: 4, type: "success", title: "Sales Spike", message: "Fresh Mart sales increased 45% today", count: 1, time: "2 hours ago" },
];

export const mockActivityLog = [
  { id: 1, action: "Store added", detail: 'Store "City Mart" was added', user: "Admin", time: "10 mins ago" },
  { id: 2, action: "Settings updated", detail: "Tax rate changed to 8%", user: "Admin", time: "1 hour ago" },
  { id: 3, action: "Products added", detail: "Owner added 120 products", user: "Ravi Kumar", time: "2 hours ago" },
  { id: 4, action: "Store suspended", detail: "Daily Needs suspended for violations", user: "Admin", time: "3 hours ago" },
  { id: 5, action: "User registered", detail: "New owner registered", user: "Neha Patel", time: "5 hours ago" },
];

export const mockTopStores = [
  { rank: 1, name: "Fresh Mart", revenue: 125000, growth: "+23%" },
  { rank: 2, name: "Super Store", revenue: 198000, growth: "+18%" },
  { rank: 3, name: "Green Basket", revenue: 89000, growth: "+15%" },
  { rank: 4, name: "Quick Shop", revenue: 56000, growth: "+12%" },
  { rank: 5, name: "Daily Needs", revenue: 45000, growth: "-5%" },
];

export const mockSystemHealth = {
  serverStatus: "Healthy",
  activeUsers: 120,
  transactionsToday: 430,
  uptime: "99.8%",
  lastBackup: "2 hours ago",
};

export const mockAIInsights = [
  { id: 1, insight: "Vegetable sales increased 23% this week", confidence: "High", icon: "📈" },
  { id: 2, insight: "Fresh Mart is your top performing store", confidence: "High", icon: "⭐" },
  { id: 3, insight: "Dairy products have low stock across 8 stores", confidence: "Medium", icon: "⚠️" },
  { id: 4, insight: "Weekend sales are 40% higher than weekdays", confidence: "High", icon: "📊" },
];

export const mockMonthlyRevenue = [
  { month: "Jan", revenue: 450000 },
  { month: "Feb", revenue: 520000 },
  { month: "Mar", revenue: 680000 },
  { month: "Apr", revenue: 745000 },
  { month: "May", revenue: 820000 },
  { month: "Jun", revenue: 890000 },
];

export const mockNotifications = [
  { id: 1, title: "System Maintenance", message: "Scheduled maintenance on March 15 from 2-4 AM", type: "warning", read: false },
  { id: 2, title: "New Feature", message: "Advanced analytics dashboard now available", type: "success", read: false },
  { id: 3, title: "Low Stock Alert", message: "12 stores have critical low stock items", type: "critical", read: true },
  { id: 4, title: "Store Performance", message: "Fresh Mart achieved 45% sales growth", type: "success", read: true },
];

export const mockPlatformSettings = {
  taxRate: 8,
  currency: "INR",
  lowStockThreshold: 10,
  expiryAlertDays: 5,
  maxStoresPerOwner: 5,
  autoBackupEnabled: true,
  backupFrequency: "Daily",
};

export const mockSystemAlerts = [
  { id: 1, type: "critical", title: "12 Stores - Low Stock", description: "Products below threshold", count: 12, color: "bg-red-100 border-red-300" },
  { id: 2, type: "warning", title: "5 Stores - Expired Items", description: "Products past expiry date", count: 5, color: "bg-yellow-100 border-yellow-300" },
  { id: 3, type: "warning", title: "2 Stores - Inactive", description: "No activity for 7 days", count: 2, color: "bg-orange-100 border-orange-300" },
  { id: 4, type: "info", title: "3 Pending Stores", description: "Awaiting approval", count: 3, color: "bg-blue-100 border-blue-300" },
];
