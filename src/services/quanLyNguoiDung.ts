import { apiInstance } from "constant/apiInstance";
import {
  LoginSchematype,
  RegisterSchAdminType,
  RegisterSchemaType,
} from "schema";
import {
  UpdateUser,
  UpdateUserResponse,
  UserAdmin,
  UserByAccessToken,
  UserLogin,
  khoaHoc,
} from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
});

export const quanLyNguoiDungServices = {
  register: (data: RegisterSchemaType) => api.post("/DangKy", data),

  login: (data: LoginSchematype) => api.post<UserLogin>("/DangNhap", data),

  getUserByAccessToken: () => api.post<UserByAccessToken>("/ThongTinTaiKhoan"),

  updateAccount: (value: UpdateUser) =>
    api.put<UpdateUserResponse>("/CapNhatThongTinNguoiDung", value),

  getUsers: () => api.get<UserAdmin[]>("/LayDanhSachNguoiDung?MaNhom=GP01"),

  getUsersChuaGD: (data) => api.post<string>("/LayDanhSachNguoiDungChuaGhiDanh", data),

  getUsersByCourseIdChoXetDuyet: (query) => api.post(`/LayDanhSachHocVienChoXetDuyet`, query),
  
  getUsersByCourseId: (query) => api.post(`/LayDanhSachHocVienKhoaHoc`, query),

  addUser: (data: RegisterSchAdminType) => api.put("/ThemNguoiDung", data),

  getUser: (data) => api.get<UserAdmin[]>(`/TimKiemNguoiDung?tuKhoa=${data}`),

  deleteUser: (value) => api.delete<string>(`/XoaNguoiDung?TaiKhoan=${value}`),

  updateUser: (value) =>
    api.put<UpdateUser>("/CapNhatThongTinNguoiDung", value),

  getKhoaHoc: (value: object) =>
    api.post<khoaHoc[]>(`/LayDanhSachKhoaHocChoXetDuyet`, value),

  getKhoaHocChuaGhiDanh: (value: object) =>
    api.post<khoaHoc[]>(`/LayDanhSachKhoaHocChuaGhiDanh`, value),

  getKhoaHocRegisted: (value: object) =>
    api.post<khoaHoc[]>(`/LayDanhSachKhoaHocDaXetDuyet`, value),
};
