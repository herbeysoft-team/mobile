import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createOrder = createAsyncThunk(
  "order/createOrder",

  async ({ formData, Toast }, { rejectWithValue }) => {


    try {
      const response = await api.createOrder(formData);
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

export const getOrderMade = createAsyncThunk(
  "order/getOrderMade",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getOrderMade(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",

  async (id, { rejectWithValue }) => {

    console.log({"My Order ID": id})
    try {
      const response = await api.getOrderDetails(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOrderRecieved = createAsyncThunk(
  "order/getOrderRecieved",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getOrderRecieved(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",

  async ({ formData, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateOrderStatus(formData);
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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrder: [],
    loadingcreateorder: false,
    errorcreateorder: null,
    orderstatus: false,
    loadingordermade: false,
    errorordermade: null,
    orderMade:[],
    loadingorderrecieved: false,
    errororderrecieved: null,
    orderRecieved:[],
    loadingupdatestatus: false,
    errorupdatestatus: null,
    orderdetails: null,
    loadingorderdetails: false,
    errororderdetails: null,
    },
  reducers: {
    setOrderStatus: (state, action) => {
        state.orderstatus = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loadingcreateorder = true;
        state.errorcreateorder = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loadingcreateorder = false;
        state.orderstatus = action.payload.status;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loadingcreateorder = false;
        state.errorcreateorder = action.error.message;
      })
      .addCase(getOrderMade.pending, (state) => {
        state.loadingordermade = true;
        state.errorordermade = null;
      })
      .addCase(getOrderMade.fulfilled, (state, action) => {
        state.loadingordermade = false;
        state.orderMade= action.payload;
      })
      .addCase(getOrderMade.rejected, (state, action) => {
        state.loadingordermade = false;
        state.errorordermade = action.error.message;
      })
      .addCase(getOrderRecieved.pending, (state) => {
        state.loadingorderrecieved = true;
        state.errororderrecieved = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loadingorderdetails = false;
        state.orderdetails= action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loadingorderdetails = false;
        state.errororderdetails = action.error.message;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loadingorderdetails = true;
        state.errororderdetails= null;
      })
      .addCase(getOrderRecieved.fulfilled, (state, action) => {
        state.loadingorderrecieved = false;
        state.orderRecieved= action.payload;
      })
      .addCase(getOrderRecieved.rejected, (state, action) => {
        state.loadingorderrecieved = false;
        state.errororderrecieved = action.error.message;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loadingupdatestatus = true;
        state.errorupdatestatus = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loadingupdatestatus = false;
        // state.orderdetails = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loadingupdatestatus = false;
        state.errorupdatestatus = action.error.message;
      })
  },
});

export const {setOrderStatus} = orderSlice.actions;
export default orderSlice.reducer;
