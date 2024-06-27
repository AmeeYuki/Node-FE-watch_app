import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watch: null,
};

const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    setWatch: (state, action) => {
      state.watch = action.payload;
    },
    clearWatch: (state) => {
      state.watch = null;
    },
  },
});

export const { setWatch, clearWatch } = watchSlice.actions;
export default watchSlice.reducer;
