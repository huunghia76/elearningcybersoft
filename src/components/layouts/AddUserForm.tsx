import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Select } from "antd";
import { Input } from "components";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchAdmin, RegisterSchAdminType } from "schema";
import { quanLyNguoiDungServices } from "services";
import { UserAdmin } from "types";
import { handleError } from "utils";

const options = [
  { value: "GV", label: "Giảng viên" },
  { value: "HV", label: "Học viên" },
];

export const AddUserForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    // getValues,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RegisterSchAdminType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchAdmin),
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const taiKhoan = query.get("taiKhoan");

  useEffect(() => {
    if (taiKhoan) {
      handleGetUser()
    }
  }, [])



  const handleGetUser = async () => {
    try {
      const resp = await quanLyNguoiDungServices.getUser(taiKhoan)
      const dataUsers: UserAdmin = resp.data[0];

      setValue("taiKhoan", dataUsers["taiKhoan"])
      setValue("matKhau", dataUsers["matKhau"])
      setValue("soDT", dataUsers["soDt"])
      setValue("maLoaiNguoiDung", dataUsers["maLoaiNguoiDung"])
      setValue("hoTen", dataUsers["hoTen"])
      setValue("email", dataUsers["email"])
      setValue("maNhom", "GP01")

      console.log({ resp, dataUsers });

    } catch (error) {
      console.log(error)
    }
  }
  // let defaultValues = taiKhoan ? {
  //   taiKhoan: 
  // } : {}

  const onSubmit: SubmitHandler<RegisterSchAdminType> = async (values) => {
    try {
      if (!taiKhoan) {
        await quanLyNguoiDungServices.addUser(values);
        toast.success("Đăng ký thành công!");
        reset();
      } else {
        await quanLyNguoiDungServices.updateUser(values);
        toast.success("Cập nhật thành công!");
      }

    } catch (err) {
      return handleError(err);
    }
  };

  return (
    <div>
      <h1
        style={{
          marginLeft: "40px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Thêm người dùng
      </h1>
      <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col span={10} style={{ marginLeft: "40px" }}>
            {taiKhoan ?
              <div className={"mt-16"}>
                <label className={`text-white ` + "!text-black"} htmlFor={"taiKhoan"}>
                  Tài khoản
                </label>
                <input
                  placeholder={"Tài khoản"}
                  className="p-10 mt-8 w-full text-white rounded-6 bg-[#333]"
                  value={getValues("taiKhoan")}
                />
              </div>
              :
              <Input
                className="mt-16"
                classNameLabel="!text-black"
                label="Tài khoản"
                placeholder="Tài khoản"
                id="taiKhoan"
                name="taiKhoan"
                error={errors?.taiKhoan?.message}
                register={register}
              />}

          </Col>
          <Col span={10} style={{ marginLeft: "40px" }}>
            <Input
              className="mt-16"
              classNameLabel="!text-black"
              label="Mật khẩu"
              placeholder="Mật khẩu"
              id="matKhau"
              name="matKhau"
              type="password"
              error={errors?.matKhau?.message}
              register={register}
            />
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{ marginLeft: "40px" }}>
            <Input
              className="mt-16"
              classNameLabel="!text-black"
              label="Họ tên"
              placeholder="Họ tên"
              id="hoTen"
              name="hoTen"
              error={errors?.hoTen?.message}
              register={register}
            />
          </Col>
          <Col span={10} style={{ marginLeft: "40px" }}>
            <Input
              className="mt-16"
              classNameLabel="!text-black"
              label="Email"
              placeholder="Email"
              id="email"
              name="email"
              error={errors?.email?.message}
              register={register}
            />
          </Col>
        </Row>
        <Row>
          <Col span={10} style={{ marginLeft: "40px" }}>
            <Input
              className="mt-16"
              classNameLabel="!text-black"
              label="Mã nhóm"
              placeholder="Mã nhóm"
              id="maNhom"
              name="maNhom"
              error={errors?.maNhom?.message}
              register={register}
            />
          </Col>
          <Col span={10} style={{ marginLeft: "40px" }}>
            <Input
              className="mt-16"
              classNameLabel="!text-black"
              label="Số điện thoại"
              placeholder="Số điện thoại"
              id="soDT"
              name="soDT"
              error={errors?.soDT?.message}
              register={register}
            />
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <Controller
              defaultValue={
                watch("maLoaiNguoiDung") ? watch("maLoaiNguoiDung") : "GV"
              }
              name="maLoaiNguoiDung"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  style={{
                    width: "490px",
                    height: "40px",
                    marginTop: "40px",
                    marginLeft: "40px",
                  }}
                  value={value}
                  options={options}
                  onChange={onChange}
                />
              )}
            />
            {/* <Select
              defaultValue="GV"
              style={{
                width: "490px",
                height: "40px",
                marginTop: "40px",
                marginLeft: "40px",
              }}
              name="maLoaiNguoiDung"
              onChange={handleChange}
              options={[
                { value: "GV", label: "Giảng viên" },
                { value: "HV", label: "Học viên" },
              ]}
            /> */}
          </Col>
          <Col span={10} style={{ marginLeft: "80px", marginTop: "10px" }}>
            <Row>
              {
                !taiKhoan ? <Col span={4}>
                  <Button
                    className="!w-[80px] !h-[40px] !mt-30 !font-400"
                    htmlType="submit"
                    type="primary"
                  >
                    Thêm
                  </Button>
                </Col>
                  :
                  <Col span={4}>
                    <Button
                      className="!w-[80px] !h-[40px] !mt-30 !font-400"
                      htmlType="submit"
                      type="primary"
                      style={{ marginLeft: "40px" }}
                    >
                      Lưu
                    </Button>
                  </Col>
              }
            </Row>
          </Col>
        </Row>
      </form>
      <br />
      <br />
      <Link
        to={"/admin/user"}
        style={{
          marginLeft: "40px",
          fontSize: "20px",
          cursor: "pointer",
          textDecoration: "underline",
          color: "black",
        }}
      >
        Trở lại
      </Link>
      <br />
      <br />
    </div>
  );
};
