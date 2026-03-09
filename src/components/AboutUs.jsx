export default function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6 space-y-6">
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900">ℹ️ About MarketMind</h1>
        <p className="text-gray-600 mt-2">
          MarketMind is a smart inventory and sales management platform designed for supermarket owners.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900">📌 Project Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            It helps store owners manage inventory, track expiry dates, monitor sales,
            and generate invoices in one centralized system.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900">⚠️ Problem Statement</h2>
          <ul className="text-gray-700 space-y-2 list-disc pl-5">
            <li>Stock shortages</li>
            <li>Expired products</li>
            <li>Poor sales tracking</li>
            <li>Inefficient billing</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900">✅ Our Solution</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-green-800 font-medium">Smart inventory tracking</div>
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-green-800 font-medium">Expiry alerts</div>
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-green-800 font-medium">Restock suggestions</div>
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-green-800 font-medium">Fast billing system</div>
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-green-800 font-medium">Sales analytics</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900">🌍 Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Our vision is to help small and medium supermarkets adopt digital tools to improve efficiency,
            reduce waste, and increase profitability.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900">⭐ Why Choose MarketMind</h2>
          <ul className="text-gray-700 space-y-2">
            <li><span className="font-semibold">Easy to Use:</span> Clean interface for staff and owners.</li>
            <li><span className="font-semibold">Faster Billing:</span> Reduce checkout time during rush hours.</li>
            <li><span className="font-semibold">Waste Reduction:</span> Expiry tracking helps avoid product loss.</li>
            <li><span className="font-semibold">Better Decisions:</span> Sales insights support smarter inventory planning.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
