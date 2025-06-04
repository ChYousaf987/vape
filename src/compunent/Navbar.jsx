import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const menuItems = [
    { label: "View all", path: "/cart" },
    { label: "Edibles", path: "/Edibles" },
    { label: "Vape", path: "/vape" },
    { label: "E-LIQUIDS", path: "/eliquids" },
    { label: "Flower & Pre-Rolls", path: "/flower" },
    { label: "Exotic Snacks", path: "/snacks" },
    { label: "Delta", path: "/delta" },
    { label: "ACCESSORIES", path: "/accessories" },
  ];

  return (
    <div className="sticky top-0 z-20 bg-[#17171768] backdrop-blur-md border-b border-gray-800">
      <div className="flex flex-wrap items-center justify-between md:justify-around px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-20 md:h-28 w-auto md:w-36 object-contain"
          />
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-800/90 px-4 py-2 rounded-md w-full max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-amber-400"
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
            className="bg-transparent w-full px-2 outline-none text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-200">
          <Link
            to="/lognin"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <FaUser className="text-amber-400" />
            <span className="hidden sm:inline">Sign Up/Sign In</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <FaShoppingCart className="text-amber-400" />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-amber-500 text-2xl p-2"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col md:flex md:flex-row md:items-center md:justify-center gap-3 px-4 py-4 md:py-3 transition-all duration-300`}
      >
        {/* SHOP ALL */}
        <Link
          to="/"
          className={`${
            activeMenu === "/"
              ? "bg-amber-500 text-black"
              : "bg-gray-800 text-gray-200"
          } font-semibold px-4 py-2 rounded-full text-sm w-full md:w-auto hover:bg-amber-600 transition`}
          onClick={() => setActiveMenu("/")}
        >
          SHOP ALL
        </Link>

        {/* Other Menu Items */}
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => setActiveMenu(item.path)}
            className={`${
              activeMenu === item.path
                ? "bg-amber-500 text-black"
                : "bg-gray-800 text-gray-200"
            } font-semibold px-4 py-2 rounded-full text-sm w-full md:w-auto hover:bg-amber-600 transition`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
