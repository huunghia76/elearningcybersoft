import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginSchema, LoginSchematype } from "schema";
import { RootState, useAppDispatch } from "store";
import { loginThunk } from "store/quanLyNguoiDung";
import { toast } from "react-toastify";
import { handleError, sleep } from "utils";
import { PATH } from "constant";
import { useState } from "react";

export const LoginTemplate = () => {
   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm<LoginSchematype>({
      mode: "onChange",
      resolver: zodResolver(LoginSchema),
   });
   const [isFetching, setIsFetching] = useState(false)
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { isFetchingLogin } = useSelector(
      (state: RootState) => state.quanLyNguoiDung
   );

   const onSubmit: SubmitHandler<LoginSchematype> = (value) => {
      dispatch(loginThunk(value))
         .unwrap()
         .then(() => {
            toast.success("Đăng nhập thành công");
            navigate("/");
         })
         .catch((err) => {
            console.log("err: ", err);
            return handleError(err);
         });
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2 className="font-600 !text-2xl text-white">Đăng nhập</h2>
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
         <Button
            className="!w-full !h-[48px] !mt-20 !font-600"
            htmlType="submit"
            type="primary"
            loading={isFetchingLogin}
         >
            Đăng nhập
         </Button>
         <Button
            className="!w-full !h-[48px] !mt-20 !font-600"
            type="default"
            loading={isFetching}
            onClick={async () => {
               setIsFetching(true)
               await sleep(500)
               setIsFetching(false)
               navigate(PATH.register)
            }}
         >
            Đăng ký
         </Button>
      </form>
   );
};
