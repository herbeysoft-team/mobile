import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { setItem, getItem, removeItem } from "../../utils/asyncStorage.js";

export const login = createAsyncThunk(
  "auth/login",
  async ({ user, navigation, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.login(user);
      if (response.data.code == 1) {
        Toast.show({
          type: "error",
          text1: "User does not exist!!!",
          text2: "Create an account",
        });
        navigation.replace("Register", { step: 1 });
      }else if (response.data.code == 2) {
        setItem("trowmartemail", user?.email);
        Toast.show({
          type: "info",
          text1: response.data.message,
        });
        navigation.replace("Register", { step: 2 });
      }else if (response.data.code == 3) {
        setItem("trowmartemail", user?.email);
        Toast.show({
          type: "info",
          text1: response.data.message,
        });
        navigation.replace("Register", { step: 3 });
      }else if (response.data.code == 4) {
        Toast.show({
          type: "error",
          text1: "Email or Password is Incorrect",
        });
      }else{
        const token = response.data.token;
        const userId = response.data._id;
        setItem("trowmarttoken", token)
        setItem("trowmartuserId", userId)
        navigation.replace("Main")
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ user, navigation, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.register(user);
      if (response.data) {
        setItem("trowmartemail", user?.email);
        Toast.show({
          type: "success",
          text1: "User has been created Successfully",
        });
        navigation.navigate("Register", { step: 2 });
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

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async ({ user, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.resendOTP(user);
      Toast.show({
        type: "success",
        text1: "Verification Code has been sent to your email",
      });
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

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ user, navigation, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.verifyOTP(user);
      if (response.data.verified == true) {
        navigation.navigate("Register", { step: 3 });
      }
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data,
      });
    }
    return rejectWithValue(err.response.data);
  }
);

export const resetPasswordOTP = createAsyncThunk(
  "auth/resetPasswordOTP",
  async ({ user, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.resetPasswordOTP(user);
      Toast.show({
        type: "success",
        text1: "Password Reset Verification Code has been sent to your email",
      });
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ user, navigation, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.resetPassword(user);
      if (response.data.passwordreset == true) {
        Toast.show({
          type: "success",
          text1: "Password Reset Successfully",
        });
        navigation.navigate("Login");
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

export const completeReg = createAsyncThunk(
  "auth/completeReg",
  async ({ formData, navigation, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.completeReg(formData);
      if (response.data.regcompletestatus == true) {
        Toast.show({
          type: "success",
          text1: "Registration Completed Successfully",
        });
        const token = response.data?.token;
        const userId = response.data.updatedUser?._id;
        setItem("trowmarttoken", token)
        setItem("trowmartuserId", userId)
        navigation.replace("Preferences")
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


export const completeRegIndividual = createAsyncThunk(
  "auth/completeRegIndividual",
  async ({ formData, navigation, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.completeRegIndividual(formData);
      if (response.data.regcompletestatus == true) {
        Toast.show({
          type: "success",
          text1: "Registration Completed Successfully",
        });
        const token = response.data?.token;
        const userId = response.data.updatedUser?._id;
        setItem("trowmarttoken", token)
        setItem("trowmartuserId", userId)
        navigation.replace("Preferences")
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


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    verifystatus: false,
    regstatus: false,
    loginerror: "",
    loginloading: false,
    verifyloading: false,
    verifyerror: "",
    resendloading: false,
    resenderor: "",
    regloading: false,
    regerror: "",
    resetOTPloading: false,
    resetOTPerror: "",
    resetOTPstatus: false,
    resetpasswordloading: false,
    resetpassowrderror: "",
    resetpasswordstatus: false,
    completeregloading: false,
    completeregerror: "",
    completeregstatus: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      removeItem("trowmarttoken");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginloading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginloading = false;
        if (action.payload.token) {
          setItem("trowmarttoken", action.payload.token);
        }
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginloading = false;
        state.loginerror = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.regloading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.regloading = false;
        state.user = action.payload;
        state.regstatus = action.payload.regstatus;
      })
      .addCase(register.rejected, (state, action) => {
        state.regloading = false;
        state.error = action.payload.message;
      })
      .addCase(resendOTP.pending, (state) => {
        state.resendloading = true;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.resendloading = false;
        state.resenderor = action.payload.message;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.resendloading = false;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.verifyloading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.verifyloading = false;
        state.verifystatus = action.payload.verified;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.verifyloading = false;
        state.verifyerror = action.payload;
      })
      .addCase(resetPasswordOTP.pending, (state) => {
        state.resetOTPloading = true;
      })
      .addCase(resetPasswordOTP.rejected, (state, action) => {
        state.resetOTPloading = false;
        state.resetOTPerror = action.payload;
      })
      .addCase(resetPasswordOTP.fulfilled, (state, action) => {
        state.resetOTPloading = false;
        state.resetOTPstatus = action.payload.resetStatus;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetpasswordloading = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetpasswordloading = false;
        state.resetpassowrderror = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetpasswordloading = false;
        state.resetpasswordstatus = action.payload.passwordreset;
      })
      .addCase(completeReg.pending, (state) => {
        state.completeregloading = true;
      })
      .addCase(completeReg.rejected, (state, action) => {
        state.completeregloading = false;
        state.completeregerror = action.payload;
      })
      .addCase(completeReg.fulfilled, (state, action) => {
        state.completeregloading = false;
        state.completeregstatus = action.payload.regcompletestatus;
      })
      .addCase(completeRegIndividual.pending, (state) => {
        state.completeregloading = true;
      })
      .addCase(completeRegIndividual.rejected, (state, action) => {
        state.completeregloading = false;
        state.completeregerror = action.payload;
      })
      .addCase(completeRegIndividual.fulfilled, (state, action) => {
        state.completeregloading = false;
        state.completeregstatus = action.payload.regcompletestatus;
      });
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
