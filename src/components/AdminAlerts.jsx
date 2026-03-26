import { useState } from "react";
import { mockAlerts, mockStores, mockGlobalProducts } from "../data/adminMockData";

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [settings, setSettings] = useState({
    lowStock: 5,
    expiryDays: 3,
    inactiveDays: 7,
    email: "admin@marketmind.com"
  });
  // Calculate alert counts
  const lowStockStores = mockStores.filter(s => 
    mockGlobalProducts.filter(p => p.store === s.name && p.status === "Low Stock").length > 0
  ).length;

  const inactiveStores = mockStores.filter(s => {
    const daysSinceActive = Math.floor((new Date() - new Date(s.lastActive)) / (1000 * 60 * 60 * 24));
    return daysSinceActive >= 2;
  }).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">🚨 Alerts & Monitoring</h1>
        <p className="mt-2 text-white/90">Real-time system alerts and critical notifications</p>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Critical Alerts</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {mockAlerts.filter(a => a.type === "critical").length}
              </h2>
            </div>
            <div className="text-4xl">🔴</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Warnings</p>
              <h2 className="text-3xl font-bold text-orange-600 mt-2">
                {mockAlerts.filter(a => a.type === "warning").length}
              </h2>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Info Alerts</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {mockAlerts.filter(a => a.type === "info").length}
              </h2>
            </div>
            <div className="text-4xl">ℹ️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Resolved</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {mockAlerts.filter(a => a.type === "success").length}
              </h2>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* System-wide Alerts */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🔔 Active System Alerts</h3>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const styles = {
              critical: "bg-red-50 border-red-300 text-red-900",
              warning: "bg-orange-50 border-orange-300 text-orange-900",
              info: "bg-blue-50 border-blue-300 text-blue-900",
              success: "bg-green-50 border-green-300 text-green-900",
            };

            const icons = {
              critical: "🔴",
              warning: "⚠️",
              info: "ℹ️",
              success: "✅",
            };

            return (
              <div key={alert.id} className={`p-5 rounded-lg border-2 ${styles[alert.type]}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-3xl">{icons[alert.type]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-lg">{alert.title}</h4>
                        <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-semibold uppercase">
                          {alert.type}
                        </span>
                      </div>
                      <p className="mt-2">{alert.message}</p>
                      <p className="text-sm mt-2 opacity-75">{alert.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSelectedAlert(alert);
                        setShowDetailsModal(true);
                      }}
                      className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg font-medium transition"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => {
                        setAlerts(alerts.filter(a => a.id !== alert.id));
                        alert('Alert resolved!');
                      }}
                      className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg font-medium transition"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Low Stock Monitoring */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
              📦
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Low Stock Alerts</h3>
              <p className="text-sm text-gray-600">{lowStockStores} stores affected</p>
            </div>
          </div>
          <div className="space-y-2">
            {mockGlobalProducts.filter(p => p.status === "Low Stock").slice(0, 5).map(product => (
              <div key={product.id} className="p-3 bg-yellow-50 rounded-lg">
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.store} • Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expiry Alerts */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
              ⏰
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Expiring Products</h3>
              <p className="text-sm text-gray-600">{mockGlobalProducts.filter(p => p.status === "Expiring Soon").length} items</p>
            </div>
          </div>
          <div className="space-y-2">
            {mockGlobalProducts.filter(p => p.status === "Expiring Soon").map(product => (
              <div key={product.id} className="p-3 bg-orange-50 rounded-lg">
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.store} • Expires: {product.expiry}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inactive Stores */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
              🏪
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Inactive Stores</h3>
              <p className="text-sm text-gray-600">{inactiveStores} stores inactive</p>
            </div>
          </div>
          <div className="space-y-2">
            {mockStores.filter(s => {
              const daysSinceActive = Math.floor((new Date() - new Date(s.lastActive)) / (1000 * 60 * 60 * 24));
              return daysSinceActive >= 2;
            }).map(store => (
              <div key={store.id} className="p-3 bg-red-50 rounded-lg">
                <p className="font-medium text-gray-900">{store.name}</p>
                <p className="text-sm text-gray-600">Last active: {store.lastActive}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Configuration */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚙️ Alert Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Low Stock Threshold
            </label>
            <input
              type="number"
              value={settings.lowStock}
              onChange={(e) => setSettings({...settings, lowStock: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Alert Days
            </label>
            <input
              type="number"
              value={settings.expiryDays}
              onChange={(e) => setSettings({...settings, expiryDays: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inactive Store Days
            </label>
            <input
              type="number"
              value={settings.inactiveDays}
              onChange={(e) => setSettings({...settings, inactiveDays: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button 
          onClick={() => alert('Alert settings saved successfully!')}
          className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        >
          Save Alert Settings
        </button>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold text-gray-900">Alert Details</h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Title</p>
                <p className="text-lg font-semibold text-gray-900">{selectedAlert.title}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Type</p>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold capitalize">
                  {selectedAlert.type}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Message</p>
                <p className="text-gray-700">{selectedAlert.message}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Time</p>
                <p className="text-gray-700">{selectedAlert.time}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setAlerts(alerts.filter(a => a.id !== selectedAlert.id));
                    setShowDetailsModal(false);
                    alert('Alert resolved!');
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                >
                  Resolve Alert
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
