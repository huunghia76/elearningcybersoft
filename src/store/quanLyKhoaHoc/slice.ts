import { createSlice } from "@reduxjs/toolkit";
import { getDanhMucKhoaHocThunk, getKhoaHocByDanhMucThunk, getKhoaHocByIdThunk, getKhoaHocThunk } from ".";
import { CategoryCourse, Course } from "types/QuanLyKhoaHoc";

type QuanLyKhoaHocInitialState = {
   isFetchingKhoaHocList?: boolean;
   khoaHocList?: Course[] | [],
   DanhMucKhoaHocList?: CategoryCourse[] | [],
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   KhoaHocListByDanhMuc?: any,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   ThongTinKhoaHoc?: any,
};

const initialState: QuanLyKhoaHocInitialState = {
};

const quanLyKhoaHocSlice = createSlice({
   name: "quanLyKhoaHocs",
   initialState,
   reducers: {
      
   },
   extraReducers(builder) {
      builder
         //  khoa học
         .addCase(getKhoaHocThunk.pending, (state) => {
            state.isFetchingKhoaHocList = true;
         })
         .addCase(getKhoaHocThunk.rejected, (state) => {
            state.isFetchingKhoaHocList = false;
         })
         .addCase(getKhoaHocThunk.fulfilled, (state, { payload }) => {
            state.khoaHocList = payload;
            state.isFetchingKhoaHocList = false;
         })

         // danh mục khoa học
         .addCase(getDanhMucKhoaHocThunk.pending, (state) => {
            state.isFetchingKhoaHocList = true;
         })
         .addCase(getDanhMucKhoaHocThunk.rejected, (state) => {
            state.isFetchingKhoaHocList = false;
         })
         .addCase(getDanhMucKhoaHocThunk.fulfilled, (state, { payload }) => {
            state.DanhMucKhoaHocList = payload
            state.isFetchingKhoaHocList = false;
         })

         //  khoa học theo danh mục
         .addCase(getKhoaHocByDanhMucThunk.pending, (state) => {
            state.isFetchingKhoaHocList = true;
         })
         .addCase(getKhoaHocByDanhMucThunk.rejected, (state) => {
            state.isFetchingKhoaHocList = false;
         })
         .addCase(getKhoaHocByDanhMucThunk.fulfilled, (state, { payload }) => {
            state.KhoaHocListByDanhMuc = payload
            state.isFetchingKhoaHocList = false;
         })

         //  Lấy thông tin khóa học
         .addCase(getKhoaHocByIdThunk.pending, (state) => {
            state.isFetchingKhoaHocList = true;
         })
         .addCase(getKhoaHocByIdThunk.rejected, (state) => {
            state.isFetchingKhoaHocList = false;
         })
         .addCase(getKhoaHocByIdThunk.fulfilled, (state, { payload }) => {
            state.ThongTinKhoaHoc = payload
            state.isFetchingKhoaHocList = false;
         })
   },
});

export const { actions: quanLyKhoaHocActions, reducer: quanLyKhoaHocReducer } =
   quanLyKhoaHocSlice;
