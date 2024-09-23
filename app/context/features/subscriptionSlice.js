import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const subscriptionPlan = createAsyncThunk(
  "subscription/subscriptionPlan ",

  async ({formData, Toast}, { rejectWithValue }) => {
    try {
      const response = await api.subscriptionPlan(formData);
      if (response) {
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

export const getSubscriptionPlan = createAsyncThunk(
    "subscription/getSubscriptionPlan ",
  
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.getSubscriptionPlan();
        console.log(response.data)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );



const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    loadingSub: false,
    errorSub: "",
    loadingPlan: false,
    errorPlan: "",
    subscriptionInfo: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscriptionPlan.pending, (state) => {
        state.loadingSub = true;
      })
      .addCase(subscriptionPlan.fulfilled, (state, action) => {
        state.loadingSub = false;
      })
      .addCase(subscriptionPlan.rejected, (state, action) => {
        state.loadingSub = false;
        state.errorSub= action.payload;
      })
      .addCase(getSubscriptionPlan.pending, (state) => {
        state.loadingPlan = true;
      })
      .addCase(getSubscriptionPlan.fulfilled, (state, action) => {
        state.loadingPlan = false;
        state.subscriptionInfo = action.payload;
        
      })
      .addCase(getSubscriptionPlan.rejected, (state, action) => {
        state.loadingPlan = false;
        state.errorPlan= action.payload;
      });
  },
});

export default subscriptionSlice.reducer;
