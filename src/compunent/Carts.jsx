import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from "../features/cart/cartSlice";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [loadingQty, setLoadingQty] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    } else {
      navigate("/login");
    }
  }, [dispatch, user, navigate]);

  const totalItems = () =>
    Array.isArray(cart)
      ? cart.reduce((total, item) => total + item.quantity, 0)
      : 0;

  const calculateCost = () =>
    Array.isArray(cart)
      ? cart.reduce(
          (sum, item) =>
            sum +
            (item.product_id?.product_discounted_price || 0) * item.quantity,
          0
        )
      : 0;

  const handleAddItem = (productId) => {
    setLoadingQty((prev) => ({ ...prev, [productId]: true }));
    dispatch(addToCart({ _id: productId }))
      .unwrap()
      .catch((err) => console.error("Add error", err))
      .finally(() =>
        setLoadingQty((prev) => ({ ...prev, [productId]: false }))
      );
  };

  const handleRemoveItem = (productId) => {
    setLoadingQty((prev) => ({ ...prev, [productId]: true }));
    dispatch(removeFromCart(productId))
      .unwrap()
      .catch((err) => console.error("Remove error", err))
      .finally(() =>
        setLoadingQty((prev) => ({ ...prev, [productId]: false }))
      );
  };

  if (loading && cart.length === 0) {
    // show only if full cart is being fetched
    return (
      <div className="text-center p-4">
        <PulseLoader size={15} color="blue" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="text-center p-4">
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

  return (
    <div className="p-4">
      <h3 className="font-bold text-2xl mb-4 text-gray-800">
        Your Cart
        <span className="font-normal text-lg text-gray-600 ml-2">
          ({totalItems()} items)
        </span>
      </h3>

      {cart.map((item) => {
        const productId = item.product_id?._id;
        return (
          <div
            key={productId}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <img
              src={
                item.product_id?.product_images?.[0] ||
                "https://via.placeholder.com/80"
              }
              alt={item.product_id?.product_name || "Product"}
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex-1">
              <h6 className="font-semibold text-lg text-gray-800">
                {item.product_id?.product_name || "Unknown Product"}
              </h6>
              <p className="text-blue-600 font-bold">
                Rs. {item.product_id?.product_discounted_price || 0}
              </p>

              <div className="flex items-center gap-2 mt-2">
                {/* Minus / Trash */}
                <button
                  onClick={() => handleRemoveItem(productId)}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                >
                  {item.quantity > 1 ? (
                    <FaMinus size={12} />
                  ) : (
                    <FaTrash size={12} />
                  )}
                </button>

                {/* Quantity / Loader */}
                <div className="w-8 text-center">
                  {loadingQty[productId] ? (
                    <PulseLoader size={6} color="blue" />
                  ) : (
                    <span className="text-md font-medium text-gray-800">
                      {item.quantity}
                    </span>
                  )}
                </div>

                {/* Plus */}
                <button
                  onClick={() => handleAddItem(productId)}
                  className="p-2 rounded-full bg-green-100 hover:bg-green-200"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-800 mb-2">
          Total: Rs. {calculateCost()}
        </p>
        <Link to="/payment">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Carts;
