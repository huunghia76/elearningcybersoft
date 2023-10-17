import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row, theme } from "antd";
import { MenuAdmin } from "components";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider } = Layout;

export const MainLayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tabMenu = query.get("menu");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={tabMenu === "course" ? ["course"] : ["user"]}
          onClick={(e) => navigate(`/admin/${e.key}?menu=${e.key}`)}
          items={[
            {
              key: "course",
              icon: <VideoCameraOutlined />,
              label: "Quản lý khóa học",
            },
            {
              key: "user",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row>
            <Col span={18}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col span={6}>
              <MenuAdmin />
            </Col>
          </Row>
        </Header>
        <br />
        <Outlet />
      </Layout>
    </Layout>
  );
};
