import { Lock, LogIn, LogOut, ShoppingCart, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  const isAdmin = true;

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center"
          >
            E-Commerce
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-purple-500 transition-colors duration-200"
            >
              Home
            </Link>

            {/* Cart */}
            {user && (
              <Link
                to="/cart"
                className="relative flex items-center text-gray-300 hover:text-purple-500 transition-colors duration-200"
              >
                <ShoppingCart className="mr-1" size={20} />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </Link>
            )}

            {/* Admin Dashboard */}
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-gray-800 hover:bg-gray-700 text-purple-400 px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
              >
                <Lock className="mr-1.5" size={14} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {/* Auth Buttons */}
            {user ? (
              <button className="bg-gray-800 hover:bg-gray-700 text-red-400 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200">
                <LogOut className="mr-1.5" size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200"
                >
                  <UserPlus className="mr-1.5" size={16} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-800 hover:bg-gray-700 text-blue-400 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                >
                  <LogIn className="mr-1.5" size={16} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
