import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProductCategory = createAsyncThunk(
  "category/getProductCategory",

  async (type, { rejectWithValue }) => {
    try {
      const response = await api.getCategory(type);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getServiceCategory = createAsyncThunk(
  "category/getServiceCategory",

  async (type, { rejectWithValue }) => {
    try {
      const response = await api.getCategory(type);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getEventCategory = createAsyncThunk(
  "category/getEventCategory",

  async (type, { rejectWithValue }) => {
    try {
      const response = await api.getCategory(type);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    productCategory: [],
    loadingProductCategory: false,
    errorProductCategory: "",
    eventCategory: [],
    loadingEventCategory: false,
    errorEventCategory: "",
    serviceCategory: [],
    loadingServiceCategory: false,
    errorServiceCategory: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategory.pending, (state) => {
        state.loadingProductCategory = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.loadingProductCategory = false;
        state.productCategory = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.loadingProductCategory = false;
        state.errorProductCategory = action.payload;
      })
      .addCase(getServiceCategory.pending, (state) => {
        state.loadingServiceCategory = true;
      })
      .addCase(getServiceCategory.fulfilled, (state, action) => {
        state.loadingServiceCategory = false;
        state.serviceCategory = action.payload;
      })
      .addCase(getServiceCategory.rejected, (state, action) => {
        state.loadingServiceCategory = false;
        state.errorServiceCategory = action.payload;
      })
      .addCase(getEventCategory.pending, (state) => {
        state.loadingEventCategory = true;
      })
      .addCase(getEventCategory.fulfilled, (state, action) => {
        state.loadingEventCategory = false;
        state.eventCategory = action.payload;
      })
      .addCase(getEventCategory.rejected, (state, action) => {
        state.loadingEventCategory = false;
        state.errorEventCategory = action.payload;
      });
  },
});

export default categorySlice.reducer;
