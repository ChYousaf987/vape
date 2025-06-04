import React from "react";
import { Link } from "react-router-dom";

const Essential = () => {
  const categories = [
    {
      name: "Lorem ipsum",
      image:
        "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
      title: "up to 50% off",
    },
    {
      name: "Lorem ipsum",
      image:
        "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
      title: "up to 50% off",
    },
    {
      name: "Lorem ipsum",
      image:
        "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
      title: "up to 50% off",
    },
    {
      name: "Lorem ipsum",
      image:
        "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
      title: "up to 50% off",
    },
    {
      name: "Lorem ipsum",
      image:
        "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
      title: "up to 50% off",
    },
    {
      name: "Lorem ipsum",
      image:
        "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
      title: "up to 50% off",
    },
  ];

  return (
    <div className="w-[90%] max-w-screen-xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white border-b-2 border-amber-500 inline-block pb-1">
          Shop From <span className="text-amber-500">Essentials</span>
        </h2>
        <Link to="/cart"
          className="text-amber-500 text-sm sm:text-base font-semibold hover:underline transition"
        >
          View All →
        </Link>
      </div>

      {/* Responsive Grid / Scrollable Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 overflow-x-auto sm:overflow-visible">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-transparent"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-3xl border-4 border-gradient-to-r from-sky-400 to-blue-500 bg-[#464646b3] p-1 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm font-medium text-white hover:text-amber-500 transition">
              {category.name}
            </p>
            <p className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-amber-500 transition">
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Essential;
