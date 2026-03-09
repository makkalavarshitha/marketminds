import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully. Our support team will contact you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6 space-y-6">
      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900">📞 Contact Us</h1>
        <p className="text-gray-600 mt-2">Reach our support team for product and billing assistance.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">✉️ Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              required
              rows={5}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold">
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">📌 Contact Information</h3>
            <p className="text-sm text-gray-700">Email: support@marketmind.com</p>
            <p className="text-sm text-gray-700">Phone: +91 XXXXX XXXXX</p>
            <p className="text-sm text-gray-700">Address: MarketMind Technologies, India</p>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">🕒 Support Hours</h3>
            <p className="text-sm text-gray-700">Monday – Friday</p>
            <p className="text-sm text-gray-700">9:00 AM – 6:00 PM</p>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">🔗 Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/product-table" className="text-blue-600 hover:text-blue-800 font-semibold">Go to Inventory</Link>
              <Link to="/sales" className="text-blue-600 hover:text-blue-800 font-semibold">View Sales</Link>
              <Link to="/billing" className="text-blue-600 hover:text-blue-800 font-semibold">Manage Billing</Link>
              <Link to="/help" className="text-blue-600 hover:text-blue-800 font-semibold">Help Center</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
