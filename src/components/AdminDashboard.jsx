import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockStores, mockRevenueData, mockCategoryData, mockAlerts, mockActivityLog, mockTopStores, mockSystemHealth, mockAIInsights } from "../data/adminMockData";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const totalStores = mockStores.length;
  const activeStores = mockStores.filter(s => s.status === "Active").length;
  const totalProducts = mockStores.reduce((sum, s) => sum + s.products, 0);
  const todaySales = mockRevenueData[mockRevenueData.length - 1].revenue;
  const todayTransactions = mockRevenueData[mockRevenueData.length - 1].transactions;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Admin Control Center 🎛️</h1>
        <p className="mt-2 text-white/90">System-wide platform management and analytics</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="font-semibold">{activeStores}/{totalStores}</span> Active Stores
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="font-semibold">{todayTransactions}</span> Transactions Today
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="font-semibold">{mockSystemHealth.uptime}</span> Uptime
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Stores</p>
              <h2 className="text-3xl font-bold text-indigo-600 mt-2">{totalStores}</h2>
              <p className="text-sm text-green-600 mt-1">↗ +2 this week</p>
            </div>
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
              🏪
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Products</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">{totalProducts}</h2>
              <p className="text-sm text-blue-600 mt-1">Across all stores</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              📦
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Today's Revenue</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">₹{todaySales.toLocaleString('en-IN')}</h2>
              <p className="text-sm text-green-600 mt-1">↗ +12% vs yesterday</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">System Alerts</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">{mockAlerts.length}</h2>
              <p className="text-sm text-red-600 mt-1">Require attention</p>
            </div>
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-2xl">
              🚨
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockRevenueData}>
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Categories */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Product Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={mockCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>🧠</span> AI-Powered Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAIInsights.map((insight) => (
            <div key={insight.id} className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <p className="font-medium">{insight.insight}</p>
                  <span className="text-xs bg-white/30 px-2 py-1 rounded-full mt-2 inline-block">
                    {insight.confidence} Confidence
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* System Alerts */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🚨 Critical Alerts</h3>
          <div className="space-y-3">
            {mockAlerts.map((alert) => {
              const styles = {
                critical: "bg-red-50 border-red-200 text-red-800",
                warning: "bg-orange-50 border-orange-200 text-orange-800",
                info: "bg-blue-50 border-blue-200 text-blue-800",
                success: "bg-green-50 border-green-200 text-green-800",
              };
              
              return (
                <div key={alert.id} className={`p-4 rounded-lg border ${styles[alert.type]}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{alert.title}</p>
                      <p className="text-sm mt-1">{alert.message}</p>
                      <p className="text-xs mt-2 opacity-75">{alert.time}</p>
                    </div>
                    <span className="font-bold text-2xl">{alert.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Recent Activity</h3>
          <div className="space-y-3">
            {mockActivityLog.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.detail}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Stores Leaderboard */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🏆 Top Performing Stores</h3>
        <div className="space-y-3">
          {mockTopStores.map((store) => (
            <div key={store.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  store.rank === 1 ? "bg-yellow-500" : store.rank === 2 ? "bg-gray-400" : store.rank === 3 ? "bg-orange-600" : "bg-blue-500"
                }`}>
                  {store.rank}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{store.name}</p>
                  <p className="text-sm text-gray-600">₹{store.revenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <span className={`font-semibold ${store.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {store.growth}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">💚 System Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">{mockSystemHealth.serverStatus}</p>
            <p className="text-sm mt-1">Server Status</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">{mockSystemHealth.activeUsers}</p>
            <p className="text-sm mt-1">Active Users</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">{mockSystemHealth.transactionsToday}</p>
            <p className="text-sm mt-1">Transactions</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">{mockSystemHealth.uptime}</p>
            <p className="text-sm mt-1">Uptime</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center">
            <p className="text-2xl font-bold">{mockSystemHealth.lastBackup}</p>
            <p className="text-sm mt-1">Last Backup</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => navigate("/admin/stores")}
            className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-700 font-semibold transition"
          >
            ➕ Add Store
          </button>
          <button 
            onClick={() => navigate("/admin/users")}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-semibold transition"
          >
            👤 Add Admin
          </button>
        </div>
      </div>
    </div>
  );
}
