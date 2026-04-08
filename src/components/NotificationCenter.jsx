import { useState, useEffect } from 'react';
import { notificationsAPI } from '../utils/api';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readFilter, setReadFilter] = useState(null);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [readFilter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsAPI.getNotifications(100, 0, readFilter);
      setNotifications(response.data || []);
      setUnreadCount(response.meta?.unreadCount || 0);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.message || 'Failed to load notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await notificationsAPI.deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const getTypeStyles = (type) => {
    const styles = {
      product_added: { bg: 'bg-green-100', icon: '📦', color: 'text-green-700' },
      low_stock: { bg: 'bg-yellow-100', icon: '⚠️', color: 'text-yellow-700' },
      expiry_warning: { bg: 'bg-orange-100', icon: '🕐', color: 'text-orange-700' },
      sale_completed: { bg: 'bg-blue-100', icon: '✓', color: 'text-blue-700' },
      inventory_alert: { bg: 'bg-red-100', icon: '🚨', color: 'text-red-700' },
    };
    return styles[type] || { bg: 'bg-gray-100', icon: '•', color: 'text-gray-700' };
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-IN');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">🔔 Notifications</h1>
        <p className="mt-2 text-white/90">Stay updated with your inventory and sales alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Total Notifications</p>
          <h2 className="text-3xl font-bold text-indigo-600 mt-2">{notifications.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-red-100">
          <p className="text-sm text-gray-500 font-medium">Unread</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">{unreadCount}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Read Notifications</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{notifications.length - unreadCount}</h2>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-sm"><strong>Error:</strong> {error}</p>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setReadFilter(null)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
              readFilter === null
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setReadFilter(false)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
              readFilter === false
                ? 'bg-red-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Unread Only
          </button>
          <button
            onClick={() => setReadFilter(true)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
              readFilter === true
                ? 'bg-green-600 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Read Only
          </button>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg font-semibold text-sm"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="bg-white px-6 py-5 rounded-xl shadow border border-gray-100 text-center">
            <p className="text-lg font-semibold text-gray-800">Loading Notifications...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && notifications.length === 0 && (
        <div className="flex items-center justify-center p-12">
          <div className="bg-white px-6 py-5 rounded-xl shadow border border-gray-100 text-center">
            <p className="text-lg font-semibold text-gray-800">No Notifications</p>
            <p className="text-sm text-gray-500 mt-1">You're all caught up! 🎉</p>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const typeStyle = getTypeStyles(notification.type);
          return (
            <div
              key={notification._id}
              className={`border-l-4 rounded-lg p-5 shadow transition ${
                notification.read
                  ? 'bg-white border-gray-200'
                  : 'bg-indigo-50 border-indigo-500'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`${typeStyle.bg} p-3 rounded-lg h-fit`}>
                    <span className="text-xl">{typeStyle.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {notification.title}
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                      {notification.message}
                    </p>
                    <div className="flex gap-4 mt-3">
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.createdAt)}
                      </span>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                        {notification.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="px-3 py-2 bg-indigo-100 text-indigo-700 text-xs font-semibold hover:bg-indigo-200 rounded transition"
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification._id)}
                    className="px-3 py-2 bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 rounded transition"
                    title="Delete"
                  >
                    ✕
                  </button>
                  {notification.actionUrl && (
                    <a
                      href={notification.actionUrl}
                      className="px-3 py-2 bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200 rounded transition"
                      title="Go to page"
                    >
                      →
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

