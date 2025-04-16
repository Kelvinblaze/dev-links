import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    photo: null,
    firstname: "",
    lastname: "",
    email: "",
  },
  token: null,
  isLoggedIn: null,
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
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUser, setLinks, setToken, setIsLoggedIn } =
  globalSlice.actions;
export default globalSlice.reducer;
