import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginMyUser, userReset } from "../features/users/userSlice";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoading, userError, userMessage, userSuccess, user } =
    useSelector((state) => state.auth);

  const { email, password } = formFields;

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await dispatch(loginMyUser({ email, password }));
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
      dispatch(userReset());
    }
    if (userSuccess && user && user.isApproved) {
      toast.success("Login successful!");
      dispatch(userReset());
      navigate("/home");
    }
  }, [userError, userMessage, userSuccess, user, dispatch, navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gray-400 z-10"></div>
      <div className="relative z-20 flex justify-center items-center h-full px-4">
        <div className="w-full max-w-lg bg-gray-200 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              type="submit"
              disabled={userLoading}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {userLoading ? "Logging in..." : "Sign In"}
            </button>
            <p className="text-center text-sm text-gray-700">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
