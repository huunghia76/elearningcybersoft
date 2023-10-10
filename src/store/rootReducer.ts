import { combineReducers } from "@reduxjs/toolkit";
import { quanLyNguoDungReducer } from "./quanLyNguoiDung";
import { quanLyBannersReducer } from "./quanLyBanner";

export const rootReducer = combineReducers({
   quanLyNguoiDung: quanLyNguoDungReducer,
   quanLyBanner: quanLyBannersReducer
});
