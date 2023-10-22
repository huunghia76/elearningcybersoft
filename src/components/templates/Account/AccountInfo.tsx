import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "components/ui";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountSchema, AccountSchemaType } from "schema/AccountSchema";
import { useAppDispatch } from "store";
import styled from "styled-components";
import { handleError } from "utils";
import { toast } from "react-toastify";
import { quanLyNguoiDungServices } from "services";
import { getUserByAccessTokenThunk } from 'store/quanLyNguoiDung/thunk';
import { UpdateUser } from "types";

export const AccountInfo = () => {
   const { user } = useAuth();
   const dispatch = useAppDispatch();
   const {
      reset,
      register,
      formState: { errors },
      handleSubmit,
   } = useForm<AccountSchemaType>({
      resolver: zodResolver(AccountSchema),
      mode: "onChange",
   });
   useEffect(() => {
      reset({
         ...user,
         soDT: user?.soDT,
      });
   }, [user, reset]);

   const onSubmit: SubmitHandler<AccountSchemaType> = async (values) => {
      if (values.taiKhoan) {
         try {
            await quanLyNguoiDungServices.updateAccount(values as UpdateUser)
            toast.success("Cập nhật thành công!");
            dispatch(getUserByAccessTokenThunk());
         } catch (errors) {
            return handleError(errors);
         }
      }

   };
   return (
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
         <p className="text-20 font-600">Thông tin tài khoản</p>
         <Inputs
            className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]: text-black"
            label="Tài khoản"
            name="taiKhoan"
            error={errors?.taiKhoan?.message}
            register={register}
         />
         <Inputs
            className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]: text-black"
            label="Mật Khẩu"
            name="matKhau"
            error={errors?.matKhau?.message}
            register={register}
         />
         <Inputs
            className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
            label="Họ và tên"
            name="hoTen"
            error={errors?.hoTen?.message}
            register={register}
         />
         <Inputs
            className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
            label="Email"
            name="email"
            error={errors?.email?.message}
            register={register}
         />
         <Inputs
            className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
            label="Số điện thoại"
            name="soDT"
            error={errors?.soDT?.message}
            register={register}
         />
         <Inputs
            className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
            label="Mã nhóm"
            name="maNhom"
            error={errors?.maNhom?.message}
            register={register}
         />
         <Inputs
            className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
            label="Mã loại người dùng"
            name="maLoaiNguoiDung"
            error={errors?.maLoaiNguoiDung?.message}
            register={register}
         />

         <div className="text-right mt-20">
            <Button htmlType="submit" type="primary" className="!h-[46px]">
               Hoàn thành chỉnh sửa
            </Button>
         </div>
      </form>
   );
};

const Inputs = styled(Input)`
  input {
    color: #111;
  }
`;
