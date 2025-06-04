import React, { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const dummyProducts = [
  {
    _id: "1",
    product_name: "Margherita Pizza",
    product_description: "Classic delight with 100% real mozzarella cheese",
    product_price: 500,
    product_images: [
      "https://vapetown.pk/wp-content/uploads/2024/07/Vaporesso-Gen-Max-Vape-Kit-220-Watts.webp",
    ],
  },
  {
    _id: "2",
    product_name: "Pepperoni Pizza",
    product_description: "Loaded with pepperoni and cheese",
    product_price: 700,
    product_images: [
      "https://versedvaper.com/wp-content/uploads/2023/06/VAPORESSO-LUXE-XR-MAX-Best-Pod-Vapes-400x400-1.webp",
    ],
  },
  {
    _id: "3",
    product_name: "Veggie Supreme",
    product_description: "Topped with fresh veggies and cheese",
    product_price: 650,
    product_images: [
      "https://versedvaper.com/wp-content/uploads/2024/05/VOOPOO-Argus-G2-Best-Pod-Vape-400x400-1.webp",
    ],
  },
  {
    _id: "4",
    product_name: "Veggie Supreme",
    product_description: "Topped with fresh veggies and cheese",
    product_price: 650,
    product_images: [
      "https://www.vapezilla.com/cdn/shop/files/Vape-starter-kits_e234aecc-7336-489d-9a5f-78a106e8e9df.png?v=1729578875&width=500",
    ],
  },
  {
    _id: "5",
    product_name: "Veggie Supreme",
    product_description: "Topped with fresh veggies and cheese",
    product_price: 650,
    product_images: [
      "https://versedvaper.com/wp-content/uploads/2024/05/VOOPOO-Argus-G2-Best-Pod-Vape-400x400-1.webp",
    ],
  },
];

const dummyCart = [
  { product_id: "1", quantity: 2 },
  { product_id: "2", quantity: 1 },
];

const Carts = () => {
  const [cart, setCart] = useState(dummyCart);
  const [loadingItems, setLoadingItems] = useState({});

  const products = dummyProducts;

  const totalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateCost = () => {
    return cart.reduce((sum, item) => {
      const product = products.find((p) => p._id === item.product_id);
      return sum + (product ? product.product_price * item.quantity : 0);
    }, 0);
  };

  const removeItem = (productId) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }, 500);
  };

  const addItem = (productId) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setCart((prevCart) => {
        const exists = prevCart.find((item) => item.product_id === productId);
        if (exists) {
          return prevCart.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { product_id: productId, quantity: 1 }];
        }
      });
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center p-10">
        <img
          className="mx-auto w-14 mb-6"
          src="https://cheezious.com/_next/static/images/emptycart.e7858caa.svg"
          alt="Empty Cart"
        />
        <h6 className="font-extrabold text-2xl mb-2 text-white tracking-tight">
          Your Cart is Empty
        </h6>
        <p className="text-base font-medium text-gray-200">
          Explore our delicious pizzas to fill your cart!
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 overflow-y-auto space-y-6">
      <h3 className="font-extrabold text-2xl sm:text-4xl mb-6 text-white tracking-tight">
        Your Cart
        <span className="font-normal text-base sm:text-lg text-gray-200 ml-2">
          ({totalItems()} items)
        </span>
      </h3>

      {cart.map((item, index) => {
        const product = products.find((p) => p._id === item.product_id);

        return (
          <div
            key={index}
            className="flex  items-center gap-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 "
          >
            
            <img
              src={product?.product_images[0]}
              alt={product?.product_name || "Product"}
              loading="lazy"
              className="rounded-xl w-20 h-20 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="flex flex-col z-10">
              <h6 className="font-semibold text-xl text-white mb-1 tracking-tight">
                {product?.product_name}
              </h6>
              <p className="text-orange-400 font-bold text-xl">
                Rs. {product?.product_price}
              </p>
              <div className="flex items-center gap-4 bg-white/10 rounded-full px-4 py-2 z-10">
                <button
                  disabled={loadingItems[product?._id]}
                  onClick={() => removeItem(product._id)}
                  className={`p-2 rounded-full transition-colors duration-200 disabled:opacity-50 ${
                    item.quantity > 1
                      ? "bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white"
                      : "bg-red-700/10 hover:bg-red-700 text-red-700 hover:text-white"
                  }`}
                  aria-label="Remove item"
                >
                  {item.quantity > 1 ? (
                    <FaMinus size={12} />
                  ) : (
                    <FaTrash size={12} />
                  )}
                </button>

                <p className="m-0 min-w-[24px] quantity text-center text-white font-medium">
                  {loadingItems[product?._id] ? (
                    <svg
                      className="animate-spin h-5 w-5 text-orange-400 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    item.quantity
                  )}
                </p>

                <button
                  disabled={loadingItems[product?._id]}
                  onClick={() => addItem(product._id)}
                  className="p-2 rounded-full bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white transition-colors duration-200 disabled:opacity-50"
                  aria-label="Add item"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-8">
        <p className="text-2xl font-semibold text-white mb-4">
          Total: Rs. {calculateCost()}
        </p>
        <button
          onClick={() => alert(`Checkout - Total Rs. ${calculateCost()}`)}
          className="relative w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10">Proceed to Checkout</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default Carts;
