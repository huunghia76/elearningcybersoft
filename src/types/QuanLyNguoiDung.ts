export type UserLogin = {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: "GV" | "HV";
  accessToken: string;
};
export type UserByAccessToken = Omit<UserLogin, "accessToken"> & {
  chiTietKhoaHocGhiDanh?:
    | [
        {
          biDanh: string;
          danhGia: number;
          hinhAnh: string;
          luotXem: number;
          maKhoaHoc: string;
          moTa: string;
          ngayTao: string;
          tenKhoaHoc: string;
        }
      ]
    | undefined;
};
export type UpdateUser = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
};
export type UpdateUserResponse = UpdateUser & {
  biDanh: string;
  maLoaiNguoiDungNavigation: string;
  hocVienKhoaHoc: [];
  khoaHoc: [];
};
export type DangKyKhoaHoc = {
  maKhoaHoc: string;
  taiKhoan: string;
};
export type UserAdmin = {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
};
export type AddUser = {
  taiKhoan: "string";
  matKhau: "string";
  hoTen: "string";
  soDT: "string";
  maLoaiNguoiDung: "string";
  maNhom: "string";
  email: "string";
};
