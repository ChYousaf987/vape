// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice"; // Adjust the path as needed
import cartReducer from "../features/cart/cartSlice"; // Import cart reducer

export const store = configureStore({
  reducer: {
    auth: userReducer,
    products: productReducer, // Add product reducer
    cart: cartReducer, // Add cart reducer
  },
});
