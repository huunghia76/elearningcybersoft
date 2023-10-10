import { apiInstance } from "constant/apiInstance";
import { LoginSchematype, RegisterSchemaType } from "schema";
import {
   UpdateUser,
   UpdateUserResponse,
   UserByAccessToken,
   UserLogin,
} from "types";

const api = apiInstance({
   baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
});

export const quanLyNguoiDungServices = {
   register: (data: RegisterSchemaType) => api.post("/DangKy", data),

   login: (data: LoginSchematype) =>
      api.post<UserLogin>("/DangNhap", data),

   getUserByAccessToken: () =>
      api.post<UserByAccessToken>("/ThongTinTaiKhoan"),
      
   updateAccount: (value: UpdateUser) =>
      api.put<ApiResponse<UpdateUserResponse>>(
         "/CapNhatThongTinNguoiDung",
         value
      ),
};
