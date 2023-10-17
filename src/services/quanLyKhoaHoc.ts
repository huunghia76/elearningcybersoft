import { apiInstance } from "constant/apiInstance";
import { DangKyKhoaHoc } from "types";
import { CategoryCourse, Course } from "types/QuanLyKhoaHoc";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_KHOA_HOC_API,
});

export const khoaHocServices = {
   getKhoaHoc: (query = '') => api.get<Course[]>(`/LayDanhSachKhoaHoc?${query ? 'tenKhoaHoc=' + query + '&' : query}MaNhom=GP09`),
   getDanhMucKhoaHoc: () => api.get<CategoryCourse[]>(`/LayDanhMucKhoaHoc`),
   getKhoaHocByDanhMuc: (query = "") => api.get<CategoryCourse[]>(`/LayKhoaHocTheoDanhMuc?${query ? 'maDanhMuc=' + query : ''}&MaNhom=GP09`),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   getKhoaHocById: (query = "") => api.get<any>(`/LayThongTinKhoaHoc?maKhoaHoc=${query}`),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   dangKyKhoaHoc: (value) => api.post<DangKyKhoaHoc>(`/DangKyKhoaHoc`, value),
   huyGhiDanh: (value) => api.post<DangKyKhoaHoc>(`/HuyGhiDanh`, value),
};
