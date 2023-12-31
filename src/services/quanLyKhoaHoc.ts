import { apiInstance } from "constant/apiInstance";
import { DangKyKhoaHoc } from "types";
import { CategoryCourse, Course } from "types/QuanLyKhoaHoc";

const api = apiInstance({
   baseURL: import.meta.env.VITE_QUAN_LY_KHOA_HOC_API,
});

export const khoaHocServices = {
   getKhoaHoc: (query = '') => api.get<Course[]>(`/LayDanhSachKhoaHoc?${query ? 'tenKhoaHoc=' + query + '&' : query}MaNhom=GP01`),
   getDanhMucKhoaHoc: () => api.get<CategoryCourse[]>(`/LayDanhMucKhoaHoc`),
   getKhoaHocByDanhMuc: (query = "") => api.get<CategoryCourse[]>(`/LayKhoaHocTheoDanhMuc?${query ? 'maDanhMuc=' + query : ''}&MaNhom=GP01`),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   getKhoaHocById: (query = "") => api.get<any>(`/LayThongTinKhoaHoc?maKhoaHoc=${query}`),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   dangKyKhoaHoc: (value) => api.post<DangKyKhoaHoc>(`/DangKyKhoaHoc`, value),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   ghiDanhKhoaHoc: (value) => api.post(`/GhiDanhKhoaHoc`, value),

   huyGhiDanh: (value) => api.post<DangKyKhoaHoc>(`/HuyGhiDanh`, value),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   addCourse: (value) => api.post<any>(`/ThemKhoaHoc`, value),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   editCourse: (value) => api.put<any>(`/CapNhatKhoaHoc`, value),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   addCourseLoadImg: (value) => api.post<any>(`/UploadHinhAnhKhoaHoc`, value),
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   // updateCourseLoadImg: (value,idKH) => api.post<any>(`/CapNhatKhoaHocUpload?maKhoaHoc=${idKH}`, value),
// 
   xoaKhoaHoc: (value) => api.delete<string>(`/XoaKhoaHoc?MaKhoaHoc=${value}`),
};