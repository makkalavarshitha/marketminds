import { useState } from "react";
import { mockNotifications } from "../data/adminMockData";

export default function AdminNotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showSendForm, setShowSendForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    targetAudience: "all",
    type: "info"
  });

  const handleSendNotification = () => {
    if (formData.title && formData.message) {
      const newNotification = {
        id: notifications.length + 1,
        title: formData.title,
        message: formData.message,
        type: formData.type,
        read: false
      };
      setNotifications([newNotification, ...notifications]);
      setFormData({ title: "", message: "", targetAudience: "all", type: "info" });
      setShowSendForm(false);
    }
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "critical": return "bg-red-100 text-red-800 border-red-300";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "success": return "bg-green-100 text-green-800 border-green-300";
      case "info": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case "critical": return "🔴";
      case "warning": return "🟠";
      case "success": return "✅";
      case "info": return "ℹ️";
      default: return "📌";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📬 Notification Center</h1>
          <p className="text-gray-600 mt-1">Send announcements and manage notifications</p>
        </div>
        <button
          onClick={() => setShowSendForm(!showSendForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <span>📢</span> Send Notification
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Total Notifications</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{notifications.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Unread</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{unreadCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Read</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{notifications.length - unreadCount}</p>
        </div>
      </div>

      {/* Send Notification Form */}
      {showSendForm && (
        <div className="bg-white p-6 rounded-xl shadow border border-indigo-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📢 Create New Notification</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
              <input
                type="text"
                placeholder="Notification title..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea
                placeholder="Notification message..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Target Audience</label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Users</option>
                  <option value="owners">Owners Only</option>
                  <option value="admins">Admins Only</option>
                  <option value="specific">Specific Stores</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="info">ℹ️ Information</option>
                  <option value="warning">🟠 Warning</option>
                  <option value="success">✅ Success</option>
                  <option value="critical">🔴 Critical</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSendNotification}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
              >
                📤 Send Notification
              </button>
              <button
                onClick={() => setShowSendForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Notifications</h3>
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-2 ${getTypeColor(notification.type)} ${
                  !notification.read ? "bg-opacity-100" : "bg-opacity-50"
                } transition`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTypeIcon(notification.type)}</span>
                      <p className="font-bold text-lg">{notification.title}</p>
                      {!notification.read && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-2">{notification.message}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleToggleRead(notification.id)}
                    className="px-3 py-1 bg-white/60 hover:bg-white text-xs font-semibold rounded transition"
                  >
                    {notification.read ? "Mark as Unread" : "Mark as Read"}
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="px-3 py-1 bg-white/60 hover:bg-white text-xs font-semibold rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No notifications yet</p>
        )}
      </div>

      {/* Notification Templates */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Quick Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setFormData({
              title: "System Maintenance",
              message: "System maintenance scheduled. Please plan accordingly.",
              targetAudience: "all",
              type: "warning"
            })}
            className="p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
          >
            <p className="font-bold text-gray-900">🔧 Maintenance Alert</p>
            <p className="text-xs text-gray-600 mt-1">Notify about maintenance</p>
          </button>
          <button
            onClick={() => setFormData({
              title: "Feature Update",
              message: "New features are now available! Check them out.",
              targetAudience: "all",
              type: "success"
            })}
            className="p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
          >
            <p className="font-bold text-gray-900">✨ Feature Update</p>
            <p className="text-xs text-gray-600 mt-1">Announce new features</p>
          </button>
          <button
            onClick={() => setFormData({
              title: "Critical Alert",
              message: "Critical security issue detected. Action required immediately.",
              targetAudience: "admins",
              type: "critical"
            })}
            className="p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
          >
            <p className="font-bold text-gray-900">🚨 Critical Alert</p>
            <p className="text-xs text-gray-600 mt-1">Send urgent alert</p>
          </button>
          <button
            onClick={() => setFormData({
              title: "Policy Update",
              message: "Our platform policies have been updated. Please review.",
              targetAudience: "all",
              type: "info"
            })}
            className="p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
          >
            <p className="font-bold text-gray-900">📖 Policy Update</p>
            <p className="text-xs text-gray-600 mt-1">Policy announcements</p>
          </button>
        </div>
      </div>
    </div>
  );
}
