import { useState } from "react";
import { mockUsers } from "../data/adminMockData";

export default function UserManagement() {
  const [selectedRole, setSelectedRole] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = selectedRole === "All" 
    ? mockUsers 
    : mockUsers.filter(u => u.role === selectedRole);

  // Count users by role
  const roleCount = {
    All: mockUsers.length,
    Owner: mockUsers.filter(u => u.role === "Owner").length,
    Admin: mockUsers.filter(u => u.role === "Admin").length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">👥 User Management</h1>
        <p className="mt-2 text-white/90">Manage users, roles, and permissions across stores</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Total Users</p>
          <h2 className="text-3xl font-bold text-indigo-600 mt-2">{mockUsers.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Store Owners</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">{roleCount.Owner}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Platform Admins</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">{roleCount.Admin}</h2>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedRole("All")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedRole === "All"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              All ({roleCount.All})
            </button>
            <button
              onClick={() => setSelectedRole("Owner")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedRole === "Owner"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Owners ({roleCount.Owner})
            </button>
            <button
              onClick={() => setSelectedRole("Admin")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedRole === "Admin"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Admins ({roleCount.Admin})
            </button>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
          >
            + Add New User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Store</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Joined</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleColors = {
                  Owner: "bg-blue-100 text-blue-800",
                  Admin: "bg-purple-100 text-purple-800",
                };

                const statusColors = {
                  Active: "bg-green-100 text-green-800",
                  Inactive: "bg-gray-100 text-gray-800",
                  Suspended: "bg-red-100 text-red-800",
                };

                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.store}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{user.joined}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition">
                          View
                        </button>
                        <button className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition">
                          Edit Role
                        </button>
                        <button className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition">
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">👨‍💼</div>
          <h3 className="text-xl font-bold mb-2">Store Owners</h3>
          <p className="text-white/90 mb-4">Full control over their store. Can manage inventory, sales, and all store operations.</p>
          <div className="text-2xl font-bold">{roleCount.Owner} Users</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-bold mb-2">Platform Admins</h3>
          <p className="text-white/90 mb-4">System administrators with full platform access and control over all stores.</p>
          <div className="text-2xl font-bold">{roleCount.Admin} Users</div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold text-gray-900">Add New User</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("User added successfully! (Demo mode)"); setShowAddModal(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g., john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Role</option>
                  <option value="Owner">Store Owner</option>
                  <option value="Admin">Platform Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store (for Owners)</label>
                <input
                  type="text"
                  placeholder="e.g., Fresh Mart"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
                >
                  Add User
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
