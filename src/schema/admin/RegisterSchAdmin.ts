import { z } from "zod";

export const RegisterSchAdmin = z.object({
  taiKhoan: z
    .string()
    .trim()
    .nonempty("Vui lòng nhập tài khoản")
    .min(6, "Nhập tối thiểu 6 ký tự")
    .max(20, "Nhập tối đa 20 ký tự"),
  matKhau: z.string().nonempty("Vui lòng nhập mật khẩu"),
  hoTen: z.string().nonempty("Vui lòng nhập họ tên"),
  soDT: z.string().min(1, "Vui lòng nhập số điện thoại"),
  maNhom: z.string().nonempty("Vui lòng nhập mã nhóm"),
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .email("Vui lòng nhập đúng email"),
  maLoaiNguoiDung: z.string().nonempty("Vui lòng nhập mã nhóm"),
});

export type RegisterSchAdminType = z.infer<typeof RegisterSchAdmin>;
