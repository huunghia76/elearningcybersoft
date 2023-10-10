import { createSlice } from "@reduxjs/toolkit";
import { UpdateUser, UserByAccessToken, UserLogin } from "types";
import { UpdateAccountThunk, getUserByAccessTokenThunk, loginThunk } from ".";
import { getAccessToken } from "utils";

type QuanLyNguoiDungInitialState = {
   accessToken?: string;
   userLogin?: UserLogin | UserByAccessToken;
   userUpdate?: UpdateUser;
   isFetchingLogin?: boolean;
   isUpdatingUser: boolean;
};

const initialState: QuanLyNguoiDungInitialState = {
   accessToken: getAccessToken() || undefined,
   isFetchingLogin: false,
   isUpdatingUser: false,
};

const quanLyNguoiDungSlice = createSlice({
   name: "quanLyNguoiDung",
   initialState,
   reducers: {
      logOut: (state) => {
         state.accessToken = undefined;
         state.userLogin = undefined;
         localStorage.removeItem("ACCESSTOKEN");
      },
   },
   extraReducers(builder) {
      builder
         .addCase(loginThunk.pending, (state) => {
            state.isFetchingLogin = true;
         })
         .addCase(loginThunk.rejected, (state) => {
            state.isFetchingLogin = false;
         })
         .addCase(loginThunk.fulfilled, (state, { payload }) => {
            localStorage.setItem("ACCESSTOKEN", payload?.accessToken);
            state.accessToken = payload.accessToken;
            state.userLogin = payload;
            state.isFetchingLogin = false;
         })
         .addCase(getUserByAccessTokenThunk.fulfilled, (state, { payload }) => {
            state.userLogin = payload;
         })
         .addCase(UpdateAccountThunk.fulfilled, (state, { payload }) => {
            state.userUpdate = payload;
            state.isUpdatingUser = false;
         });
   },
});

export const {
   actions: quanLyNguoiDungActions,
   reducer: quanLyNguoDungReducer,
} = quanLyNguoiDungSlice;
