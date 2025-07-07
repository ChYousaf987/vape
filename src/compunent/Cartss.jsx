import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from "../features/cart/cartSlice";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cardss = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    console.log("Cart state:", { cart, loading, error });
    if (user) {
      dispatch(fetchCart());
    } else {
      navigate("/login");
    }
  }, [dispatch, user, navigate]);

  const totalItems = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotal = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce(
      (sum, item) =>
        sum + (item.product_id?.product_discounted_price || 0) * item.quantity,
      0
    );
  };

  const handleAddItem = (productId) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    dispatch(addToCart({ _id: productId }))
      .unwrap()
      .then(() => {
        dispatch(fetchCart());
      })
      .catch((err) => {
        console.error("handleAddItem error:", err);
      })
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [productId]: false }));
      });
  };

  const handleRemoveItem = (productId) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => {
        dispatch(fetchCart());
      })
      .catch((err) => {
        console.error("handleRemoveItem error:", err);
      })
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [productId]: false }));
      });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://213.199.41.219:3003/api/payment/checkout",
        {
          products: cart,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      window.location.assign(response.data.url);
    } catch (err) {
      console.error(
        "Payment error:",
        err.response?.data?.message || err.message
      );
      alert("Failed to initiate payment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4 bg-gray-100 min-h-screen">
        <PulseLoader size={15} color="blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-gray-100 min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-100 min-h-screen">
        <img
          className="mx-auto w-16 mb-4"
          src="https://cheezious.com/_next/static/images/emptycart.e7858caa.svg"
          alt="Empty Cart"
        />
        <h3 className="font-bold text-2xl mb-2 text-gray-800">
          Your Cart is Empty
        </h3>
        <p className="text-gray-600">Explore our products to fill your cart!</p>
      </div>
    );
  }

  console.log("Rendering cart items:", cart);

  return (
    <>
      <div className="bg-gray-100">
        <div className="w-[85%] mx-auto pt-8 flex flex-col lg:flex-row justify-between gap-6 p-4 min-h-screen">
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold mb-4">
              ← Cart{" "}
              <span className="text-xl font-medium">
                ({totalItems()} items)
              </span>
            </h2>
            <div className="bg-white p-4 rounded-xl space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product_id?._id || item._id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.product_id?.product_images?.[0] ||
                        "https://via.placeholder.com/80"
                      }
                      alt={item.product_id?.product_name || "Product"}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">
                        {item.product_id?.product_name || "Unknown Product"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.product_id?.product_description ||
                          "No description"}
                      </p>
                      <p className="text-red-500 font-bold mt-1">
                        Rs. {item.product_id?.product_discounted_price || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={loadingItems[item.product_id?._id]}
                      onClick={() => handleRemoveItem(item.product_id?._id)}
                      className="bg-red-100 text-red-600 rounded-full p-2"
                    >
                      <FaTrash size={12} />
                    </button>
                    <span className="font-medium">
                      {loadingItems[item.product_id?._id] ? (
                        <PulseLoader size={6} color="blue" />
                      ) : (
                        item.quantity
                      )}
                    </span>
                    <button
                      disabled={loadingItems[item.product_id?._id]}
                      onClick={() => handleAddItem(item.product_id?._id)}
                      className="bg-red-100 text-red-600 rounded-full p-2"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-bold mb-4">Total</h3>
              <p className="text-sm text-gray-600 mb-2">
                Estimated Delivery Time: <strong>45 Mins</strong>
              </p>
              {cart.map((item) => (
                <div
                  key={item.product_id?._id || item._id}
                  className="flex justify-between text-sm text-gray-800"
                >
                  <span>
                    {item.quantity} x{" "}
                    {item.product_id?.product_name || "Unknown Product"}
                  </span>
                  <span>
                    Rs. {item.product_id?.product_discounted_price || 0}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-800 mt-2">
                <span>Discount</span>
                <span>- Rs. 0</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                <span>Due Payment</span>
                <span>Rs. {calculateTotal()}</span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              >
                CONTINUE TO CHECKOUT
              </button>
              {/* <button
                onClick={() => alert("Chat functionality not implemented yet")}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
              >
                CHAT WITH SELLER
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cardss;
