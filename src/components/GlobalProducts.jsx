import { useState } from "react";
import { mockGlobalProducts } from "../data/adminMockData";

export default function GlobalProducts() {
  const [products] = useState(mockGlobalProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || product.category === filterCategory;
    const matchesStatus = filterStatus === "All" || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "Good": "bg-green-100 text-green-800",
      "Low Stock": "bg-yellow-100 text-yellow-800",
      "Out of Stock": "bg-red-100 text-red-800",
      "Expiring Soon": "bg-orange-100 text-orange-800",
    };
    return `px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-800"}`;
  };

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const statuses = ["All", ...new Set(products.map(p => p.status))];

  // Analytics
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.status === "Low Stock").length;
  const outOfStockCount = products.filter(p => p.status === "Out of Stock").length;
  const expiringCount = products.filter(p => p.status === "Expiring Soon").length;
  const topSelling = [...products].sort((a, b) => b.sales - a.sales).slice(0, 3);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">📦 Global Product Insights</h1>
        <p className="text-gray-600 mt-1">Monitor products across all stores</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-indigo-600">{totalProducts}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Expiring Soon</p>
          <p className="text-2xl font-bold text-orange-600">{expiringCount}</p>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">🔥 Top Selling Products (All Stores)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topSelling.map((product, index) => (
            <div key={product.id} className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm opacity-90">{product.sales} sold • {product.store}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products or stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Store</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Expiry Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Sales</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{product.store}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${product.stock === 0 ? 'text-red-600' : product.stock <= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">{product.expiry}</td>
                    <td className="px-6 py-4 text-gray-700">{product.sales}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(product.status)}>{product.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
