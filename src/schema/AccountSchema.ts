import { z } from "zod";

export const AccountSchema = z.object({
   taiKhoan: z.string().nonempty("Vui lòng nhập tài khoản"),
   matKhau: z.string().nonempty("Vui lòng nhập Mật Khẩu"),
   hoTen: z.string().nonempty("Vui lòng nhập họ tên"),
   email: z
      .string()
      .nonempty("Vui lòng nhập email")
      .email("Vui lòng nhập đúng email"),
   soDT: z.string().nonempty("Vui lòng nhập số điện thoại"),
   maNhom: z.string().nonempty("Vui lòng nhập mã nhóm"),
   maLoaiNguoiDung: z.string().nonempty("Vui lòng nhập mã người dùng"),
});

export type AccountSchemaType = z.infer<typeof AccountSchema>;
