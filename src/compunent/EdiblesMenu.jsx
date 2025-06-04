import React, { useState } from "react";
import { PulseLoader } from "react-spinners";

const dummyProducts = [
  {
    _id: "1",
    product_name: "Margherita Pizza",
    product_description: "Classic delight with 100% real mozzarella cheese",
    product_price: 500,
    product_images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMm1t9LBc23SogzzNqPTY8mr7y3xt-GXoloA&s",
    ],
    rating: 4.5,
  },
  {
    _id: "2",
    product_name: "Pepperoni Pizza",
    product_description: "Loaded with pepperoni and cheese",
    product_price: 700,
    product_images: [
      "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/eating-weed-1296x728-feature.jpg?w=1155&h=1528",
    ],
    rating: 4.8,
  },
  {
    _id: "3",
    product_name: "Veggie Supreme",
    product_description: "Topped with fresh veggies and cheese",
    product_price: 650,
    product_images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOMhOxHMQ-6RTPAmjpCRMuLHPieD6tiKGX6A&s",
    ],
    rating: 4.2,
  },
  {
    _id: "4",
    product_name: "Veggie Supreme",
    product_description: "Topped with fresh veggies and cheese",
    product_price: 650,
    product_images: [
      "https://mooselabs.us/cdn/shop/articles/Smoking_Vs_Edibles.jpg?v=1649737746",
    ],
    rating: 4.3,
  },
  {
    _id: "5",
    product_name: "Veggie Supreme",
    product_description: "Topped with fresh veggies and cheese",
    product_price: 650,
    product_images: [
      "https://media.self.com/photos/60a67773179a492b4b0c738c/4:3/w_2560%2Cc_limit/AdobeStock_279478727.jpeg",
    ],
    rating: 4.0,
  },
];

const EdiblesMenu = () => {
  const [loadingItems, setLoadingItems] = useState({});

  const handleAddToCart = (id) => {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
      alert("Added to cart!");
    }, 1000);
  };

  return (
    <div className="">
      {dummyProducts.length === 0 ? (
        <h2 className="text-center text-gray-300 text-2xl font-medium">
          No Products Available
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {dummyProducts.map((item) => (
            <div
              key={item._id}
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <img
                src={item.product_images[0]}
                alt={item.product_name}
                loading="lazy"
                className="h-56 w-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              />
              <div className="flex-grow flex flex-col justify-between z-10">
                <div>
                  <h6 className="font-semibold text-2xl text-white mb-3 tracking-tight">
                    {item.product_name}
                  </h6>
                  <p className="text-base text-gray-200 leading-relaxed">
                    {item.product_description}
                  </p>
                  <div className="flex gap-1 text-yellow-400 mt-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(item.rating)
                            ? "fill-current"
                            : i < Math.ceil(item.rating) &&
                              item.rating % 1 >= 0.5
                            ? "fill-current text-yellow-400/50"
                            : "fill-none stroke-current"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="text-gray-200 text-sm ml-2">
                      ({item.rating})
                    </span>
                  </div>
                  <span className="text-orange-400 font-bold text-xl">
                    Rs. {item.product_price}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    disabled={loadingItems[item._id]}
                    className={`relative text-white rounded-xl px-8 py-2 mt-3 font-semibold transition-all duration-300 w-36 text-center overflow-hidden ${
                      loadingItems[item._id]
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-amber-500 hover:bg-amber-600 hover:scale-110"
                    }`}
                  >
                    {loadingItems[item._id] ? (
                      <PulseLoader size={10} color="white" />
                    ) : (
                      <span className="relative z-10">Add Cart</span>
                    )}
                    {!loadingItems[item._id] && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EdiblesMenu;
