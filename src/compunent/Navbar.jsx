import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci";
import { RiDiscountPercentLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/users/userSlice";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ For navigation after logout
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user from Redux state

  const menuItems = [
    { label: "View all", path: "/cart" },
    { label: "Kratom", path: "/Kratom" },
    { label: "Disposables", path: "/Disposables" },
    { label: "E-LIQUIDS", path: "/eliquids" },
    { label: "Devices", path: "/Devices" },
    { label: "Whip cream canister gas", path: "/Whip-gas" },
    { label: "Delta", path: "/delta" },
    { label: "ACCESSORIES", path: "/accessories" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser()); // Clear Redux state
    localStorage.removeItem("myUser"); // Optional: Clear saved user
    toast.success("Logged out successfully!"); // Show toast
    navigate("/"); // ✅ Redirect to login page
  };

  return (
    <>
      <div className="sticky top-0 z-20 shadow">
        {/* Top Header */}
        <header className="bg-gray-100 text-gray-700 py-2 px-4 hidden md:flex justify-between md:justify-around items-center">
          <div className="text-gray-00 md:-ml-20">
            Welcome To Cloud And Roots
          </div>
          <div className=" flex gap-5 md:-mr-20">
            <a
              href="#"
              className="text-gray-00 flex items-center gap-2 text-sm hover:underline"
            >
              <CiLocationOn size={17} className="text-blue-500" />
              Deliver to{" "}
              <span className="text-gray-500 font-semibold">423651</span>
            </a>
            <div className="p-[0.8px] bg-gray-200"></div>
            <a
              href="#"
              className="text-gray500 flex items-center gap-2 hover:underline"
            >
              <CiDeliveryTruck size={17} className="text-blue-500" />
              Track your order
            </a>
            <div className="p-[0.8px] bg-gray-200"></div>
            <a
              href="#"
              className="text-gray500 flex items-center gap-2 hover:underline"
            >
              <RiDiscountPercentLine size={17} className="text-blue-500" />
              All Offers
            </a>
          </div>
        </header>

        {/* Main Nav */}
        <div className="flex flex-wrap bg-white items-center justify-between md:justify-around px-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/home"
            className="flex md:-mt-3 md:-ml-4 items-center gap-4"
          >
            <img
              src="/logos.png"
              alt="Logo"
              className="h-20 md:h-28 w-auto md:w-36 object-contain"
            />
          </Link>

          <div className="flex gap-10">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-md w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search more..."
                className="bg-transparent w-full md:w-96 px-2 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center whitespace-nowrap gap-4 text-black">
              {user ? (
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FaUser className="text-blue-600" />
                  <span className="hidden sm:inline text-gray-700">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium border p-2 rounded-xl shadow bg-gray-100 hover:bg-blue-500 hover:text-white"
                  >
                    <FaSignOutAlt className="text-blue-600 hover:text-white" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <FaUser className="text-blue-600" />
                  <span className="hidden sm:inline text-gray-600">
                    Sign In
                  </span>
                </Link>
              )}
              <div className="p-[0.8px] h-6 bg-gray-200"></div>

              <Link
                to="/payment"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FaShoppingCart className="text-blue-600" />
                <span className="hidden sm:inline text-gray-600">Cart</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-blue-500 text-2xl p-2"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:items-center md:justify-center gap-3 px-4 py-4 md:py-3 transition-all duration-300 bg-white`}
        >
          <Link
            to="/home"
            className={`${
              activeMenu === "/"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-black"
            } flex items-center gap-1 font-semibold px-4 py-2 rounded-full text-sm w-full md:w-auto hover:text-white hover:bg-blue-500 transition`}
            onClick={() => setActiveMenu("/")}
          >
            SHOP ALL
            <IoIosArrowDown size={18} />
          </Link>

          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setActiveMenu(item.path)}
              className={`${
                activeMenu === item.path
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } flex items-center gap-1 font-semibold px-4 py-2 rounded-full text-sm w-full md:w-auto hover:text-white hover:bg-blue-500 transition`}
            >
              {item.label}
              <IoIosArrowDown size={18} />
            </Link>
          ))}

          <div className="md:hidden font-semibold px-4 py-2 rounded-full text-sm w-full md:w-auto transition">
            <a
              href="#"
              className="text-gray-500 my-2 flex items-center gap-2 text-xl hover:underline"
            >
              <CiLocationOn size={20} className="text-blue-500" />
              Deliver to 423651
            </a>
            <a
              href="#"
              className="text-gray-500 my-2 flex items-center gap-2 text-xl hover:underline"
            >
              <CiDeliveryTruck size={20} className="text-blue-500" />
              Track your order
            </a>
            <a
              href="#"
              className="text-gray-500 my-2 flex items-center gap-2 text-xl hover:underline"
            >
              <RiDiscountPercentLine size={20} className="text-blue-500" />
              All Offers
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
