export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-800 to-indigo-900 min-h-screen text-white hidden md:flex flex-col p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center text-lg font-bold">M</div>
        <div>
          <div className="font-bold text-lg">Marketmind</div>
          <div className="text-xs text-white/70">Inventory</div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <a href="#" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">🏠</span> Dashboard
            </a>
          </li>
          <li className="px-3 py-2 rounded-md bg-white/6">
            <a href="#" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">📦</span> Inventory
            </a>
          </li>
          <li className="px-3 py-2 rounded-md hover:bg-white/5">
            <a href="#" className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-xl">➕</span> Add Product
            </a>
          </li>

          {/* Sales Section */}
          <li className="pt-4 mt-4 border-t border-white/10">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white/90 mb-3 px-3">
              <span className="text-lg">💼</span> Sales
            </h3>
            <div className="space-y-2">
              <div className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition mx-3">
                <div className="text-xs text-white/70 mb-1">Today's Sales</div>
                <div className="text-lg font-bold text-green-300">₹0</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition mx-3">
                <div className="text-xs text-white/70 mb-1">This Month</div>
                <div className="text-lg font-bold text-blue-300">₹0</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition mx-3">
                <div className="text-xs text-white/70 mb-1">Best Seller</div>
                <div className="text-sm font-bold text-yellow-300">No data</div>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      {/* Sales Section */}
      <div className="mt-6 text-sm text-white/80">
        <div className="mb-2">Need help?</div>
        <button className="w-full bg-white/10 hover:bg-white/12 px-3 py-2 rounded-md text-left">Contact Support</button>
      </div>
    </aside>
  );
}
