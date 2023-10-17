import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { PATH } from "constant";
import { useAuth } from "hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { getUserByAccessTokenThunk, quanLyNguoiDungActions } from "store/quanLyNguoiDung";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const MenuAdmin: React.FC = () => {
  const { accessToken, user } = useAuth();
  const dispatch = useAppDispatch();

  const items: MenuItem[] = [
    // getItem("Chào Hoài", "sub1", <UserOutlined />, [
    getItem(`Chào ${user?.hoTen}`, "sub1", <UserOutlined />, [
      getItem("Cập nhật thông tin", "1"),
      getItem("Đăng xuất", "2"),
    ]),
  ];
  // const [theme, setTheme] = useState<MenuTheme>("light");
  const [current, setCurrent] = useState("1");
  const navigate = useNavigate();

  const handleChangeMenu: MenuProps["onClick"] = async (e) => {
    console.log("click ", e);

    if (e.key === "2") {
      dispatch(quanLyNguoiDungActions.logOut());
      dispatch(getUserByAccessTokenThunk());
      navigate(PATH.login);
    } else {
      navigate("/admin/user/update");
    }
    setCurrent(e.key);
  };

  return (
    <>
      {!accessToken && (
        <p className="flex items-center font-600">
          <i className="fa-solid fa-user text-20"></i>
          <span
            className="ml-10 cursor-pointer hover:text-[var(--primary-color)]"
            onClick={() => navigate(PATH.login)}
          >
            Đăng nhập
          </span>
          <span className="inline-block h-[24px] w-[2px] bg-black mx-6"></span>
          <span
            className="cursor-pointer hover:text-[var(--primary-color)]"
            onClick={() => navigate(PATH.register)}
          >
            Đăng ký
          </span>
        </p>
      )}
      {!!accessToken && (
        <Menu
          // theme={theme}
          onClick={handleChangeMenu}
          style={{ width: 200 }}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      )}
    </>
  );
};
