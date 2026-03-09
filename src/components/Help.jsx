import { Link } from "react-router-dom";

export default function Help() {
  const faqs = [
    {
      q: "Why is a product not visible in search?",
      a: "Check spelling, category filters, and confirm the product has stock greater than 0.",
    },
    {
      q: "How can I fix wrong stock quantity?",
      a: "Open Inventory, edit the item, update quantity, and save. Changes are reflected immediately.",
    },
    {
      q: "What should I do if billing is not calculating correctly?",
      a: "Verify product price, quantity, discount, and tax values. Then refresh and regenerate the invoice.",
    },
    {
      q: "How do I handle returned or refunded products?",
      a: "Open Billing, view the invoice, and use the Refund option to update invoice status to Refunded.",
    },
    {
      q: "Will my data be saved after closing the browser?",
      a: "Yes. MarketMind saves data in browser local storage for this device and browser profile.",
    },
  ];

  const features = [
    "Inventory Management",
    "Expiry Date Tracking",
    "Restock Suggestions",
    "Sales and Billing System",
    "Invoice Management",
    "Inventory Analytics",
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6 space-y-6">
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900">🆘 Help Center – MarketMind</h1>
        <p className="text-gray-600 mt-2">User guide and support center for daily store operations.</p>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Quick Start Guide</h2>
        <ol className="space-y-3 text-gray-700">
          <li><span className="font-semibold">Step 1: Add Products</span> — Go to Inventory → Add Product → Enter product details.</li>
          <li><span className="font-semibold">Step 2: Manage Stock</span> — Update stock levels from the Inventory page.</li>
          <li><span className="font-semibold">Step 3: Billing Customers</span> — Go to Sales → Add products → Generate bill.</li>
          <li><span className="font-semibold">Step 4: Track Revenue</span> — Check Billing for invoices and reports.</li>
        </ol>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">❓ Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-gray-900">Q: {f.q}</p>
              <p className="text-gray-700 mt-1">A: {f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">✨ System Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature) => (
            <div key={feature} className="bg-indigo-50 text-indigo-800 border border-indigo-100 rounded-lg px-4 py-3 font-medium">
              • {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Need help?</h3>
          <p className="text-white/90">Contact our support team for quick assistance.</p>
        </div>
        <Link to="/contact" className="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg font-semibold text-center">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
