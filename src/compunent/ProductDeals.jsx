import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";

const AutoPlaySlider = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const eliquidProducts = products.filter((item) =>
    item.product_catagory?.some((cat) => cat.toLowerCase().includes("e-liquid"))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-gray-500 border-b-2 border-blue-500 inline-block pb-1">
          Grab the best deal on <span className="text-blue-500">E_Liquids</span>
        </h2>
        <Link
          to="/eliquids"
          className="text-blue-600 font-medium text-sm hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 sm:gap-8 pb-4 snap-x snap-mandatory scrollbar-hide">
        {loading ? (
          <p className="text-center w-full">Loading...</p>
        ) : eliquidProducts.length === 0 ? (
          <p className="text-center w-full">No E-Liquids found</p>
        ) : (
          eliquidProducts.map((product) => (
            <div key={product._id} className="snap-start min-w-[250px]">
              <div className="group bg-white rounded-2xl border shadow-md hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg z-10">
                  {product.product_discount || "10% OFF"}
                </div>

                <div className="p-4 h-48 flex items-center justify-center bg-gray-50">
                  <img
                    src={product.product_images[0]}
                    alt={product.product_name}
                    className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="px-5 py-4 border-t bg-white">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
                    {product.product_name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="line-through text-gray-400">
                      Rs. {product.product_price}
                    </span>
                    <span className="font-semibold text-black">
                      Rs. {product.product_discounted_price}
                    </span>
                  </div>
                  <p className="text-green-600 text-xs mt-1">
                    Save - Rs.{" "}
                    {product.product_price - product.product_discounted_price}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AutoPlaySlider;
