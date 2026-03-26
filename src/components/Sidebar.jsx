import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleLinkClick = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    if (onClose) onClose(); // Close sidebar on mobile after clicking
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed w-64 bg-gradient-to-b from-blue-800 to-indigo-900 min-h-screen text-white flex flex-col p-6 left-0 top-0 overflow-y-auto z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:flex`}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center text-lg font-bold">M</div>
            <div>
              <div className="font-bold text-lg">Marketmind</div>
              <div className="text-xs text-white/70">Inventory</div>
            </div>
          </div>

          {/* Close button for mobile sidebar */}
          <button
            onClick={onClose}
            className="md:hidden rounded-md bg-white/20 p-2 hover:bg-white/30 transition"
            aria-label="Close sidebar"
          >
            <span className="text-white text-xl">✕</span>
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("🏠 Dashboard - Welcome back!")}
              >
                <span className="text-xl">🏠</span> Dashboard
              </Link>
            </li>
            <li className="px-3 py-2 rounded-md bg-white/6">
              <Link
                to="/product-table"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("📦 Inventory - Manage your products!")}
              >
                <span className="text-xl">📦</span> Inventory
              </Link>
            </li>
            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/product-form"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("➕ Add Product - Let's add something new!")}
              >
                <span className="text-xl">➕</span> Add Product
              </Link>
            </li>

            {/* Sales Section */}
            <li className="pt-4 mt-4 border-t border-white/10 px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/sales"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("💼 Sales - Check your sales data!")}
              >
                <span className="text-lg">💼</span> Sales
              </Link>
            </li>

            {/* Billing Link */}
            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/billing"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("💳 Billing - Manage your bills!")}
              >
                <span className="text-xl">💳</span> Billing
              </Link>
            </li>

            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/store-profile"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("🏪 Store Profile - Update your store info!")}
              >
                <span className="text-xl">🏪</span> Store Profile
              </Link>
            </li>

            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/report-issue"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("🚨 Report Issue - Let us know if something's wrong!")}
              >
                <span className="text-xl">🚨</span> Report Issue
              </Link>
            </li>

            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/help"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("❓ Help - Need assistance?")}
              >
                <span className="text-xl">❓</span> Help
              </Link>
            </li>
            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/about"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("ℹ️ About Us - Learn more about Marketmind!")}
              >
                <span className="text-xl">ℹ️</span> About Us
              </Link>
            </li>
            <li className="px-3 py-2 rounded-md hover:bg-white/5">
              <Link
                to="/contact"
                className="flex items-center gap-3 text-sm font-semibold"
                onClick={() => handleLinkClick("📧 Contact - Get in touch with us!")}
              >
                <span className="text-xl">📧</span> Contact
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          {popupMessage}
        </div>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
