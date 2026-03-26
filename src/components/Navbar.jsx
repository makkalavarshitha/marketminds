import { useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout, onMenuClick }) {
  const navigate = useNavigate();

 
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              aria-label="Open sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
              <div>
                <p className="text-lg font-bold text-gray-800">Marketmind</p>
                <p className="text-xs text-gray-500">Inventory</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user.name || user.email}</p>
                  <p className="text-xs text-gray-500">{user.role || 'Manager'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <button
                  onClick={onLogout}
                  className="ml-2 text-sm text-white px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Guest</p>
                <p className="text-xs text-gray-500">Sign in</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
