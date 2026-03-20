import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { mockMonthlyRevenue, mockRevenueData, mockCategoryData, mockStoreGrowth } from "../data/adminMockData";

export default function AdminPlatformAnalytics() {
  const totalRevenue = mockMonthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
  const avgMonthlyRevenue = Math.round(totalRevenue / mockMonthlyRevenue.length);
  const maxRevenue = Math.max(...mockMonthlyRevenue.map(item => item.revenue));

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Platform Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive platform performance insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Total Revenue (6 months)</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">₹{(totalRevenue / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-green-600 mt-2">↗ +18% vs previous period</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Avg Monthly Revenue</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">₹{(avgMonthlyRevenue / 100000).toFixed(2)}L</p>
          <p className="text-xs text-gray-600 mt-2">Based on 6 months</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Peak Monthly Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-2">₹{(maxRevenue / 100000).toFixed(2)}L</p>
          <p className="text-xs text-gray-600 mt-2">June 2025</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Growth Rate</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">+97%</p>
          <p className="text-xs text-gray-600 mt-2">Jan to June 2025</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockMonthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
              <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Transactions */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💳 Weekly Transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockRevenueData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transactions" fill="#EC4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Categories & Store Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🏷️ Product Categories Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={mockCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {mockCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {mockCategoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                <span>{cat.name}: {cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Store Growth */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📶 Store Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockStoreGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="stores" stroke="#3B82F6" strokeWidth={3} dot={{ fill: "#3B82F6", r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Revenue Pattern */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📅 Daily Revenue Pattern</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockRevenueData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <Bar dataKey="revenue" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Key Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-900"><span className="font-bold">Growth Acceleration:</span> Revenue increased 97% from January to June</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900"><span className="font-bold">Store Expansion:</span> 30 new stores added in 6 months (20 → 50)</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-900"><span className="font-bold">Peak Day:</span> Saturday generates 30% more revenue than weekdays</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-900"><span className="font-bold">Top Category:</span> Fruits & Vegetables account for 55% of revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Trend Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-700">Avg Daily Revenue</p>
            <p className="text-2xl font-bold text-indigo-600 mt-2">₹{(mockRevenueData.reduce((sum, item) => sum + item.revenue, 0) / mockRevenueData.length / 100000).toFixed(2)}L</p>
            <p className="text-xs text-gray-600 mt-1">Weekly average</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Avg Transactions/Day</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {Math.round(mockRevenueData.reduce((sum, item) => sum + item.transactions, 0) / mockRevenueData.length)}
            </p>
            <p className="text-xs text-gray-600 mt-1">Weekly average</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Highest Sales Day</p>
            <p className="text-2xl font-bold text-green-600 mt-2">Saturday</p>
            <p className="text-xs text-gray-600 mt-1">₹89,000 (best performing)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
