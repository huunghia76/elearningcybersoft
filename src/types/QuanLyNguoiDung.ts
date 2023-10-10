export type UserLogin = {
   taiKhoan: string,
   hoTen: string,
   email: string,
   soDT: string,
   maNhom: string,
   maLoaiNguoiDung: "GV" | "HV",
   accessToken: string,
};
export type UserByAccessToken = Omit<UserLogin, "accessToken"> & {
   chiTietKhoaHocGhiDanh?: [] | undefined;
};
export type UpdateUser = {
   taiKhoan: string;
   email: string;
   soDT: string;
   maNhom: string;
   maLoaiNguoiDung: string;
   hoTen: string;
};
export type UpdateUserResponse = UpdateUser & {
   soDT?: string;
   loaiNguoiDung: string;
   chiTietKhoaHocGhiDanh:
   | {
      maPhim: string;
      rap: string;
      soGhe: string;
      thoiGian: string;
   }[]
   | null;
};
