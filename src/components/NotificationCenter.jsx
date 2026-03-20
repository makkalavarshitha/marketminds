import { mockActivityLog } from "../data/adminMockData";

export default function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      title: "New Store Registered",
      message: "Urban Grocers has been successfully registered and activated",
      type: "success",
      time: "2 hours ago",
      priority: "Low",
    },
    {
      id: 2,
      title: "Critical Stock Alert",
      message: "Multiple stores have reported low stock levels in beverages category",
      type: "critical",
      time: "4 hours ago",
      priority: "High",
    },
    {
      id: 3,
      title: "Revenue Milestone",
      message: "Platform has crossed ₹5 Lakh in total revenue this month!",
      type: "info",
      time: "6 hours ago",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Scheduled Maintenance",
      message: "System maintenance scheduled for tonight at 2:00 AM - 3:00 AM",
      type: "warning",
      time: "8 hours ago",
      priority: "Medium",
    },
    {
      id: 5,
      title: "New User Added",
      message: "Priya Sharma has been added as Manager at Fresh Mart",
      type: "info",
      time: "1 day ago",
      priority: "Low",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Platform Update v2.0",
      content: "We've released a major update with new analytics features, improved UI, and better performance.",
      date: "March 18, 2024",
      author: "Admin Team",
    },
    {
      id: 2,
      title: "New Feature: AI Insights",
      content: "Introducing AI-powered insights to help you make better business decisions based on your data patterns.",
      date: "March 15, 2024",
      author: "Product Team",
    },
    {
      id: 3,
      title: "Security Enhancement",
      content: "Enhanced security protocols implemented. All users are advised to enable two-factor authentication.",
      date: "March 12, 2024",
      author: "Security Team",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">🔔 Notification Center</h1>
        <p className="mt-2 text-white/90">Manage notifications and system-wide announcements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Total Notifications</p>
          <h2 className="text-3xl font-bold text-indigo-600 mt-2">{notifications.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">High Priority</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {notifications.filter(n => n.priority === "High").length}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Active Announcements</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">{announcements.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 font-medium">Unread</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">3</h2>
        </div>
      </div>

      {/* Send Notification */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">📢 Send New Announcement</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Announcement Title</label>
            <input
              type="text"
              placeholder="e.g., Platform Maintenance Notice"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
            <textarea
              rows={4}
              placeholder="Write your announcement message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500">
                <option>Info</option>
                <option>Success</option>
                <option>Warning</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500">
                <option>All Users</option>
                <option>Store Owners</option>
                <option>Managers</option>
                <option>Staff</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition">
              Send Announcement
            </button>
            <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition">
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">🔔 Recent Notifications</h3>
        <div className="space-y-3">
          {notifications.map((notif) => {
            const typeStyles = {
              success: "bg-green-50 border-green-300 text-green-900",
              critical: "bg-red-50 border-red-300 text-red-900",
              info: "bg-blue-50 border-blue-300 text-blue-900",
              warning: "bg-orange-50 border-orange-300 text-orange-900",
            };

            const typeIcons = {
              success: "✅",
              critical: "🔴",
              info: "ℹ️",
              warning: "⚠️",
            };

            const priorityColors = {
              High: "bg-red-100 text-red-800",
              Medium: "bg-orange-100 text-orange-800",
              Low: "bg-green-100 text-green-800",
            };

            return (
              <div key={notif.id} className={`p-5 rounded-lg border-2 ${typeStyles[notif.type]}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-3xl">{typeIcons[notif.type]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-bold text-lg">{notif.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[notif.priority]}`}>
                          {notif.priority} Priority
                        </span>
                      </div>
                      <p className="mt-2">{notif.message}</p>
                      <p className="text-sm mt-2 opacity-75">{notif.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium transition">
                      Mark Read
                    </button>
                    <button className="px-3 py-1 bg-white hover:bg-gray-100 rounded-lg text-sm font-medium transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Announcements */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">📰 Platform Announcements</h3>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-xl font-bold text-purple-900">{announcement.title}</h4>
                    <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-semibold">
                      NEW
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                    <span>📅 {announcement.date}</span>
                    <span>•</span>
                    <span>👤 {announcement.author}</span>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">📋 Recent Activity</h3>
        <div className="space-y-4">
          {mockActivityLog.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div className="w-3 h-3 bg-indigo-600 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                {activity.user}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">⚙️ Notification Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Email Notifications</h4>
            {[
              "New store registration",
              "Critical system alerts",
              "Low stock warnings",
              "Revenue milestones",
            ].map((setting, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-pink-600 rounded focus:ring-2 focus:ring-pink-500" />
                <span className="text-gray-700">{setting}</span>
              </label>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">In-App Notifications</h4>
            {[
              "User activity updates",
              "Product expiry alerts",
              "Performance reports",
              "System maintenance",
            ].map((setting, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-pink-600 rounded focus:ring-2 focus:ring-pink-500" />
                <span className="text-gray-700">{setting}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition">
          Save Notification Preferences
        </button>
      </div>
    </div>
  );
}
