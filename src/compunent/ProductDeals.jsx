import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Lorem ipsum",
    oldPrice: "$0000",
    newPrice: "$0000",
    saveAmount: "$0000",
    discount: "50% OFF",
    image:
      "https://vapemall.pk/cdn/shop/products/geekvape-t200-kit-azure-blue.webp?v=1684255220", // Replace with actual image
  },
  // Repeat more products...
  {
    id: 2,
    name: "Lorem ipsum",
    oldPrice: "$0000",
    newPrice: "$0000",
    saveAmount: "$0000",
    discount: "50% OFF",
    image:
      "https://vapewholesaleeurope.com/cdn/shop/products/elux-3500-disposable-pod-0mg-mr-blue-box-of-10vapewholesaleeurope-679434.png?v=1667610845",
  },
  {
    id: 3,
    name: "Lorem ipsum",
    oldPrice: "$0000",
    newPrice: "$0000",
    saveAmount: "$0000",
    discount: "50% OFF",
    image:
      "https://www.vaporesso.com/hubfs/imgs/2024/product/list/GTX%20GO%2080-40@2x.png",
  },
  {
    id: 4,
    name: "Lorem ipsum",
    oldPrice: "$0000",
    newPrice: "$0000",
    saveAmount: "$0000",
    discount: "50% OFF",
    image:
      "https://vapemall.pk/cdn/shop/files/MoonlitSilver_247072a9-78f0-4a5c-9043-d75e03fef164.webp?v=1725696588",
  },
];

const AutoPlaySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-[90%] mt-7 md:max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white border-b-2 border-amber-500 inline-block pb-1">
          Grab the best deal on{" "}
          <span className="text-amber-500">E_Liquids</span>
        </h2>
        <Link to="/cart" className="text-amber-500 font-medium text-sm">
          View All →
        </Link>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <div className="bg-[#464646cd] text-white rounded-xl border shadow-sm relative overflow-hidden">
              {/* Discount Badge */}
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg z-10">
                {product.discount}
              </div>

              {/* Product Image */}
              <div className="p-4 flex items-center bg--300 justify-center h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain h-full"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 border-t">
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="line-through text-gray-500">
                    {product.oldPrice}
                  </span>
                  <span className="font-semibold text-black">
                    {product.newPrice}
                  </span>
                </div>
                <p className="text-amber-500 text-sm mt-1">
                  Save - {product.saveAmount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoPlaySlider;
