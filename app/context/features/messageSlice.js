import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getChatList = createAsyncThunk(
  "message/getChatList ",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getChatList(id);
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

export const getChatUser = createAsyncThunk(
  "message/getChatUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getChatUser(id);
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

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async ({senderId, recepientId}, { rejectWithValue }) => {
    try {
      const response = await api.getMessages(senderId, recepientId);
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

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (content, { rejectWithValue }) => {
    try {
      const response = await api.sendMessage(content);
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

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loadingchatlist: false,
    errorchatlist: "",
    chatlist: [],
    chatuser: null,
    chathistory: [],
    loadingchathistory: false,
    errorchathistory: null,
    loadingsend: false,
    errorsend: null,
  },

  //   reducers: {
  //     setListingStatus: (state, action) => {
  //       state.addlistingstatus = false;
  //     },
  //   },

  extraReducers: (builder) => {
    builder

      .addCase(getChatList.pending, (state) => {
        state.loadingchatlist = true;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.loadingchatlist = false;
        state.chatlist = action.payload;
      })
      .addCase(getChatList.rejected, (state, action) => {
        state.loadingchatlist = false;
        state.errorchatlist = action.payload;
      })
      .addCase(getChatUser.fulfilled, (state, action) => {
        state.chatuser = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.loadingchathistory = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loadingchathistory = false;
        state.chathistory = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loadingchathistory = false;
        state.errorchathistory = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loadingsend = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loadingsend = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loadingsend = false;
        state.errorsend = action.payload;
      });
  },
});

// export const { setListingStatus } = listingSlice.actions;
export default messageSlice.reducer;
