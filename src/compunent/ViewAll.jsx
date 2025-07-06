import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart, fetchCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAll = () => {
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
      toast.error(cartError);
    }
  }, [cartError]);

  const handleAddToCart = (item) => {
    if (!user) {
      toast.warn("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    setLoadingItems((prev) => ({ ...prev, [item._id]: true }));
    dispatch(addToCart(item))
      .unwrap()
      .then(() => {
        toast.success(`${item.product_name} added to cart!`);
        dispatch(fetchCart()); // Refresh cart
      })
      .catch((err) => {
        toast.error(err || "Failed to add to cart");
      })
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [item._id]: false }));
      });
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div className="text-center py-4">
          <PulseLoader size={15} color="blue" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <h3 className="text-center text-gray-600 text-2xl font-medium">
          No Products Available
        </h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={
                  item.product_images[0] || "https://via.placeholder.com/300"
                }
                alt={item.product_name}
                loading="lazy"
                className="h-48 w-full rounded-md object-cover mb-4"
              />
              <div className="flex flex-col">
                <h6 className="font-semibold text-lg text-gray-800 mb-2">
                  {item.product_name}
                </h6>
                <p className="text-sm text-gray-600 mb-2">
                  {item.product_description}
                </p>
                <span className="text-blue-600 font-bold text-lg mb-2">
                  ${item.product_discounted_price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={loadingItems[item._id]}
                  className={`w-full py-2 rounded-md text-white font-medium ${
                    loadingItems[item._id]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {loadingItems[item._id] ? (
                    <PulseLoader size={8} color="white" />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAll;
