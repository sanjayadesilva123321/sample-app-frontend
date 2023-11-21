import { createSlice } from "@reduxjs/toolkit";
import reducerTypes from "../reducerTypes";

const initialState = {
  isTokenExpired: false,
};

export const authSlice = createSlice({
  name: reducerTypes.auth,
  initialState,
  reducers: {
    SET_TOKEN_EXPIRY_STATUS: (state, data) => {
      state.isTokenExpired = data.payload;
    },
  },
});

export const { SET_TOKEN_EXPIRY_STATUS } = authSlice.actions;

export default authSlice.reducer;
