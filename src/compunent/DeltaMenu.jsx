import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart, fetchCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeltaMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { error: cartError } = useSelector((state) => state.cart);
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError, { toastId: "cart-error" });
    }
  }, [cartError]);

  const handleAddToCart = (item) => {
    if (!user) {
      toast.warn("Please log in to add items to cart", {
        toastId: "login-warning",
      });
      navigate("/login");
      return;
    }

    setLoadingItems((prev) => ({ ...prev, [item._id]: true }));

    dispatch(addToCart(item))
      .unwrap()
      .then(() => {
        toast.success(`${item.product_name} added to cart!`, {
          toastId: `cart-success-${item._id}`,
        });
        dispatch(fetchCart());
      })
      .catch((err) => {
        toast.error(err || "Failed to add to cart", {
          toastId: `cart-fail-${item._id}`,
        });
      })
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [item._id]: false }));
      });
  };

  // ✅ Change this category filter based on your actual product_catagory value
  const deltaOnly = products.filter((item) =>
    item.product_catagory?.some((cat) => cat.toLowerCase() === "delta")
  );

  return (
    <div>
      {loading ? (
        <div className="text-center py-10">
          <PulseLoader size={15} color="blue" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : deltaOnly.length === 0 ? (
        <h2 className="text-center text-gray-700 text-2xl font-medium">
          No Products Available
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {deltaOnly.map((item) => (
            <div
              key={item._id}
              className="relative bg-gray-100 rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              <img
                src={item.product_images[0]}
                alt={item.product_name}
                loading="lazy"
                className="h-56 w-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              />
              <div className="flex-grow flex flex-col justify-between z-10">
                <div>
                  <h6 className="font-semibold text-2xl text-gray-700 mb-3 tracking-tight">
                    {item.product_name}
                  </h6>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {item.product_description}
                  </p>
                  <div className="text-blue-600 font-bold text-xl mt-3">
                    Rs. {item.product_discounted_price}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={loadingItems[item._id]}
                    className={`relative text-white rounded-xl px-8 py-2 mt-3 font-semibold transition-all duration-300 w-36 text-center overflow-hidden ${
                      loadingItems[item._id]
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 hover:scale-110"
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

export default DeltaMenu;
