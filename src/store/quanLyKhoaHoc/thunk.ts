import { createAsyncThunk } from "@reduxjs/toolkit";
import { khoaHocServices } from "services/quanLyKhoaHoc";

export const getKhoaHocThunk = createAsyncThunk(
   "quanLyKhoaHoc/getKhoaHoc",
   async (_, { rejectWithValue }) => {
      try {
         const data = await khoaHocServices.getKhoaHoc();
         return data.data;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const getDanhMucKhoaHocThunk = createAsyncThunk(
   "quanLyDanhMucKhoaHoc/getDanhMucKhoaHoc",
   async (_, { rejectWithValue }) => {
      try {
         const data = await khoaHocServices.getDanhMucKhoaHoc();
         return data.data;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const getKhoaHocByDanhMucThunk = createAsyncThunk(
   "quanLyDanhMucKhoaHoc/getKhoaHocByDanhMucThunk",
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   async (payload:any, { rejectWithValue }) => {
      try {
         const data = await khoaHocServices.getKhoaHocByDanhMuc(payload);
         return data.data;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const getKhoaHocByIdThunk = createAsyncThunk(
   "quanLyDanhMucKhoaHoc/getKhoaHocByIdThunk",
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   async (payload:any, { rejectWithValue }) => {
      try {
         const data = await khoaHocServices.getKhoaHocById(payload);
         return data.data;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
