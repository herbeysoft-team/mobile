import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const addItemToCart = createAsyncThunk(
  "cart/addToCart",

  async ({ formData, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.addItemToCart(formData);
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const incrementCartItemQuantity = createAsyncThunk(
  "cart/incrementCartItemQuantity",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.incrementCartItemQuantity(formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const decrementCartItemQuantity = createAsyncThunk(
  "cart/decrementCartItemQuantity",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.decrementCartItemQuantity(formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyCartItem = createAsyncThunk(
  "cart/getMyCartItem",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUserCartItemsGroupedByVendor(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    loadingaddtocart: false,
    erroraddtocart: null,
    loadingcart: false,
    errorcart: null,
  },
  reducers: {
    addToCart: (state, action) => {
      state.userLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loadingaddtocart = true;
        state.erroraddtocart = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loadingaddtocart = false;
        state.cart = action.payload.cart;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loadingaddtocart = false;
        state.erroraddtocart = action.error.message;
      })
      .addCase(incrementCartItemQuantity.pending, (state) => {
        state.loadingcart = true;
        state.errorcart = null;
      })
      .addCase(incrementCartItemQuantity.fulfilled, (state, action) => {
        state.loadingcart = false;
        state.cart = action.payload.cart;
        state.total = calculateTotal(state.cart.items); // Recalculate total
      })
      .addCase(incrementCartItemQuantity.rejected, (state, action) => {
        state.loadingcart = false;
        state.errorcart = action.error.message;
      })
      .addCase(decrementCartItemQuantity.pending, (state) => {
        state.loadingcart = true;
        state.errorcart = null;
      })
      .addCase(decrementCartItemQuantity.fulfilled, (state, action) => {
        state.loadingcart = false;
        state.cart = action.payload.cart;
        state.total = calculateTotal(state.cart.items); // Recalculate total
      })
      .addCase(decrementCartItemQuantity.rejected, (state, action) => {
        state.loadingcart = false;
        state.errorcart = action.error.message;
      })
      .addCase(getMyCartItem.pending, (state) => {
        state.loadingcart = true;
        state.errorcart = null;
      })
      .addCase(getMyCartItem.fulfilled, (state, action) => {
        state.loadingcart = false;
        state.cart = action.payload.itemsGroupedByVendor;
        state.total = action.payload.totalAmount;
      })
      .addCase(getMyCartItem.rejected, (state, action) => {
        state.loadingcart = false;
        state.errorcart = action.error.message;
      });
    // Helper function to calculate total amount based on items in the cart
    const calculateTotal = (items) => {
      return items.reduce(
        (total, item) => total + item.listing.price * item.quantity,
        0
      );
    };
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
