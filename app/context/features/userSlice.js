import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",

  async (getId, { rejectWithValue }) => {
    try {
      const response = await api.getUserProfile(getId);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserAnalytics = createAsyncThunk(
  "user/getUserAnalytics",

  async (period, { rejectWithValue }) => {

    try {
      const response = await api.getuseranalytics(period);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ formData, Toast, navigation }, { rejectWithValue }) => {
    try {
      const response = await api.updateProfile(formData);
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("Profile");
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

export const updateProfileLocation = createAsyncThunk(
  "user/updateProfileLOcation",
  async ({formData}, { rejectWithValue }) => {
    try {
      const response = await api.updateProfileLocation(formData);
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

export const updateProfilePic = createAsyncThunk(
  "user/updateProfilePic",
  async ({ formData, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateProfilePic(formData);
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
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

export const increaseProfileViews = createAsyncThunk(
  "user/increaseProfileViews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.increaseprofileviews(id);
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

export const submitVerification = createAsyncThunk(
  "user/submitVerification",
  async ({ formData, Toast, navigation }, { rejectWithValue }) => {
    try {
      const response = await api.submitVerification(formData);
      if (response.data) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("Profile");
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    unfollowUsers: [],
    searchUsers: [],
    erroranalytics: "",
    loadinganalytics: false,
    userAnalytics: null,
    errorProfile: "",
    loadingProfile: false,
    errorUpdate: "",
    loadingUpdate: false,
    errorUpdatePic: "",
    loadingUpdatePic: false,
    errorSubmitV: "",
    loadingSubmitV: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loadingProfile = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.errorProfile = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loadingUpdate = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loadingUpdate = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.errorUpdate = action.payload;
      })
      .addCase(getUserAnalytics.pending, (state) => {
        state.loadinganalytics = true;
      })
      .addCase(getUserAnalytics.fulfilled, (state, action) => {
        state.loadinganalytics = false;
        state.userAnalytics = action.payload;
      })
      .addCase(getUserAnalytics.rejected, (state, action) => {
        state.loadinganalytics= false;
        state.erroranalytics = action.payload;
      })
      .addCase(updateProfilePic.pending, (state) => {
        state.loadingUpdatePic = true;
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.loadingUpdatePic = false;
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.loadingUpdatePic = false;
        state.errorUpdatePic = action.payload;
      })
      .addCase(submitVerification.pending, (state) => {
        state.loadingSubmitV = true;
      })
      .addCase(submitVerification.fulfilled, (state, action) => {
        state.loadingSubmitV = false;
      })
      .addCase(submitVerification.rejected, (state, action) => {
        state.loadingSubmitV = false;
        state.errorSubmitV = action.payload;
      });
  },
});

export default userSlice.reducer;
