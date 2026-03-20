import { useState } from "react";
import { mockGlobalProducts } from "../data/adminMockData";

export default function AdminGlobalProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const getStatusColor = (status) => {
    switch(status) {
      case "Good":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Expiring Soon":
        return "bg-orange-100 text-orange-800 border border-orange-300";
      case "Out of Stock":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Good": return "✅";
      case "Low Stock": return "⚠️";
      case "Expiring Soon": return "⏰";
      case "Out of Stock": return "❌";
      default: return "📌";
    }
  };

  const filteredProducts = mockGlobalProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "stock" || sortBy === "sales") return b[sortBy] - a[sortBy];
    if (sortBy === "expiry") return new Date(a.expiry) - new Date(b.expiry);
    return a.name.localeCompare(b.name);
  });

  const criticalProducts = mockGlobalProducts.filter(p => 
    p.status === "Low Stock" || p.status === "Out of Stock" || p.status === "Expiring Soon"
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📦 Global Products</h1>
          <p className="text-gray-600 mt-1">View products across all stores</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-3xl font-bold text-indigo-600">{mockGlobalProducts.length}</p>
        </div>
      </div>

      {/* Critical Items Alert */}
      {criticalProducts.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <span className="text-4xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-red-900">Critical Items Alert</h3>
              <p className="text-red-800 mt-1">
                <span className="font-bold">{criticalProducts.length}</span> products need attention:
                <span className="ml-2">
                  {criticalProducts.filter(p => p.status === "Low Stock").length} low stock,
                  {criticalProducts.filter(p => p.status === "Out of Stock").length} out of stock,
                  {criticalProducts.filter(p => p.status === "Expiring Soon").length} expiring soon
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Search Products</label>
            <input
              type="text"
              placeholder="Search by product or store..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="All">All Products</option>
              <option value="Good">✅ Good Stock</option>
              <option value="Low Stock">⚠️ Low Stock</option>
              <option value="Expiring Soon">⏰ Expiring Soon</option>
              <option value="Out of Stock">❌ Out of Stock</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="name">Product Name</option>
              <option value="stock">Stock Level</option>
              <option value="sales">Sales</option>
              <option value="expiry">Expiry Date</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing <span className="font-bold">{filteredProducts.length}</span> of <span className="font-bold">{mockGlobalProducts.length}</span> products
        </p>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Store</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expiry Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{product.store}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${
                            product.stock > 50 ? "bg-green-500" : product.stock > 10 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(product.stock / 100 * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 w-10">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{product.expiry}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                      {getStatusIcon(product.status)} {product.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{product.sales}</p>
                  </td>
                </tr>
              ))}
              {sortedProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-gray-500 font-medium">No products found</p>
                    <p className="text-gray-400 text-sm mt-1">Try changing search, status, or sort options.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border-2 border-green-300 p-4 rounded-xl">
          <p className="text-sm text-green-700 font-semibold">✅ Good Stock</p>
          <p className="text-2xl font-bold text-green-900 mt-1">
            {mockGlobalProducts.filter(p => p.status === "Good").length}
          </p>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-xl">
          <p className="text-sm text-yellow-700 font-semibold">⚠️ Low Stock</p>
          <p className="text-2xl font-bold text-yellow-900 mt-1">
            {mockGlobalProducts.filter(p => p.status === "Low Stock").length}
          </p>
        </div>
        <div className="bg-orange-50 border-2 border-orange-300 p-4 rounded-xl">
          <p className="text-sm text-orange-700 font-semibold">⏰ Expiring Soon</p>
          <p className="text-2xl font-bold text-orange-900 mt-1">
            {mockGlobalProducts.filter(p => p.status === "Expiring Soon").length}
          </p>
        </div>
        <div className="bg-red-50 border-2 border-red-300 p-4 rounded-xl">
          <p className="text-sm text-red-700 font-semibold">❌ Out of Stock</p>
          <p className="text-2xl font-bold text-red-900 mt-1">
            {mockGlobalProducts.filter(p => p.status === "Out of Stock").length}
          </p>
        </div>
      </div>
    </div>
  );
}
