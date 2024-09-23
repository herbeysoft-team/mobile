import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const depositFund = createAsyncThunk(
  "transaction/depositFund",

  async ({formData, Toast}, { rejectWithValue }) => {
    try {
      const response = await api.depositFund(formData);
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

export const getAccountBalance = createAsyncThunk(
  "transaction/getAccountBalance",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getAccountBalance(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTransactionsByUser = createAsyncThunk(
  "transaction/getTransactionsByUser",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTransactionsByUser(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    balance: "",
    transaction: [],
    loadingBalance: false,
    errorBalance: "",
    loadingTransaction: false,
    errorTransaction: "",
    loadingDeposit: false,
    errorDeposit: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(depositFund.pending, (state) => {
        state.loadingDeposit = true;
      })
      .addCase(depositFund.fulfilled, (state, action) => {
        state.loadingDeposit = false;
      })
      .addCase(depositFund.rejected, (state, action) => {
        state.loadingDeposit = false;
        state.errorDeposit = action.payload;
      })
      .addCase(getAccountBalance.pending, (state) => {
        state.loadingBalance = true;
      })
      .addCase(getAccountBalance.fulfilled, (state, action) => {
        state.loadingBalance = false;
        state.balance = action.payload.balance;
      })
      .addCase(getAccountBalance.rejected, (state, action) => {
        state.loadingBalance = false;
        state.errorBalance = action.payload;
      })
      .addCase(getTransactionsByUser.pending, (state) => {
        state.loadingTransaction = true;
      })
      .addCase(getTransactionsByUser.fulfilled, (state, action) => {
        state.loadingTransaction = false;
        state.transaction = action.payload.transactions;
      })
      .addCase(getTransactionsByUser.rejected, (state, action) => {
        state.loadingTransaction = false;
        state.errorTransaction = action.payload;
      });
  },
});

export default transactionSlice.reducer;
