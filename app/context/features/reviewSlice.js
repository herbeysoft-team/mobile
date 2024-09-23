import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ formData, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.addReview(formData);
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });}
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyReviews = createAsyncThunk(
  "review/getMyReviews",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getMyReviews(userId);
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const getVendorReviews = createAsyncThunk(
  "review/getVendorReviews",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await api.getVendorReviews(vendorId);
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ formData, Toast, navigation }, { rejectWithValue }) => {
    try {
      const response = await api.updateReview(formData);
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("Rating");
      }
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ reviewId, Toast, navigation }, { rejectWithValue }) => {
    try {
      const response = await api.deleteReview(reviewId);
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("Rating");
      }
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loadinguserreview: false,
    erroruserreview: "",
    userreview: [],
    loadingvendorreview: false,
    errorvendorreview: "",
    vendorreview: [],
    deleteloading: false,
    deleteerror: "",
    loadingupdatereview: false,
    errorupdatereview: "",
    loadingdeletereview: false,
    errordeletereview: "",
    loadingreview: false,
    errorreview: "",
  },
  //   reducers: {
  //     setListingStatus: (state, action) => {
  //       state.addlistingstatus = false;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loadingreview = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loadingreview = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loadingreview = false;
        state.errorreview = action.payload;
      })
      .addCase(getMyReviews.pending, (state) => {
        state.loadinguserreview = true;
      })
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.loadinguserreview = false;
        state.userreview = action.payload;
      })
      .addCase(getMyReviews.rejected, (state, action) => {
        state.loadinguserreview = false;
        state.erroruserreview = action.payload;
      })
      .addCase(getVendorReviews.pending, (state) => {
        state.loadingvendorreview = true;
      })
      .addCase(getVendorReviews.fulfilled, (state, action) => {
        state.loadingvendorreview = false;
        state.vendorreview = action.payload;
      })
      .addCase(getVendorReviews.rejected, (state, action) => {
        state.loadingvendorreview = false;
        state.errorvendorreview = action.payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.loadingupdatereview = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loadingupdatereview = false;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loadingupdatereview = false;
        state.errorupdatereview = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loadingdeletereview = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loadingdeletereview = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loadingdeletereview = false;
        state.errordeletereview = action.payload;
      });
  },
});

// export const { setListingStatus } = listingSlice.actions;
export default reviewSlice.reducer;
