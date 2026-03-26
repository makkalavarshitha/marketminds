import { useState } from "react";
import { mockStores } from "../data/adminMockData";

export default function AdminStoreManagement() {
  const [stores] = useState(() => {
    const autoRegisteredStores = JSON.parse(localStorage.getItem("marketmind-stores") || "[]");
    const allStores = [...mockStores, ...autoRegisteredStores];

    return Array.from(
      new Map(allStores.map((store) => [store.email, store])).values()
    );
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedStore, setSelectedStore] = useState(null);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortBy === "revenue") return b.revenue - a.revenue;
    if (sortBy === "products") return b.products - a.products;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏪 Store Management</h1>
          <p className="text-gray-600 mt-1">Manage all stores on the platform</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Box */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Search Stores</label>
            <input
              type="text"
              placeholder="Search by store name or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="name">Store Name</option>
              <option value="products">Products</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing <span className="font-bold">{filteredStores.length}</span> of <span className="font-bold">{stores.length}</span> stores
        </p>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Store Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Owner</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Products</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Active</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedStores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{store.name}</p>
                    <p className="text-xs text-gray-500">{store.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{store.owner}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{store.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{store.products}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-green-600">₹{store.revenue.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{store.lastActive}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedStore(store)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedStores.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-gray-500 font-medium">No stores found</p>
                    <p className="text-gray-400 text-sm mt-1">Try changing search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Store Details Modal */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedStore.name}</h2>
              <button onClick={() => setSelectedStore(null)} className="text-2xl hover:opacity-80">✕</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Owner Name</p>
                  <p className="font-bold text-gray-900">{selectedStore.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-bold text-gray-900">{selectedStore.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-bold text-gray-900">{selectedStore.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="font-bold text-gray-900">{selectedStore.products}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="font-bold text-green-600">₹{selectedStore.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Active</p>
                  <p className="font-bold text-gray-900">{selectedStore.lastActive}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
              <button onClick={() => setSelectedStore(null)} className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
