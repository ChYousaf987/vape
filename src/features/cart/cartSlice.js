import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://213.199.41.219:3003/api/products";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.user?.token;
      if (!token) throw new Error("Not authenticated");

      const response = await axios.get(`${BASE_URL}/get-my-cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("fetchCart response:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("fetchCart error:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.user?.token;
      if (!token) throw new Error("Not authenticated");

      console.log("Adding to cart, product ID:", product._id);
      const response = await axios.post(
        `${BASE_URL}/add-to-cart/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("addToCart response:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("addToCart error:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.user?.token;
      if (!token) throw new Error("Not authenticated");

      const response = await axios.post(
        `${BASE_URL}/remove-from-cart/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("removeFromCart response:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("removeFromCart error:", error.response?.data || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
