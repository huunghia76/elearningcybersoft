import { combineReducers } from "@reduxjs/toolkit";
import { quanLyNguoDungReducer } from "./quanLyNguoiDung";
import { quanLyBannersReducer } from "./quanLyBanner";
import { quanLyKhoaHocReducer } from "./quanLyKhoaHoc";

export const rootReducer = combineReducers({
   quanLyNguoiDung: quanLyNguoDungReducer,
   quanLyBanner: quanLyBannersReducer,
   quanLyKhoaHoc: quanLyKhoaHocReducer,
});
