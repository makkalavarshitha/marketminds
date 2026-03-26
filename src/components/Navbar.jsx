<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react';

export default function Navbar({ user, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  
  const notifications = [
    { id: 1, message: 'Low stock alert: Product ABC below 5 units', time: '10 mins ago', type: 'warning' },
    { id: 2, message: 'New sale recorded successfully', time: '1 hour ago', type: 'success' }
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

=======
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

 
>>>>>>> e2ccfdd70eb32b5946ab96414bbab3dbf114fac0
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16 gap-4">
<<<<<<< HEAD
          <div ref={notificationRef} className="relative">
            <button 
              type="button"
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 rounded-md hover:bg-gray-100"
            >
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setShowNotifications(false)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">
                            {notif.type === 'warning' ? '⚠️' : '✅'}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNotifications(false);
                    }}
                    className="w-full p-3 text-center text-sm text-blue-600 hover:text-blue-700 hover:bg-gray-50 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

=======
>>>>>>> e2ccfdd70eb32b5946ab96414bbab3dbf114fac0
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
<<<<<<< HEAD
=======
                  onClick={() => navigate("/report-issue")}
                  className="ml-2 text-sm text-orange-700 px-3 py-1 rounded bg-orange-50 hover:bg-orange-100"
                >
                  Report Issue
                </button>
                <button
>>>>>>> e2ccfdd70eb32b5946ab96414bbab3dbf114fac0
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
