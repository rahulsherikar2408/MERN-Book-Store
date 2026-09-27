import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

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
    <nav className="bg-sky-600 w-full text-white shadow-md fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-sky-100 transition"
          >
            📚 Book List
          </Link>

          {/* Right Side */}
          {user && (
            <div className="flex items-center gap-4">

              {/* User Name */}
              <div className="hidden sm:block text-right">
                <p className="text-xs text-sky-100">
                  Welcome
                </p>
                <p className="font-semibold">
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

        </div>
      </div>
    </nav>

  );
};

export default Navbar;