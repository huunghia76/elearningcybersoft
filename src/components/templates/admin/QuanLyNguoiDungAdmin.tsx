import { Button, Col, Input, Modal, Row, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quanLyNguoiDungServices } from "services";
import { AdminGhidanh, UserAdmin } from "types";
import { handleError } from "utils";
import { toast } from 'react-toastify';


export const QuanLyNguoiDungAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserAdmin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchUser, setSearchUser] = useState('')
  const dataUserList = userList?.filter(e => e.taiKhoan.toLowerCase().includes(searchUser?.toLowerCase()))

  useEffect(() => {
    getUserList();
  }, []);


  const getUserList = async () => {
    const quanLyNguoiDungResp = await quanLyNguoiDungServices.getUsers();
    const dataUsers: UserAdmin[] = quanLyNguoiDungResp.data;
    setUserList(dataUsers);
  };

  const handleDeleteUser = async (value) => {
    try {
      // const dataUser = {
      //   taiKhoan: value?.TaiKhoan
      // }
      const dataUser = value?.taiKhoan
      await quanLyNguoiDungServices.deleteUser(dataUser)
      toast.success("Xóa người dùng thành công!")
      getUserList();
    } catch (error) {
      return handleError(error)
    }

  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            <Tag color="success" style={{ cursor: "pointer" }} onClick={() => showModal()}>Ghi danh</Tag>
            <Tag color="warning" style={{ cursor: "pointer" }} onClick={() => navigate(`/admin/user/add?taiKhoan=${value.taiKhoan}`)}>Sửa</Tag>
            <Tag color="error" style={{ cursor: "pointer" }} onClick={() => handleDeleteUser(value)}>Delete</Tag>
          </Space>
        </>
      },
    },
  ];

  const columnsGhidanh: ColumnsType<AdminGhidanh> = [
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
      title: "Action",
      key: "action",
      render: () => {
        return <>
          <Space size="middle">
            <Tag color="success" style={{ cursor: "pointer" }}>Xác thực</Tag>
            <Tag color="warning" style={{ cursor: "pointer" }}>Hủy</Tag >
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
          {/* <Button>Thêm</Button> */}
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
      {/* 
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="Chọn người dùng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Row>
          <Col span={18}>
            <Input placeholder="Tên người dùng"></Input>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <Button>Ghi danh</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={14}>
            <h1>Học viên chờ xác thực</h1>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Input placeholder="Nhập tên hv hoặc sđt" />
          </Col>
        </Row>
        <Table columns={columnsGhidanh} rowKey={(record: AdminGhidanh) => record?.taiKhoan} />
        <br />
        <Row>
          <Col span={14}>
            <h1>Học viên đã tham gia khóa học </h1>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Input placeholder="Nhập tên hv hoặc sđt" />
          </Col>
        </Row>
        <Table columns={columnsGhidanh} rowKey={(record: AdminGhidanh) => record?.taiKhoan} />

      </Modal>
    </>
  );
};
