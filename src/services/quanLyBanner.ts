import { apiInstance } from "constant/apiInstance";
import { Banners } from "types/banners";

const api = apiInstance({
   baseURL: import.meta.env.VITE_QUAN_LY_PHIM_API,
});

export const bannerServices = {
   getBanners: () => api.get<ApiResponse<Banners[]>>(`/LayDanhSachBanner`),
};
