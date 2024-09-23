import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const uploadPhotos = createAsyncThunk(
  "listing/uploadPhotos",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.uploadPhotos(formData);
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const addListing = createAsyncThunk(
  "listing/addListing",
  async ({ formData, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.addListing(formData);
      if (response.data.status) {
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

export const addProductListing = createAsyncThunk(
  "listing/addProductListing",
  async ({ formData, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.addProductListing(formData);
      if (response.data.status) {
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

export const updateListing = createAsyncThunk(
  "listing/updateListing",
  async ({ id, formData, Toast, navigation }, { rejectWithValue }) => {
    console.log({"SLice": formData})
    try {
      const response = await api.updateListing(id, formData);
      if (response.data.status) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("My-Listing")
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

export const updateProductListing = createAsyncThunk(
  "listing/updateProductListing",
  async ({ id, formData, Toast, navigation }, { rejectWithValue }) => {
    try {
      const response = await api.updateProductListing(id, formData);
      if (response.data.status) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("My-Listing")
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
export const getListingsByLocation = createAsyncThunk(
  "listing/getListingsByLocation",
  async ({location, listingSelectedDistance}, { rejectWithValue }) => {
    const { longitude, latitude} = location;
    try {
      const response = await api.getListingsByLocation(longitude, latitude, listingSelectedDistance);
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

export const increaseListingViews = createAsyncThunk(
  "listing/increaseListingViews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.increaselistingviews(id);
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

export const getSimilarListings = createAsyncThunk(
  "listing/getSimilarListings",
  async ({listingcontent, listingSelectedDistance}, { rejectWithValue }) => {
    const { id, longitude, latitude} = listingcontent;
    try {
      const response = await api.getSimilarListings(id, longitude, latitude, listingSelectedDistance);
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
const listingSlice = createSlice({
  name: "listing",
  initialState: {
    openSetting: false,
    loadingaddlisting: false,
    erroraddlisting: "",
    loadingupdatelisting: false,
    errorupdatelisting: "",
    addlistingstatus: false,
    filenames: null,
    errorfileloading: "",
    listingsbylocation: [],
    loadinglistingsbylocation: false,
    errorlistingsbylocation: "",
    similarlistings: [],
    loadingsimilarlistings: false,
    errorsimilarlistings: "",
    listingSettings: {
      minimumPrice: 0,
      maximumPrice: 100000,
      eventTime: "This Week",
      gridView: false,
    },
  },
  reducers: {
    setListingStatus: (state, action) => {
      state.addlistingstatus = false;
    },
    setSetting: (state, action) => {
      state.openSetting = action.payload;
    },
    filterListingsBySearch: (state, action) => {
      const searchText = action.payload.toLowerCase(); // Convert search text to lowercase for case-insensitive matching
      state.listingsbylocation = state.listingsbylocation.filter((listing) => {
        return listing.name.toLowerCase().includes(searchText);
      });
    },
    setListingSettings: (state, action) => {
      state.listingSettings = { ...state.listingSettings, ...action.payload };
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(addListing.pending, (state) => {
        state.loadingaddlisting = true;
      })
      .addCase(addListing.rejected, (state, action) => {
        state.loadingaddlisting = false;
        state.erroraddlisting = action.payload;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.loadingaddlisting = false;
        state.addlistingstatus = action.payload.status;
      })
      .addCase(addProductListing.pending, (state) => {
        state.loadingaddlisting = true;
      })
      .addCase(addProductListing.rejected, (state, action) => {
        state.loadingaddlisting = false;
        state.erroraddlisting = action.payload;
      })
      .addCase(addProductListing.fulfilled, (state, action) => {
        state.loadingaddlisting = false;
        state.addlistingstatus = action.payload.status;
      })
      .addCase(updateListing.pending, (state) => {
        state.loadingupdatelisting = true;
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loadingupdatelisting = false;
        state.errorupdatelisting = action.payload;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loadingupdatelisting = false;
      })
      .addCase(updateProductListing.pending, (state) => {
        state.loadingupdatelisting = true;
      })
      .addCase(updateProductListing.rejected, (state, action) => {
        state.loadingupdatelisting = false;
        state.errorupdatelisting = action.payload;
      })
      .addCase(updateProductListing.fulfilled, (state, action) => {
        state.loadingupdatelisting = false;
      })
      .addCase(uploadPhotos.rejected, (state, action) => {
        // state.loadingaddlisting= false;
        state.errorfileloading = action.payload;
      })
      .addCase(uploadPhotos.fulfilled, (state, action) => {
        // state.loadingaddlisting = false;
        state.filenames = action.payload;
      })
      .addCase(getListingsByLocation.pending, (state) => {
        state.loadinglistingsbylocation = true;
      })
      .addCase(getListingsByLocation.fulfilled, (state, action) => {
        state.loadinglistingsbylocation = false;
        // Filter listings based on listingSettings
        const filteredListings = action.payload.filter((listing) => {
          // Assuming listingSettings contains filtering criteria
          
          const { minimumPrice, maximumPrice } = state.listingSettings;
          const listingPrice = listing.price; // Assuming each listing has a 'price' property

          // Apply filtering logic based on your criteria
          return listingPrice >= minimumPrice && listingPrice <= maximumPrice;
        });
          state.listingsbylocation = filteredListings;
      })
      .addCase(getListingsByLocation.rejected, (state, action) => {
        state.loadinglistingsbylocation = false;
        state.errorlistingsbylocation = action.payload;
      })
      .addCase(getSimilarListings.pending, (state) => {
        state.loadingsimilarlistings = true;
      })
      .addCase(getSimilarListings.fulfilled, (state, action) => {
        state.loadingsimilarlistings = false;
        state.similarlistings = action.payload;
      })
      .addCase(getSimilarListings.rejected, (state, action) => {
        state.loadingsimilarlistings = false;
        state.errorsimilarlistings = action.payload;
      });
  },
});

export const toggleSetting = (value) => (dispatch) => {
  dispatch(setSetting(value));
};
export const { setListingStatus, setSetting, filterListingsBySearch, setListingSettings} = listingSlice.actions;
export default listingSlice.reducer;
