import { Button, Col, Input, Row, Space, Table, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quanLyNguoiDungServices } from "services";
import { UserAdmin } from "types";

const columns: ColumnsType<UserAdmin> = [
  {
    title: "Tài khoản",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
    render: (text) => <a>{text}</a>,
  },
  // {
  //   title: "Mật khẩu",
  //   dataIndex: "password",
  //   key: "password",
  //   render: (text) => <a>{text}</a>,
  // },
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
    title: "Mã loại người dùng",
    dataIndex: "maLoaiNguoiDung",
    key: "maLoaiNguoiDung",
  },
  {
    title: "Action",
    key: "action",
    render: () => (<>
      <Space size="middle">
        <Tag color="success" >Ghi danh</Tag>
        <Tag color="warning">Sửa</Tag>
        <Tag color="error">Delete</Tag>
      </Space>
      </>
    ),
  },
];

export const QuanLyNguoiDungAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserAdmin[]>([]);
  console.log(userList);
  

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const quanLyNguoiDungResp = await quanLyNguoiDungServices.getUsers();
    const dataUsers: UserAdmin[] = quanLyNguoiDungResp.data;
    setUserList(dataUsers);
  };

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
          <Input placeholder="Nhập vào tài khoản hoặc tên người dùng" />
        </Col>
        <Col span={1}></Col>
        <Col span={3}>
          <Button>Thêm</Button>
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
        <Table columns={columns} dataSource={userList} />
      </Content>
    </>
  );
};
