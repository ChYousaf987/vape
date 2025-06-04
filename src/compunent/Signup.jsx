import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    console.log("Register clicked", formFields);
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
          src="https://videos.pexels.com/video-files/9694238/9694238-sd_640_360_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {/* Register Card */}
      <div className="relative z-20 flex justify-center items-center h-full px-4">
        <div className="w-full max-w-lg bg-[#3d3a3a98] rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Sign Up
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

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

            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              type="button"
              onClick={handleRegister}
              className="w-full bg-amber-500 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Register
            </button>

            <p className="text-center text-sm text-white">
              Already have an account?{" "}
              <Link to="/lognin" className="text-amber-500 underline">
                Sign In
              </Link>
            </p>

            <div className="flex items-center gap-4 my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex justify-center gap-5 text-xl">
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

export default Signup;
