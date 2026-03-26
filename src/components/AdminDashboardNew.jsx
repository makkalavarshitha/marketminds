import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockStores, mockRevenueData, mockCategoryData, mockActivityLog, mockTopStores, mockSystemHealth, mockAIInsights, mockMonthlyRevenue, mockSystemAlerts, mockStoreGrowth, mockGlobalProducts } from "../data/adminMockData";
import { useState } from "react";

export default function AdminDashboardNew() {
  const [, setSelectedAlert] = useState(null);
  
  const totalStores = mockStores.length;
  const activeStores = mockStores.filter(s => s.status === "Active").length;
  const totalProducts = mockStores.reduce((sum, s) => sum + s.products, 0);
  const salesToday = mockRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const expiringProducts = mockGlobalProducts.filter((p) => p.status === "Expiring Soon").length;
  const lowStockAlerts = mockGlobalProducts.filter((p) => p.status === "Low Stock" || p.status === "Out of Stock").length;

  
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">🎛️ Admin Control Center</h1>
            <p className="text-white/90 text-lg">System-wide platform management & analytics</p>
            <p className="text-white/70 text-sm mt-2">Welcome back, Admin! Your platform is operating at peak performance.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">System Status</p>
            <p className="text-2xl font-bold text-green-300">● Healthy</p>
          </div>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Total Stores</p>
              <h2 className="text-3xl font-bold text-indigo-600 mt-2">{totalStores}</h2>
              <p className="text-xs text-green-600 mt-1">↗ +5 this month</p>
            </div>
            <div className="text-4xl">🏪</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Active Stores</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">{activeStores}</h2>
              <p className="text-xs text-green-600 mt-1">100% operational</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Total Products</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">{totalProducts}</h2>
              <p className="text-xs text-blue-600 mt-1">Across all stores</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Total Sales Today</p>
              <h2 className="text-3xl font-bold text-purple-600 mt-2">₹{(salesToday / 100000).toFixed(2)}L</h2>
              <p className="text-xs text-green-600 mt-1">Across all channels</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Expired / Expiring</p>
              <h2 className="text-3xl font-bold text-orange-600 mt-2">{expiringProducts}</h2>
              <p className="text-xs text-orange-600 mt-1">Need immediate action</p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Low Stock Alerts</p>
              <h2 className="text-3xl font-bold text-pink-600 mt-2">{lowStockAlerts}</h2>
              <p className="text-xs text-pink-600 mt-1">Critical products</p>
            </div>
            <div className="text-4xl">🚨</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockRevenueData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Bar dataKey="revenue" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={mockCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {mockCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Revenue & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Monthly Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMonthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6", r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Store Growth */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Store Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockStoreGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stores" fill="#EC4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Alerts & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🚨 System Alerts</h3>
          <div className="space-y-3">
            {mockSystemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition ${alert.color}`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-gray-400">{alert.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💡 AI Insights</h3>
          <div className="space-y-3">
            {mockAIInsights.map((insight) => (
              <div key={insight.id} className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{insight.insight}</p>
                    <div className="mt-2 inline-block px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                      {insight.confidence} Confidence
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Stores & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Stores */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">⭐ Top Performing Stores</h3>
          <div className="space-y-3">
            {mockTopStores.map((store) => (
              <div key={store.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                    {store.rank}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{store.name}</p>
                    <p className="text-xs text-gray-500">₹{store.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <span className={`font-bold ${store.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {store.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Activity Feed</h3>
          <div className="space-y-3">
            {mockActivityLog.slice(0, 5).map((activity) => (
              <div key={activity.id} className="p-3 border-l-4 border-indigo-500 bg-indigo-50 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.detail}</p>
                    <p className="text-xs text-gray-500 mt-1">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health Footer */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Server Status</p>
          <p className="font-bold text-green-600 text-lg">● Healthy</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Uptime</p>
          <p className="font-bold text-gray-900 text-lg">{mockSystemHealth.uptime}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Last Backup</p>
          <p className="font-bold text-gray-900 text-lg">{mockSystemHealth.lastBackup}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Active Sessions</p>
          <p className="font-bold text-gray-900 text-lg">{mockSystemHealth.activeUsers}</p>
        </div>
      </div>
    </div>
  );
}
