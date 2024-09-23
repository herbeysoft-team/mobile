import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";



const mapSlice = createSlice({
  name: "map",
  initialState: {
    userLocation: null,
    selectedDistance: 10,
    listingSelectedDistance: 10,
    
  },
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setDistance: (state, action) => {
      state.selectedDistance = action.payload;
    },
    setListingDistance: (state, action) => {
      state.listingSelectedDistance = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    
  },
});

export const { setUserLocation, setDistance, setListingDistance} = mapSlice.actions;
export default mapSlice.reducer;
