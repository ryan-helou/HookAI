import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  title?: string;
  showUsage?: boolean;
  usage?: {
    current: number;
    limit: number;
    percentage: number;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ title = 'HookAI', showUsage = false, usage }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>

          {/* Center - Usage Display */}
          {showUsage && usage && (
            <div className="hidden md:flex items-center gap-3">
              <div className="text-sm">
                <p className="font-semibold text-gray-700">
                  {usage.current} / {usage.limit} hooks
                </p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full transition-colors ${
                      usage.percentage >= 80
                        ? 'bg-red-500'
                        : usage.percentage >= 50
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, usage.percentage)}%` }}
                  />
                </div>
              </div>
              {usage.percentage >= 80 && (
                <button className="px-3 py-1 text-xs font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600">
                  Upgrade
                </button>
              )}
            </div>
          )}

          {/* Right - User Menu */}
          <div className="flex items-center gap-4">
            {user && <span className="text-sm text-gray-700">Hi, {user.name}!</span>}
            <button
              onClick={() => navigate('/settings')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ⚙️
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transition-shadow"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
