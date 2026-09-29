import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <Spinner />
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800">
            Login
          </h1>
          <p className="mt-2 text-gray-500">
            Login to manage your books.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-lg
                  outline-none
                  transition
                  focus:border-sky-500
                  focus:ring-2
                  focus:ring-sky-100
                "
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    px-4
                    py-3
                    pr-12
                    border
                    border-gray-300
                    rounded-lg
                    outline-none
                    transition
                    focus:border-sky-500
                    focus:ring-2
                    focus:ring-sky-100
                  "
                  placeholder="Enter your password"
                  required
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-sky-600
                    transition-colors
                    duration-200
                    cursor-pointer
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-xl" />
                  ) : (
                    <AiOutlineEye className="text-xl" />
                  )}
                </button>

              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full
                bg-sky-500
                hover:bg-sky-600
                active:bg-sky-700
                text-white
                font-semibold
                py-3
                rounded-lg
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
                cursor-pointer
              "
            >
              Login
            </button>

          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sky-600 hover:text-sky-700 font-semibold"
            >
              Sign up
            </Link>
          </p>

        </div>
      )}
    </div>
  );
};

export default Login;