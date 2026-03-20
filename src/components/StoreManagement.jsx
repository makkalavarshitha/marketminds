import { useState } from "react";
import { mockStores } from "../data/adminMockData";

export default function StoreManagement() {
  const [stores] = useState(mockStores);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          store.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || store.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Active: "bg-green-100 text-green-800",
      Suspended: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };
    return `px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">🏪 Store Management</h1>
        <p className="text-gray-600 mt-1">Manage all stores and owners across the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Stores</p>
          <p className="text-2xl font-bold text-indigo-600">{stores.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Active Stores</p>
          <p className="text-2xl font-bold text-green-600">{stores.filter(s => s.status === "Active").length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Suspended</p>
          <p className="text-2xl font-bold text-red-600">{stores.filter(s => s.status === "Suspended").length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <p className="text-sm text-gray-500">Pending Approval</p>
          <p className="text-2xl font-bold text-yellow-600">{stores.filter(s => s.status === "Pending").length}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search stores or owners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Active", "Suspended", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === status
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            + Add Store
          </button>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Store Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Owner</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Products</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Last Active</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <p className="text-lg font-medium">No stores found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStores.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{store.name}</div>
                      <div className="text-sm text-gray-500">{store.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{store.owner}</td>
                    <td className="px-6 py-4 text-gray-700">{store.location}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(store.status)}>{store.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{store.products}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">₹{store.revenue.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{store.lastActive}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-medium transition">
                          View
                        </button>
                        <button className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded font-medium transition">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium transition">
                          {store.status === "Suspended" ? "Enable" : "Disable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Store Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold text-gray-900">Add New Store</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Store added successfully! (Demo mode)"); setShowAddModal(false); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Fresh Mart"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ravi Kumar"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., ravi@freshmart.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., +91 9876543210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location/City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Mumbai"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending Approval</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Enter complete store address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input
                    type="text"
                    placeholder="e.g., 00XXXXX0000X0X0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input
                    type="text"
                    placeholder="Store license/registration"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                >
                  Add Store
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
