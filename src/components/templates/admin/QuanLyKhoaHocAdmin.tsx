import { RootState, useAppDispatch } from "store"
import { useEffect, useState } from 'react';
import { getDanhMucKhoaHocThunk, getKhoaHocThunk } from "store/quanLyKhoaHoc";
import { useSelector } from "react-redux";
import { Col, Modal, Row, Select, Space, Table, Tag } from "antd";
import { CategoryCourse, Course } from "types/QuanLyKhoaHoc";
import { khoaHocServices } from "services";
import { handleError } from "utils";
import Search from "antd/es/input/Search";
import { toast } from "react-toastify";
import { Button, Input } from "components";
import { CourseSchema, CourseSchemaType } from "schema";
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "hooks";


export const QuanLyKhoaHocAdmin = () => {
   const [open, setOpen] = useState(false);
   const [openGhiDanh, setOpenGhiDanh] = useState(false);
   const { user } = useAuth()
   const [titleModal, setTitleModal] = useState<string>('');

   const [editingCourse, setEditingCourse] = useState<Course | null>(null);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleEdit = (item: any) => {
      console.log("item: ", item);
      // Lấy thông tin của khoá học cần chỉnh sửa
      setEditingCourse(item);
      reset({
         ...item,
         luotXem: item?.luotXem + '',
         danhGia: '0' as string,
         taiKhoanNguoiTao: item?.nguoiTao?.taiKhoan,
         maDanhMucKhoaHoc: item?.danhMucKhoaHoc?.maDanhMucKhoahoc
      });

      setTitleModal('Chỉnh sửa khoá học');
      setOpen(true);
   };
   const dispatch = useAppDispatch();

   const {
      handleSubmit,
      register,
      reset,
      setValue,
      control,
      formState: { errors },
   } = useForm<CourseSchemaType>({
      mode: "onChange",
      resolver: zodResolver(CourseSchema),
   });
   const onSubmit: SubmitHandler<CourseSchemaType> = async (values) => {

      if (editingCourse) {
         try {
            if (selectedImage) {
               await khoaHocServices.editCourse({ ...values, hinhAnh: selectedImage.target.files[0].name }).then(async (res) => {

                  const file = selectedImage.target.files[0];
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('tenKhoaHoc', res?.data?.tenKhoaHoc);

                  await khoaHocServices.addCourseLoadImg(formData);

               });
               toast.success("Chỉnh sửa thành công!");

               setDataSearch((prevData) => {
                  if (prevData) {
                     hanleSearch()
                     return prevData.filter(() => { })
                  }
                  dispatch(getKhoaHocThunk())
               });
            } else {
               await khoaHocServices.editCourse(values);
               toast.success("Chỉnh sửa thành công!");
               setOpen(false)
               setDataSearch((prevData) => {
                  if (prevData) {
                     hanleSearch()
                     return prevData.filter(() => { })
                  }
                  dispatch(getKhoaHocThunk())
               });
            }
            setOpen(false)
         } catch (err) {

            return handleError(err);
         }
      } else {
         try {
            if (selectedImage) {
               await khoaHocServices.addCourse({ ...values, hinhAnh: selectedImage.target.files[0].name }).then(async (res) => {

                  const file = selectedImage.target.files[0];
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('tenKhoaHoc', res?.data?.tenKhoaHoc);

                  await khoaHocServices.addCourseLoadImg(formData);
               });
            } else {
               await khoaHocServices.addCourse(values);
            }
            toast.success("Thêm mới thành công!");
            dispatch(getKhoaHocThunk())
         } catch (err) {
            return handleError(err);
         }
      }

   };

   const handleFileChange = (e) => {
      setSelectedImage(e);
   };
   const { khoaHocList, DanhMucKhoaHocList } = useSelector((state: RootState) => state.quanLyKhoaHoc)


   const renderImageColumn = (imageURL: string, alt: string) => (
      <img className="!w-[100px] !h-[60px]" src={imageURL} alt={alt} />
   );

   const [inputSearch, setInputSearch] = useState<string>()

   const [dataSearch, setDataSearch] = useState<Course[] | null>(null)


   // nếu datasearch ko có thì dùng dataList
   const dataSource = dataSearch ? dataSearch : khoaHocList?.filter((item: Course) => ({
      key: item.maKhoaHoc,
      name: item.tenKhoaHoc,
      slHocVien: item.soLuongHocVien,
      hinhAnh: item.hinhAnh,
   }))

   const dataCategory = DanhMucKhoaHocList?.map((item: CategoryCourse) => (
      {
         value: item?.maDanhMuc,
         label: item?.tenDanhMuc,
      }
   ))

   const hanleSearch = async () => {
      try {
         // call api search truyền vào inputSearch(state) khi nhấn 
         const dataState = await khoaHocServices.getKhoaHoc(inputSearch)
         setDataSearch(dataState?.data)
      } catch (error) {
         return handleError(error)
      }
   }
   const columns = [
      {
         title: 'MaKH',
         dataIndex: 'maKhoaHoc',
         key: 'maKhoaHoc',
      },
      {
         title: 'Name',
         dataIndex: 'tenKhoaHoc',
         key: 'tenKhoaHoc',
      },
      {
         title: 'Hình ảnh',
         dataIndex: 'hinhAnh',
         key: 'hinhAnh',
         render: (alt: string, record: Course) => renderImageColumn(record.hinhAnh, alt),
      },
      {
         title: 'SL Học Viên',
         dataIndex: 'soLuongHocVien',
         key: 'soLuongHocVien',
      },
      {
         title: "Action",
         key: "action",
         render: (item: Course) => (<>
            <Space size="middle">
               <Tag color="success" className="cursor-pointer"
                  onClick={async () => {
                     setOpenGhiDanh(true)
                  }}
               >Ghi danh</Tag>
               <Tag color="warning" className="cursor-pointer"
                  onClick={() => handleEdit(item)}
               >Sửa</Tag>
               <Tag color="error" className="cursor-pointer"
                  onClick={async () => {
                     // Hiển thị Toast Confirm
                     toast.warn(`Bạn có chắc chắn muốn xóa khóa học ${item.tenKhoaHoc} ?`, {
                        position: "top-center",
                        closeOnClick: true, // Tắt đóng khi click
                        closeButton: (
                           <button
                              className='bg-yellow-500 text-white'
                              onClick={async () => {
                                 // Xử lý xóa khi người dùng xác nhận
                                 toast.dismiss(); // Đóng Toast Confirm
                                 try {
                                    await khoaHocServices.xoaKhoaHoc(item.maKhoaHoc)
                                    toast.success("Xóa thành công !")

                                    setDataSearch((prevData) => {
                                       if (prevData) {
                                          return prevData.filter((dataItem) => dataItem.maKhoaHoc !== item.maKhoaHoc);
                                       }
                                       dispatch(getKhoaHocThunk())
                                    });
                                 } catch (error) {
                                    return handleError(error)
                                 }
                              }}
                           >
                              Xác nhận
                           </button>
                        ),
                     });

                  }}
               >Delete</Tag>
            </Space>
         </>
         ),
      }
   ];

   const [selectedImage, setSelectedImage] = useState(null);

   const today = new Date();
   const day = today.getDate();
   const month = today.getMonth() + 1;
   const year = today.getFullYear();
   const currentDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
   useEffect(() => {
      // Sử dụng setValue để gán giá trị mặc định cho trường "ngayTao"
      setValue("ngayTao", currentDate);
      setValue("taiKhoanNguoiTao", user?.taiKhoan);
      setValue("maNhom", "GP09");

      dispatch(getKhoaHocThunk())
      dispatch(getDanhMucKhoaHocThunk())

   }, [setValue, dispatch, reset, user, currentDate])

   return (
      <div className="p-5">
         <h2 className="text-2xl mb-5 font-600">Quản lý khóa học</h2>
         <Button className="mb-5" type="primary" size="large"
            onClick={() => {
               setEditingCourse(null)

               const btnReset = document.getElementById('resetForm')
               if (btnReset) {
                  btnReset.click()
               }
               setValue("ngayTao", currentDate);
               setValue("taiKhoanNguoiTao", user?.taiKhoan);
               setValue("maNhom", "GP09");
               setTitleModal('Thêm khóa học mới')
               setOpen(true)

            }}>
            <i className="fa-solid fa-plus mr-4"></i> Thêm</Button>
         {/* Modal form add và edit  */}
         <Modal
            title={titleModal}
            centered
            open={open}
            onOk={() => {
               document.getElementById('submitKhoaHoc').click()
               setOpen(true)
            }}
            onCancel={() => {
               setOpen(false)
            }}
            width={1200}
         >
            {/* form add and edit */}
            <form id='formKhoaHoc' onSubmit={handleSubmit(onSubmit)}>
               <Row gutter={{ xs: 8, sm: 24 }} >
                  <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập mã khóa học"
                        name="maKhoaHoc"
                        id="maKhoaHoc"
                        error={errors?.maKhoaHoc?.message}
                        register={register}
                     ></Input>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập tên khóa học"
                        name="tenKhoaHoc"
                        id="tenKhoaHoc"
                        error={errors?.tenKhoaHoc?.message}
                        register={register}
                     ></Input>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập Mô tả khóa học"
                        name="moTa"
                        id="moTa"
                        error={errors?.moTa?.message}
                        register={register}
                     ></Input>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập lượt xem"
                        name="luotXem"
                        id="luotXem"
                        type="number"
                        error={errors?.luotXem?.message}
                        register={register}
                     />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập đánh giá"
                        name="danhGia"
                        id="danhGia"
                        type="number"
                        error={errors?.danhGia?.message}
                        register={register}
                     />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                     <Controller

                        name="maDanhMucKhoaHoc"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <Select
                              defaultValue={{ value: '', label: 'Vui lòng chọn danh mục' }}
                              style={{ width: '100%' }}
                              size="large"
                              id="maDanhMucKhoaHoc"
                              value={value}
                              onChange={onChange}
                              options={dataCategory}

                           />)}
                     />
                     {errors ? <p className="text-red-500">{errors?.maDanhMucKhoaHoc?.message}</p> : ""}
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập ngày tạo"
                        name="ngayTao"
                        id="ngayTao"
                        error={errors?.ngayTao?.message}
                        register={register}
                     />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập tài khoản người tạo"
                        name="taiKhoanNguoiTao"
                        id="taiKhoanNguoiTao"
                        register={register}
                        error={errors?.taiKhoanNguoiTao?.message}
                     />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập URL hình ảnh"
                        label="Hình ảnh"
                        classNameLabel="!text-black !font-500"
                        name="hinhAnh"
                        id="hinhAnh"
                        type="file"
                        error={errors?.hinhAnh?.message}
                        onChange={(e) => handleFileChange(e)}
                        register={register}
                     />
                  </Col>
                  {/* ------- */}
                  <Col xs={24} sm={24} md={12} lg={12}>
                     <Input
                        placeholder="Nhập mã nhóm"
                        name="maNhom"
                        id="maNhom"
                        className="hidden"
                        register={register}
                     />
                  </Col>
                  <button id="submitKhoaHoc"
                     type="submit"
                  ></button>
                  <button id="resetForm" type="reset"></button>
               </Row>
            </form>
         </Modal>
         {/* Modal ghi danh */}
         <Modal
            title={titleModal}
            centered
            open={openGhiDanh}
            onOk={() => {
               document.getElementById('submitKhoaHoc').click()
               setOpenGhiDanh(true)
            }}
            onCancel={() => {
               setOpenGhiDanh(false)
            }}
            width={1200}
         >Đây là modal ghi danh</Modal>
         <Search
            placeholder="Search name"
            allowClear
            enterButton="Search"
            size="large"
            className="mb-5"
            onChange={(e) => {
               setInputSearch(e.target.value)
            }}
            onSearch={hanleSearch}
         />

         <Table dataSource={dataSource} columns={columns} rowKey={(record: Course) => record?.maKhoaHoc} />

      </div>
   )
}


