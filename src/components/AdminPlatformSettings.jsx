import { useState } from "react";
import { mockPlatformSettings } from "../data/adminMockData";

export default function AdminPlatformSettings() {
  const [settings, setSettings] = useState(mockPlatformSettings);
  const [saveMessage, setSaveMessage] = useState("");

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: isNaN(value) ? value : parseInt(value)
    }));
  };

  const handleSave = () => {
    setSaveMessage("✅ Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">⚙️ Platform Settings</h1>
        <p className="text-gray-600 mt-1">Configure system-wide settings and preferences</p>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="bg-green-100 border-2 border-green-300 text-green-800 p-4 rounded-lg font-semibold">
          {saveMessage}
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Settings */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💰</span> Financial Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Tax Rate (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange("taxRate", e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-lg">%</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Current tax rate applied to all transactions</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
              <p className="text-xs text-gray-600 mt-1">Default currency for the platform</p>
            </div>
          </div>
        </div>

        {/* Inventory Settings */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📦</span> Inventory Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Low Stock Threshold</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleInputChange("lowStockThreshold", e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-lg">units</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Alert when stock falls below this value</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Expiry Alert Days</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.expiryAlertDays}
                  onChange={(e) => handleInputChange("expiryAlertDays", e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-lg">days</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Alert products expiring within this period</p>
            </div>
          </div>
        </div>

        {/* Store Settings */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🏪</span> Store Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Max Stores Per Owner</label>
              <input
                type="number"
                value={settings.maxStoresPerOwner}
                onChange={(e) => handleInputChange("maxStoresPerOwner", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-600 mt-1">Maximum stores a single owner can manage</p>
            </div>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💾</span> Backup Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackupEnabled}
                  onChange={(e) => handleInputChange("autoBackupEnabled", e.target.checked)}
                  className="w-5 h-5 accent-indigo-600"
                />
                <span className="font-semibold text-gray-900">Enable Automatic Backup</span>
              </label>
              <p className="text-xs text-gray-600 mt-1 ml-8">Automatically backup database</p>
            </div>

            {settings.autoBackupEnabled && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Backup Frequency</label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => handleInputChange("backupFrequency", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Hourly">Hourly</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔔</span> Notification Settings
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
            <span className="font-semibold text-gray-900">Email Alerts for Critical Issues</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
            <span className="font-semibold text-gray-900">Daily Summary Reports</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
            <span className="font-semibold text-gray-900">Low Stock Alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-indigo-600" />
            <span className="font-semibold text-gray-900">Expiry Date Warnings</span>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔐</span> Security Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-600 mt-1">Automatically logout users after inactivity</p>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
              <span className="font-semibold text-gray-900">Two-Factor Authentication (2FA)</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
              <span className="font-semibold text-gray-900">Log all admin activities</span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition shadow-lg"
        >
          💾 Save Settings
        </button>
      </div>

      {/* Settings Info */}
      <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-xl">
        <h4 className="font-bold text-blue-900 mb-2">ℹ️ Current Settings Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-blue-700 font-semibold">Tax Rate</p>
            <p className="text-blue-900 font-bold">{settings.taxRate}%</p>
          </div>
          <div>
            <p className="text-blue-700 font-semibold">Currency</p>
            <p className="text-blue-900 font-bold">{settings.currency}</p>
          </div>
          <div>
            <p className="text-blue-700 font-semibold">Low Stock Alert</p>
            <p className="text-blue-900 font-bold">{settings.lowStockThreshold} units</p>
          </div>
          <div>
            <p className="text-blue-700 font-semibold">Expiry Alert</p>
            <p className="text-blue-900 font-bold">{settings.expiryAlertDays} days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
