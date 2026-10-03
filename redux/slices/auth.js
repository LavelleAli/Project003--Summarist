import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    initializing: true,
    // null = not checked yet, true/false once the subscription lookup finishes
    isPremium: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.initializing = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.initializing = false;
      state.isPremium = null;
    },
    setPremium: (state, action) => {
      state.isPremium = action.payload;
    },
  },
});

export const { setUser, clearUser, setPremium } = authSlice.actions;
export default authSlice.reducer;
