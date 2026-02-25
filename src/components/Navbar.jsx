export default function Navbar({ user, onLogout }) {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16 gap-4">
          <button className="relative p-2 rounded-md hover:bg-gray-100">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
          </button>

          <div className="flex items-center gap-3">
            {user ? (
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
                  className="ml-2 text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
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
