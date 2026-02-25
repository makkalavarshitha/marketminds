import { useState } from "react";

function ProductTable({ products, onDelete, onEdit, filterCategory, setFilterCategory, allProducts }) {
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];

  const getStatusBadge = (product) => {
    const today = new Date();
    const expiry = product.expiry ? new Date(product.expiry) : null;
    const daysUntilExpiry = expiry ? Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)) : null;

    if (expiry && daysUntilExpiry < 0) {
      return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Expired</span>;
    }

    if (expiry && daysUntilExpiry !== null && daysUntilExpiry <= 7) {
      return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">Expiring Soon</span>;
    }

    if (product.quantity === 0) {
      return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Out of Stock</span>;
    }

    if (product.quantity < 5) {
      return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Low Stock</span>;
    }

    return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">In Stock</span>;
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return <span className="text-red-600 font-bold">Out of Stock</span>;
    if (quantity < 5) return <span className="text-orange-600 font-bold">Low Stock</span>;
    return <span className="text-green-600 font-bold">In Stock</span>;
  };

  const formatCurrency = (val) => {
    const n = parseFloat(val) || 0;
    if (Number.isInteger(n)) return `₹${n}`;
    return `₹${n.toFixed(2)}`;
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "expiry":
        return new Date(a.expiry || "9999-12-31") - new Date(b.expiry || "9999-12-31");
      case "quantity":
        return a.quantity - b.quantity;
      case "price":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">📊 Inventory List</h2>
            <p className="text-gray-600 text-sm mt-1">
              {products.length} of {allProducts.length} products
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition"
          >
            {showFilters ? "✕ Hide Filters" : "⚙️ Filters"}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Product Name</option>
                  <option value="expiry">Expiry Date</option>
                  <option value="quantity">Stock Quantity</option>
                  <option value="price">Price</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <button
                  onClick={() => setFilterCategory("")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">📭 No products found</p>
            <p className="text-gray-400 text-sm mt-2">
              {filterCategory || (allProducts.length === 0)
                ? "Try adjusting your filters"
                : "Add your first product to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                  <tr className="bg-white">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Quantity</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Expiry Date</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
              <tbody>
                {sortedProducts.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200 hover:bg-blue-50 transition`}
                  >
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-2xl">{p.icon || '🥛'}</div>
                          <div>
                            <p className="font-semibold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.category}</p>
                          </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.category || "-"}</td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">
                        {formatCurrency(p.price)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div>
                          <p className="font-bold text-gray-900">{p.quantity}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">{getStatusBadge(p)}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        {p.expiry ? (
                          <div>
                            <p className="font-semibold text-gray-900">
                              {new Date(p.expiry).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onEdit(p)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold transition"
                        >
                          ✎ Edit
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTable;