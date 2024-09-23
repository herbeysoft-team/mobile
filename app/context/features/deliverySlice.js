import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createDelivery = createAsyncThunk(
  "delivery/createDelivery",

  async ({ formData, Toast }, { rejectWithValue }) => {

    try {
      const response = await api.createDelivery(formData);
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

export const getDeliveryMade = createAsyncThunk(
  "delivery/getDeliveryMade",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getDeliveryMade(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const getOrderRecieved = createAsyncThunk(
//   "order/getOrderRecieved",

//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await api.getOrderRecieved(id);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const updateOrderStatus = createAsyncThunk(
//   "order/updateOrderStatus",

//   async ({ formData, Toast }, { rejectWithValue }) => {
//     console.log(formData)
//     try {
//       const response = await api.updateOrderStatus(formData);
//       if (response.data) {
//         Toast.show({
//           type: "success",
//           text1: response.data.message,
//         });
//       }
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    myDelivery: [],
    loadingcreatedelivery: false,
    errorcreatedelivery: null,
    deliverystatus: false,
    loadingdeliverymade: false,
    errordeliverymade: null,
    deliveryMade:[],
    },
  reducers: {
    setDeliveryStatus: (state, action) => {
        state.deliverystatus = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDelivery.pending, (state) => {
        state.loadingcreatedelivery = true;
        state.errorcreatedelivery = null;
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.loadingcreatedelivery = false;
        state.deliverystatus = action.payload.status;
      })
      .addCase(createDelivery.rejected, (state, action) => {
        state.loadingcreatedelivery = false;
        state.errorcreatedelivery = action.error.message;
      })
      .addCase(getDeliveryMade.pending, (state) => {
        state.loadingdeliverymade = true;
        state.errordeliverymade = null;
      })
      .addCase(getDeliveryMade.fulfilled, (state, action) => {
        state.loadingdeliverymade = false;
        state.deliveryMade = action.payload;
      })
      .addCase(getDeliveryMade.rejected, (state, action) => {
        state.loadingdeliverymade = false;
        state.errordeliverymade = action.error.message;
      })
      
  },
});

export const {setDeliveryStatus} = deliverySlice.actions;
export default deliverySlice.reducer;
