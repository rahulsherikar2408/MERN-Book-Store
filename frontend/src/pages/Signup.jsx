import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      enqueueSnackbar("Please fill all fields", {
        variant: "warning",
      });
      return;
    }

    if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "error",
      });
      return;
    }

    try {
      setLoading(true);
      await signup(name, email, password);
      enqueueSnackbar("Account created successfully", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Signup failed",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <Spinner />
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="mt-2 text-gray-500">
            Create an account to manage your books.
          </p>
          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sky-600 hover:text-sky-700 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </div>

  );
};

export default Signup;
