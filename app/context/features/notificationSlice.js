import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";



export const getMyNotifications = createAsyncThunk(
    "notification/getMyNotifications",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.getMyNotifications(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    loadingNot: false,
    errorNot: "",
    notify: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyNotifications.pending, (state) => {
        state.loadingNot = true;
      })
      .addCase(getMyNotifications.fulfilled, (state, action) => {
        state.loadingNot = false;
        state.notify = action.payload;
      })
      .addCase(getMyNotifications.rejected, (state, action) => {
        state.loadingNot = false;
        state.errorNot= action.payload;
      });
  },
});

export default notificationSlice.reducer;
