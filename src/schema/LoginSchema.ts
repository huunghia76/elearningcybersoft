import { z } from "zod";

export const LoginSchema = z.object({
   taiKhoan: z.string().nonempty('Vui lòng nhập tài khoản'),
   matKhau: z.string().nonempty('Vui lòng nhập mật khẩu'),
})

export type LoginSchematype = z.infer<typeof LoginSchema>