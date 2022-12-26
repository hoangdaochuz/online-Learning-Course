import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "636b6de023e6e435c995b8c6",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;