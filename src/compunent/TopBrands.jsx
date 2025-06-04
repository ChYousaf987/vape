import React from "react";
import { Link } from "react-router-dom";

const TopBrands = () => {
  const brands = [
    {
      name: "Lorem Ipsum",
      image:
        "https://www.shopcoldturkey.ca/cdn/shop/articles/STLTH-VISION-DISPOSABLE---PEACH-BLUE-RAZZ-ICE_35760b7c-affb-489c-b4d2-6917bbc5c7a5.png?v=1745865622&width=1920",
      backgroundColor: "bg-gradient-to-r from-gray-800 to-gray-700",
      textColor: "text-white",
    },
    {
      name: "Dolor Sit",
      image:
        "https://www.vapezilla.com/cdn/shop/files/Vape-starter-kits_e234aecc-7336-489d-9a5f-78a106e8e9df.png?v=1729578875&width=500",
      backgroundColor: "bg-gradient-to-r from-yellow-100 to-yellow-200",
      textColor: "text-yellow-800",
    },
    {
      name: "Amet Vape",
      image:
        "https://www.exhalewell.com/nitropack_static/ndOpVjwnxtWqVWFLZlcDhgCBwjUlGsKG/assets/images/optimized/rev-cf301e9/www.exhalewell.com/wp-content/uploads/2022/07/Exhale-Disposable-mockups-PE-300x300.png",
      backgroundColor: "bg-gradient-to-r from-orange-100 to-orange-200",
      textColor: "text-orange-800",
    },
  ];

  return (
    <div className="md:w-[85%] mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white border-b-2 border-amber-500 inline-block pb-1">
          Top <span className="text-amber-500"> Vape Brands</span>
        </h2>
        <Link to="/cart"
          className="text-amber-500 text-sm sm:text-base font-medium hover:underline transition"
        >
          View All →
        </Link>
      </div>

      {/* Brand Cards */}
      <div className="flex overflow-x-auto gap-11 pb-6 mt-4 scrollbar-hide snap-x snap-mandatory">
        {brands.map((brand, index) => (
          <div
            key={index}
            className={` flex items-center w-80 sm:w-96 h-52 flex-shrink-0 rounded-xl snap-start overflow-hidden shadow mt-8 ${brand.backgroundColor} hover:scale-105 transition-transform duration-300 ease-in-out`}
          >
            {/* Glass Effect Overlay */}

            {/* Image */}
            <div className="relative z-10 w-1/2 flex bg- items-center justify-center h-full p-4">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Text Info */}
            <div className="relative z-10 w-1/2 h-full flex flex-col justify-center px-4">
              <h3 className={`text-lg font-semibold ${brand.textColor}`}>
                {brand.name}
              </h3>
              <p className={`mt-2 text-sm opacity-80 ${brand.textColor}`}>
                Explore the latest and best-selling products from this brand.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrands;
