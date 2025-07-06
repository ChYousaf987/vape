import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerMyUser, userReset } from "../features/users/userSlice";
import OTPModal from "./OTPModal";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoading, userError, userMessage, userSuccess } = useSelector(
    (state) => state.auth
  );

  const { username, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await dispatch(registerMyUser({ username, email, password }));
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
      dispatch(userReset());
    }
    if (userSuccess) {
      setShowOTPModal(true);
      toast.success("OTP sent to your email! Awaiting admin approval.");
    }
  }, [userError, userMessage, userSuccess, dispatch]);

  const handleOTPSubmit = () => {
    setShowOTPModal(false);
    dispatch(userReset());
    navigate("/");
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
    dispatch(userReset());
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gray-400 z-10"></div>
      <div className="relative z-20 flex justify-center items-center h-full px-4">
        <div className="w-full max-w-lg bg-gray-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Sign Up
          </h2>
          <form className="space-y-5" onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={userLoading}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {userLoading ? "Registering..." : "Register"}
            </button>
            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <OTPModal
        isOpen={showOTPModal}
        onClose={handleOTPClose}
        onSubmit={handleOTPSubmit}
      />
    </div>
  );
};

export default Signup;
