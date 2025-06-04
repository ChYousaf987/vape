import React from "react";
import { Link } from "react-router-dom";

const TopCategories = () => {
  const categories = [
    {
      name: "Lorem ipsum",
      image:
        "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    },
    {
      name: "Dolor Sit",
      image: "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    },
    {
      name: "Amet Vape",
      image: "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    },
    {
      name: "Consectetur",
      image: "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    },
    {
      name: "Adipiscing",
      image: "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    },
    {
      name: "Elit Devices",
      image: "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    },
    {
      name: "Another Item",
      image: "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    },
  ];

  return (
    <div className="w-[95%] md:w-[85%] mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white border-b-2 border-amber-500 inline-block pb-1">
          Shop From <span className="text-amber-500">Top Categories</span>
        </h2>
        <Link to="/cart"
          className="text-amber-500 text-sm sm:text-base font-semibold hover:underline transition"
        >
          View All →
        </Link>
      </div>

      {/* Scrollable Categories */}
      <div className="flex overflow-x-auto md:overflow-hidden gap-6 sm:gap-10 pb-4 snap-x snap-mandatory scrollbar-hide">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center snap-start flex-shrink-0 w-24 sm:w-36"
          >
            <div className="w-24 h-24 mt-5 sm:w-36 sm:h-36 rounded-full border-4  bg-[#464646cd] p-1 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="mt-3 text-sm sm:text-base font-medium text-white hover:text-amber-500 transition">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
