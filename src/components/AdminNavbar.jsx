export default function AdminNavbar({ onLogout }) {
  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-4">
            {/* Admin Info */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="font-semibold text-gray-900">Platform Admin</p>
                <p className="text-xs text-gray-500">System Controller</p>
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

    </>
  );
}
