import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formFields;

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    console.log("Login clicked", formFields);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://videos.pexels.com/video-files/9694447/9694447-sd_640_360_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {/* Login Card */}
      <div className="relative z-20 flex justify-center items-center h-full px-4">
        <div className="w-full max-w-lg bg-[#3d3a3a98] rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Login
          </h2>

          <form className="space-y-5">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-amber-500 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-white">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-amber-500 underline">
                Sign Up
              </Link>
            </p>

            <div className="flex items-center gap-4 my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex justify-center gap-5 text-xl ">
              <FaFacebook className="cursor-pointer text-blue-600" />
              <FaTwitter className="cursor-pointer text-sky-500" />
              <FaGithub className="cursor-pointer text-black" />
              <FaGoogle className="cursor-pointer text-red-600" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
