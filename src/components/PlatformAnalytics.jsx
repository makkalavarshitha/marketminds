import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { mockRevenueData, mockStoreGrowth, mockCategoryData, mockStores } from "../data/adminMockData";

export default function PlatformAnalytics() {
  const totalRevenue = mockStores.reduce((sum, s) => sum + s.revenue, 0);
  const avgRevenue = (totalRevenue / mockStores.length).toFixed(0);
  const monthlyGrowth = "+23%";
  
  // Extended revenue data for monthly view
  const monthlyRevenue = [
    { month: "Jan", revenue: 380000 },
    { month: "Feb", revenue: 425000 },
    { month: "Mar", revenue: 513000 },
  ];

  // Store performance comparison
  const storePerformance = mockStores.map(store => ({
    name: store.name.length > 10 ? store.name.substring(0, 10) + "..." : store.name,
    revenue: store.revenue,
    products: store.products,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">📈 Platform Analytics</h1>
        <p className="mt-2 text-white/90">Comprehensive insights and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Total Platform Revenue</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">₹{totalRevenue.toLocaleString('en-IN')}</h2>
          <p className="text-sm text-green-600 mt-1">{monthlyGrowth} this month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Average Store Revenue</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">₹{avgRevenue.toLocaleString('en-IN')}</h2>
          <p className="text-sm text-gray-600 mt-1">Per store</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Total Transactions</p>
          <h2 className="text-3xl font-bold text-indigo-600 mt-2">1,234</h2>
          <p className="text-sm text-indigo-600 mt-1">This week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Growth Rate</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">+23%</h2>
          <p className="text-sm text-gray-600 mt-1">Month over month</p>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly Revenue */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockRevenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Growth */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Bar dataKey="revenue" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Store Growth & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Store Growth */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Store Growth Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockStoreGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="stores" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900">
              📈 <span className="font-semibold">+150% growth</span> in the last 3 months
            </p>
          </div>
        </div>

        {/* Product Categories Distribution */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Product Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
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

      {/* Store Performance Comparison */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Store Revenue Comparison</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={storePerformance} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" stroke="#6B7280" />
            <YAxis dataKey="name" type="category" stroke="#6B7280" width={100} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
              formatter={(value, name) => name === "revenue" ? `₹${value.toLocaleString('en-IN')}` : value}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 8, 8, 0]} />
            <Bar dataKey="products" fill="#F59E0B" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="text-xl font-bold">Revenue Insight</h3>
          <p className="mt-2 text-white/90">Fresh Mart leads with ₹125K revenue this month</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-xl font-bold">Growth Pattern</h3>
          <p className="mt-2 text-white/90">Weekend sales are 40% higher than weekdays</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-xl font-bold">Category Trend</h3>
          <p className="mt-2 text-white/90">Fruits and Vegetables dominate at 55% share</p>
        </div>
      </div>
    </div>
  );
}
