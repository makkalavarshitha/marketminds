export default function PlatformSettings() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">⚙️ Platform Settings</h1>
        <p className="mt-2 text-white/90">Configure system-wide settings and preferences</p>
      </div>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">🏢 General Platform Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              defaultValue="MarketMind"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
            <input
              type="email"
              defaultValue="support@marketmind.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>Asia/Kolkata (IST)</option>
              <option>America/New_York (EST)</option>
              <option>Europe/London (GMT)</option>
              <option>Asia/Tokyo (JST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Currency & Tax Settings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">💰 Currency & Tax Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>₹ INR - Indian Rupee</option>
              <option>$ USD - US Dollar</option>
              <option>€ EUR - Euro</option>
              <option>£ GBP - British Pound</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Tax Rate (%)</label>
            <input
              type="number"
              defaultValue="18"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Label</label>
            <input
              type="text"
              defaultValue="GST"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Number Format</label>
            <input
              type="text"
              defaultValue="00XXXXX0000X0X0"
              placeholder="GST Number Format"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500" />
            <span className="text-gray-700 font-medium">Enable automatic tax calculation for all stores</span>
          </label>
        </div>
      </div>

      {/* Inventory Thresholds */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">📦 Inventory Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Warning</label>
            <input
              type="number"
              defaultValue="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">Alert when stock falls below this number</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Out of Stock</label>
            <input
              type="number"
              defaultValue="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <p className="text-xs text-gray-500 mt-1">Mark as out of stock at this level</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Alert (Days)</label>
            <input
              type="number"
              defaultValue="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            <p className="text-xs text-gray-500 mt-1">Days before expiry to show alert</p>
          </div>
        </div>
      </div>

      {/* Store Management Settings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">🏪 Store Management</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <div>
              <p className="font-semibold text-gray-900">Auto-approve new store registrations</p>
              <p className="text-sm text-gray-600 mt-1">New stores will be activated immediately without manual review</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <div>
              <p className="font-semibold text-gray-900">Require owner verification</p>
              <p className="text-sm text-gray-600 mt-1">Store owners must verify their email and phone number</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <div>
              <p className="font-semibold text-gray-900">Allow multi-store management</p>
              <p className="text-sm text-gray-600 mt-1">Single owner can manage multiple stores</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <div>
              <p className="font-semibold text-gray-900">Store inactivity auto-suspension</p>
              <p className="text-sm text-gray-600 mt-1">Suspend stores inactive for more than 30 days</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500" />
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">🔒 Security Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Minimum Length</label>
            <input
              type="number"
              defaultValue="8"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
            <input
              type="number"
              defaultValue="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Lockout Duration (minutes)</label>
            <input
              type="number"
              defaultValue="15"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-3 p-4 bg-red-50 rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500" />
            <span className="text-gray-700 font-medium">Enforce two-factor authentication for all admins</span>
          </label>

          <label className="flex items-center gap-3 p-4 bg-red-50 rounded-lg cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500" />
            <span className="text-gray-700 font-medium">Require password change every 90 days</span>
          </label>
        </div>
      </div>

      {/* Email Configuration */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">📧 Email Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
            <input
              type="text"
              defaultValue="smtp.marketmind.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
            <input
              type="number"
              defaultValue="587"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
            <input
              type="email"
              defaultValue="noreply@marketmind.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
            <input
              type="text"
              defaultValue="MarketMind Platform"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
          Test Email Configuration
        </button>
      </div>

      {/* Backup & Maintenance */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-5">🔄 Backup & Maintenance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
            <h4 className="font-bold text-green-900 text-lg mb-2">Automatic Backups</h4>
            <p className="text-sm text-green-700 mb-4">Last backup: Today at 3:00 AM</p>
            <select className="w-full px-4 py-2 border border-green-300 rounded-lg mb-3 focus:ring-2 focus:ring-green-500">
              <option>Daily at 3:00 AM</option>
              <option>Every 6 hours</option>
              <option>Every 12 hours</option>
              <option>Weekly</option>
            </select>
            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">
              Backup Now
            </button>
          </div>

          <div className="p-5 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg">
            <h4 className="font-bold text-orange-900 text-lg mb-2">Maintenance Mode</h4>
            <p className="text-sm text-orange-700 mb-4">Platform is currently accessible to all users</p>
            <label className="flex items-center gap-3 mb-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500" />
              <span className="text-gray-700 font-medium">Enable maintenance mode</span>
            </label>
            <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition">
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex gap-4">
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition shadow-lg">
          Save All Settings
        </button>
        <button className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
