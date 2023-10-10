import { createAsyncThunk } from "@reduxjs/toolkit";
import { bannerServices } from "services";

export const getBannerList = createAsyncThunk(
   "quanLyBanner/getBanners",
   async (_, { rejectWithValue }) => {
      try {
         const data = await bannerServices.getBanners();
         return data.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
