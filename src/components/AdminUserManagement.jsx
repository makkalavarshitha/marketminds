import { useState } from "react";
import { mockUsers } from "../data/adminMockData";

export default function AdminUserManagement() {
  const [users] = useState(() => {
    const autoRegisteredUsers = JSON.parse(localStorage.getItem("marketmind-users") || "[]");
    const allUsers = [...mockUsers, ...autoRegisteredUsers];

    return Array.from(
      new Map(allUsers.map((user) => [user.email, user])).values()
    );
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    switch(role) {
      case "Owner":
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold border border-blue-300">👤 Owner</span>;
      case "Admin":
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold border border-purple-300">👑 Admin</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    return status === "Active"
      ? <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">✓ Active</span>
      : <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">✕ Inactive</span>;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users and permissions</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Total Users</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Active Users</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{users.filter(u => u.status === "Active").length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Owners</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{users.filter(u => u.role === "Owner").length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Admins</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{users.filter(u => u.role === "Admin").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Search Users</label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Filter by Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="All">All Roles</option>
              <option value="Owner">Owners</option>
              <option value="Admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Store</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{user.store}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{user.joined}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedUser(user)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className="text-gray-500 font-medium">No users found</p>
                    <p className="text-gray-400 text-sm mt-1">Try another search or role filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
              <button onClick={() => setSelectedUser(null)} className="text-2xl hover:opacity-80">✕</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-bold text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-bold">{getRoleBadge(selectedUser.role)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Store</p>
                  <p className="font-bold text-gray-900">{selectedUser.store}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-bold">{getStatusBadge(selectedUser.status)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Joined</p>
                  <p className="font-bold text-gray-900">{selectedUser.joined}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
              <button onClick={() => setSelectedUser(null)} className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
