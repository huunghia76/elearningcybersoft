import { createSlice } from "@reduxjs/toolkit";
import { getBannerList } from ".";
import { Banners } from "types/banners";

type QuanLyBannerInitialState = {
  bannerList?: Banners[];
  isFetchingBannerList?: boolean;
};

const initialState: QuanLyBannerInitialState = {};

const quanLyBannersSlice = createSlice({
  name: "quanLyBanners",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBannerList.pending, (state) => {
        state.isFetchingBannerList = true;
      })
      .addCase(getBannerList.fulfilled, (state, { payload }) => {
        state.bannerList = payload;
        state.isFetchingBannerList = false;
      })
      .addCase(getBannerList.rejected, (state) => {
        state.isFetchingBannerList = false;
      });
  },
});

export const { actions: quanLyBannersActions, reducer: quanLyBannersReducer } =
  quanLyBannersSlice;
