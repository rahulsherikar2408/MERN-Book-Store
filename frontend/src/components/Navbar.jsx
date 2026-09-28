import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      enqueueSnackbar("Logged out successfully", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Logout failed",
        {
          variant: "error",
        }
      );
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sky-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navbar Top */}
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl sm:text-2xl font-bold hover:text-sky-100 transition"
          >
            📚 Book List
          </Link>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center gap-4">

              {/* User Name */}
              <div className="text-right">
                <p className="text-xs text-sky-100">
                  Welcome
                </p>

                <p className="font-semibold max-w-48 truncate">
                  {user.name}
                </p>
              </div>

              {/* Add Book */}
              <Link
                to="/books/create"
                className="bg-white text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg font-semibold transition"
              >
                + Add Book
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="bg-sky-700 hover:bg-sky-800 disabled:bg-sky-400 px-4 py-2 rounded-lg font-semibold transition"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}

          {/* Hamburger Button */}
          {user && (
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-sky-700 transition focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                /* X Icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                /* Hamburger Icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {user && isMenuOpen && (
          <div className="md:hidden border-t border-sky-500 py-4">

            {/* User Information */}
            <div className="pb-4">
              <p className="text-xs text-sky-100">
                Welcome
              </p>

              <p className="font-semibold text-lg truncate">
                {user.name}
              </p>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-2">

              {/* Add Book */}
              <Link
                to="/books/create"
                onClick={() => setIsMenuOpen(false)}
                className="bg-white text-sky-600 hover:bg-sky-50 px-4 py-3 rounded-lg font-semibold transition text-center"
              >
                + Add Book
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                disabled={loggingOut}
                className="bg-sky-700 hover:bg-sky-800 disabled:bg-sky-400 px-4 py-3 rounded-lg font-semibold transition"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>

  );
};

export default Navbar;