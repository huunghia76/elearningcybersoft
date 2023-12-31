import { Button, Col, Input, Modal, Row, Select, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { khoaHocServices, quanLyNguoiDungServices } from "services";
import { UserAdmin, khoaHoc } from "types";
import { handleError } from "utils";
import { Controller, useForm } from 'react-hook-form';

type searchCourse = {
   search: string
}

export const QuanLyNguoiDungAdmin = () => {
   const {
      token: { colorBgContainer },
   } = theme.useToken();


   const navigate = useNavigate();
   const [userList, setUserList] = useState<UserAdmin[]>([]);
   const [isModalOpen, setIsModalOpen] = useState({ isOpen: false, taiKhoan: null });

   const [searchUser, setSearchUser] = useState('')
   const dataUserList = userList?.filter(e => e.taiKhoan.toLowerCase().includes(searchUser?.toLowerCase()))

   const [courses, setGetCourse] = useState<khoaHoc[]>([])
   const [coursesNotRegisted, setGetCourseNotRegisted] = useState<khoaHoc[]>([])
   const [coursesRegisted, setCoursesRegisted] = useState<khoaHoc[]>([])

   const [loadingTable, setLoadingTable] = useState(false)

   const {
      control,
      watch,
   } = useForm<searchCourse>({
      mode: "onChange",
   });

   useEffect(() => {
      getUserList();
   }, []);

   useEffect(() => {
      getCourses()
      getCoursesRegisted()
      getCoursesNotRegister()
   }, [isModalOpen.isOpen])


   const getUserList = async () => {
      const quanLyNguoiDungResp = await quanLyNguoiDungServices.getUsers();
      const dataUsers: UserAdmin[] = quanLyNguoiDungResp.data;
      setUserList(dataUsers);
   };

   const getCourses = async () => {
      try {
         const layThongTinKhoaHoc = await quanLyNguoiDungServices.getKhoaHoc({ taiKhoan: isModalOpen?.taiKhoan });
         const dataKhoaHoc: khoaHoc[] = layThongTinKhoaHoc.data;
         setGetCourse(dataKhoaHoc)
      } catch (error) {
         console.log(error)
      } finally {
         setLoadingTable(false)
      }

   }

   const getCoursesRegisted = async () => {
      try {
         const layThongTinKhoaHoc = await quanLyNguoiDungServices.getKhoaHocRegisted({ taiKhoan: isModalOpen?.taiKhoan });
         const dataKhoaHoc: khoaHoc[] = layThongTinKhoaHoc.data;
         setCoursesRegisted(dataKhoaHoc)
      } catch (error) {
         console.log(error)
      } finally {
         setLoadingTable(false)
      }
   }



   const handleDeleteUser = async (value) => {
      try {
         const dataUser = value?.taiKhoan
         await quanLyNguoiDungServices.deleteUser(dataUser)
         toast.success("Xóa người dùng thành công!")
         getUserList();
      } catch (error) {
         return handleError(error)
       }
   
     }

      const showModal = (taiKhoan) => {
         setIsModalOpen({ isOpen: true, taiKhoan });
      };

      const handleOk = () => {
         setIsModalOpen({ isOpen: false, taiKhoan: null });
      };

      const handleCancel = () => {
         setIsModalOpen({ isOpen: false, taiKhoan: null });
      };

      const getCoursesNotRegister = async () => {
         const layThongTinKhoaHoc = await quanLyNguoiDungServices.getKhoaHocChuaGhiDanh({ taiKhoan: isModalOpen?.taiKhoan });
         const dataKhoaHoc: khoaHoc[] = layThongTinKhoaHoc.data;
         setGetCourseNotRegisted(dataKhoaHoc)
      }

      const handleConfirmCourse = async (value) => {
         setLoadingTable(true)
         try {
            await khoaHocServices.ghiDanhKhoaHoc({
               maKhoaHoc: value?.maKhoaHoc,
               taiKhoan: isModalOpen.taiKhoan,
            })
            await getCoursesRegisted()
            await getCourses()
            toast.success("Xác thực thành công")
         } catch (error) {
            setLoadingTable(false)
            toast.error("Xác thực không thành công")
         }


      }

      const handleCancelCourse = async (value) => {
         setLoadingTable(true)
         try {
            await khoaHocServices.huyGhiDanh({
               maKhoaHoc: value?.maKhoaHoc,
               taiKhoan: isModalOpen.taiKhoan,
            })
            await getCoursesRegisted()
            await getCourses()
            toast.success("Hủy thành công")
         } catch (error) {
            setLoadingTable(false)
            toast.error("Hủy không thành công")
         }

      }

      const handleRegisterCourse = async () => {
         setLoadingTable(true)
         try {
            await khoaHocServices.dangKyKhoaHoc({
               maKhoaHoc: watch("search"),
               taiKhoan: isModalOpen.taiKhoan,
            })
            await getCourses()
            toast.success("Ghi danh thành công")
         } catch (error) {
            setLoadingTable(false)
            toast.error("Ghi danh không thành công")
         }

      }

      const columns: ColumnsType<UserAdmin> = [
         {
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            key: "taiKhoan",
            render: (text) => <a>{text}</a>,
         },
         {
            title: "Họ tên",
            dataIndex: "hoTen",
            key: "hoTen",
         },
         {
            title: "Email",
            dataIndex: "email",
            key: "email",
         },
         {
            title: "SĐT",
            dataIndex: "soDt",
            key: "soDt",
         },
         {
            title: "Mã loại",
            dataIndex: "maLoaiNguoiDung",
            key: "maLoaiNguoiDung",
         },
         {
            title: "Action",
            key: "action",
            render: (value) => {
               return <>
                  <Space size="middle">
                     <Tag color="success" style={{ cursor: "pointer" }} onClick={() => showModal(value?.taiKhoan)}>Ghi danh</Tag>
                     <Tag color="warning" style={{ cursor: "pointer" }} onClick={() => navigate(`/admin/user/add?taiKhoan=${value.taiKhoan}`)}>Sửa</Tag>
                     <Tag color="error" style={{ cursor: "pointer" }} onClick={() => handleDeleteUser(value)}>Delete</Tag>
                  </Space>
               </>
            },
         },
      ];

      const columnsChuaGhidanh: ColumnsType<khoaHoc> = [
         
         {
            title: "Tên khóa học",
            dataIndex: "tenKhoaHoc",
            key: "tenKhoaHoc",
         },
         {
            title: "Action",
            key: "action",
            render: (value) => {
               return <>
                  <Space size="middle">
                     <Tag color="success" style={{ cursor: "pointer" }} onClick={() => handleConfirmCourse(value)}>Xác thực</Tag>
                     <Tag color="warning" style={{ cursor: "pointer" }} onClick={() => handleCancelCourse(value)}>Hủy</Tag >
                  </Space >
               </>
            }
         }
      ]

      const columnsGhidanh: ColumnsType<khoaHoc> = [
        
         {
            title: "Tên khóa học",
            dataIndex: "tenKhoaHoc",
            key: "tenKhoaHoc",
         },
         {
            title: "Action",
            key: "action",
            render: (value) => {
               return <>
                  <Space size="middle">
                     <Tag color="warning" style={{ cursor: "pointer" }} onClick={() => handleCancelCourse(value)}>Hủy</Tag >
                  </Space >
               </>
            }
         }
      ]

      return (

         <>
            <h1
               style={{
                  marginLeft: "100px",
                  fontSize: "20px",
                  textDecoration: "underline",
                  cursor: "pointer",
               }}
               onClick={() => navigate("/admin/user/add")}
            >
               Thêm người dùng
            </h1>
            <br />
            <Row>
               <Col span={2}></Col>
               <Col span={16}>
                  <Input placeholder="Nhập vào tài khoản để tìm kiếm" id="search" onChange={(e) => { setSearchUser(e.target.value) }} />
                  {/* <Input placeholder="Nhập vào tài khoản hoặc tên người dùng" /> */}
               </Col>
               <Col span={1}></Col>
               <Col span={3}>
               </Col>
            </Row>
            <Content
               style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
               }}
            >
               <Table columns={columns} dataSource={dataUserList} rowKey={(record: UserAdmin) => record?.taiKhoan} />
            </Content>
            <Modal title="Chọn khóa học" open={isModalOpen.isOpen} onOk={handleOk} onCancel={handleCancel} >
               <Row>
                  <Col span={18}>
                     <Controller
                        name="search"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <Select
                              showSearch
                              style={{ width: 350 }}
                              placeholder="Search to Select"
                              optionFilterProp="children"
                              value={value}
                              onChange={onChange}
                              filterOption={(input, option) => (option?.label ?? '').includes(input)}
                              filterSort={(optionA, optionB) =>
                                 (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                              }
                              options={coursesNotRegisted.map(e => ({ value: e.maKhoaHoc, label: e.tenKhoaHoc }))}
                           />)}
                     />
                  </Col>
                  <Col span={1}></Col>
                  <Col span={4}>
                     <Button onClick={handleRegisterCourse}>Ghi danh</Button>
                  </Col>
               </Row>
               <br />
               <Row>
                  <Col span={14}>
                     <h1>Khóa học chờ xác thực</h1>
                  </Col>
                  <Col span={2}>
                  </Col>
                  <Col span={8}>

                  </Col>
               </Row>
               <Table columns={columnsChuaGhidanh} dataSource={courses} rowKey={(record: khoaHoc) => record?.tenKhoaHoc} loading={loadingTable} />
               <br />
               <Row>
                  <Col span={14}>
                     <h1>Khóa học đã ghi danh</h1>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={8}>
                  </Col>
               </Row>
               <Table columns={columnsGhidanh} dataSource={coursesRegisted} rowKey={(record: khoaHoc) => record?.tenKhoaHoc} loading={loadingTable} />

            </Modal>
         </>
      );
   };
