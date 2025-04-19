import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  links: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLinks(state, action) {
      state.links = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    resetState(state) {
      state.user = null;
      state.token = null;
      state.links = [];
    },
  },
});

export const { setUser, setLinks, setToken, resetState } = globalSlice.actions;
export default globalSlice.reducer;
