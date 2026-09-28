import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      enqueueSnackbar("Login successful", {
        variant: "success"
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Login failed",
        {
          variant: "error"
        }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <Spinner />
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Login
          </h1>
          <p className="mt-2 text-gray-500">
            Login to manage your books.
          </p>
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-sky-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-sky-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sky-600 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      )}
    </div>

  );
}

export default Login