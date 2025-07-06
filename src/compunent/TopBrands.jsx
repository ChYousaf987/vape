import React from "react";
import { Link } from "react-router-dom";

const TopBrands = () => {
  const brands = [
    {
      name: "Lorem Ipsum",
      image:
        "https://www.shopcoldturkey.ca/cdn/shop/articles/STLTH-VISION-DISPOSABLE---PEACH-BLUE-RAZZ-ICE_35760b7c-affb-489c-b4d2-6917bbc5c7a5.png?v=1745865622&width=1920",
      backgroundColor: "bg-[#313131]",
      colors: "[#404040]",
      textColor: "text-white",
    },
    {
      name: "Dolor Sit",
      image:
        "https://www.vapezilla.com/cdn/shop/files/Vape-starter-kits_e234aecc-7336-489d-9a5f-78a106e8e9df.png?v=1729578875&width=500",
      backgroundColor: "bg-[#FFF3CC]",
      colors: "[#F6DE8D]",
      textColor: "text-yellow-800",
    },
    {
      name: "Amet Vape",
      image:
        "https://vape4change.ca/cdn/shop/files/PeachyMango.webp?v=1722604115",
      backgroundColor: "bg-[#FFECDF]",
      colors: "[#FCCEAE]",
      textColor: "text-orange-800",
    },
  ];

  return (
    <div className="md:w-[85%]  mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg md:text-2xl font-bold border-b-2 text-gray-500 border-blue-500 inline-block pb-1">
          Top <span className="text-blue-500"> Vape Brands</span>
        </h2>
        <Link
          to="/cart"
          className="text-blue-500 text-sm sm:text-base font-medium hover:underline transition"
        >
          View All →
        </Link>
      </div>

      {/* Brand Cards */}
      <div className="flex overflow-x-auto gap-5 md:gap-11 pb-6 mt-4 scrollbar-hide snap-x snap-mandatory">
        {brands.map((brand, index) => (
          <div
            key={index}
            className={`relative flex items-center w-80 sm:w-96 h-52 flex-shrink-0 rounded-xl snap-start overflow-hidden shadow mt-8 ${brand.backgroundColor} md:hover:scale-105 transition-transform duration-300 ease-in-out`}
          >
            <div
              className={`absolute -top-24 -right-20 w-64 borde h-64 bg-${brand.colors} rounded-full`}
            ></div>
            <div
              className="absolute -top-28 -right-24 w-72 h-72 rounded-full border"
              style={{ borderColor: brand.colors.replace(/[\[\]']/g, "") }}
            ></div>

            {/* Glass Effect Overlay */}

            {/* Text Info */}
            <div className="relative z-10 w-1/2 h-full flex flex-col justify-around px-4">
              <h3
                className={` font-semibold rounded-xl p-1 text-center bg-${brand.colors} ${brand.textColor}`}
              >
                {brand.name}
              </h3>
              <p className={`mt-2 text-sm opacity-80 ${brand.textColor}`}>
                Explore the latest and best-selling products from this brand.
              </p>
            </div>
            {/* Image */}
            <div className="relative z-10 w-1/2 flex items-center justify-center h-full p-4">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrands;
