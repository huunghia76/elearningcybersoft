import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "components";
import { PATH } from "constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { quanLyNguoiDungServices } from "services";
import { handleError } from "utils";

export const RegisterTemplate = () => {
   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm<RegisterSchemaType>({
      mode: "onChange",
      resolver: zodResolver(RegisterSchema),
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
      try {
         await quanLyNguoiDungServices.register(values);
         toast.success("Đăng ký thành công!");
         navigate(PATH.login);
      } catch (err) {
         return handleError(err);
      }
   };
   return (
      <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
         <h2 className="font-600 !text-2xl">Đăng ký</h2>
         <Input
            className="mt-16"
            label="Tài khoản"
            placeholder="Tài khoản"
            id="taiKhoan"
            name="taiKhoan"
            error={errors?.taiKhoan?.message}
            register={register}
         />
         <Input
            className="mt-16"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            id="matKhau"
            name="matKhau"
            type="password"
            error={errors?.matKhau?.message}
            register={register}
         />
         <Input
            className="mt-16"
            label="Họ tên"
            placeholder="Họ tên"
            id="hoTen"
            name="hoTen"
            error={errors?.hoTen?.message}
            register={register}
         />

         <Input
            className="mt-16"
            label="Email"
            placeholder="Email"
            id="email"
            name="email"
            error={errors?.email?.message}
            register={register}
         />

         <Input
            className="mt-16"
            label="Số điện thoại"
            placeholder="Số điện thoại"
            id="soDT"
            name="soDT"
            error={errors?.soDT?.message}
            register={register}
         />

         <Input
            className="mt-16"
            label="Mã nhóm"
            placeholder="Mã nhóm"
            id="maNhom"
            name="maNhom"
            error={errors?.maNhom?.message}
            register={register}
         />

         <Button
            className="!w-full !h-[48px] !mt-20 !font-600"
            htmlType="submit"
            type="primary"
         >
            Đăng ký
         </Button>

      </form>
   );
};
