import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/admin/stores", icon: "🏪", label: "Store Management" },
    { path: "/admin/products", icon: "📦", label: "Global Products" },
    { path: "/admin/analytics", icon: "📈", label: "Platform Analytics" },
    { path: "/admin/users", icon: "👥", label: "User Management" },
    { path: "/admin/reports", icon: "🚨", label: "Issue Reports" },
  ];

  return (
    <aside className="fixed w-64 bg-gradient-to-b from-indigo-900 to-purple-900 min-h-screen text-white hidden md:flex flex-col left-0 top-0 overflow-y-auto z-50 shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-lg font-bold shadow-lg">
            A
          </div>
          <div>
            <div className="font-bold text-lg">MarketMind</div>
            <div className="text-xs text-white/70">Admin Portal</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

    </aside>
  );
}
