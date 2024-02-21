
import { getRefreshTokenCookie, getTokenCookie, getUserCookie, removeTokenCookie, removeUserCookie, setRefreshTokenCookie, setTokenCookie, setUserCookie } from "#/utils/cookies";
import {  createSlice } from "@reduxjs/toolkit";
import generalApi from "../query/generalApi";

const initialState = {
  user: getUserCookie() || null,
  token: getTokenCookie() || null,
  refreshToken: getRefreshTokenCookie() || null,
};

export const authSlice= createSlice({
  name: "auth",
  initialState,
  reducers: {

    logOut: (state) => {
        state.user = null;
              removeUserCookie();
      removeTokenCookie();
      state.token = null;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      setTokenCookie(action.payload);
    }

  },
  extraReducers: (builder) => {
    builder.addMatcher(
      generalApi.endpoints.login.matchFulfilled,

      (state, action) => {

        setTokenCookie(action.payload.accessToken);
        setRefreshTokenCookie(action.payload.refreshToken);

      }
    )
  }
})
export const {  logOut,updateToken } = authSlice.actions;
export default authSlice.reducer;
