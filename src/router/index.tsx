import { PATH } from "constant";
import { RouteObject } from "react-router-dom";

import {
   AccountInfo,
   AddUserForm,
   AuthLayout,
   CourseDetail,
   MainLayoutAdmin,
   MainLayoutClient,
   QuanLyKhoaHocAdmin,
   QuanLyNguoiDungAdmin,
   SearchCourse,
} from "components";
import { Account, Contact, Home, Login, Register } from "pages";

export const router: RouteObject[] = [
   {
      path: "/",
      element: <MainLayoutClient />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: PATH.account,
            element: <Account />,
         },
         {
            path: PATH.contact,
            element: <Contact />,
         },
         {
            path: PATH.courseDetail,
            element: <CourseDetail />,
         },
         {
            path: PATH.search,
            element: <SearchCourse />,
         },
      ],
   },
   {
      path: "/admin",
      element: <MainLayoutAdmin />,
      children: [
         {
            path: "/admin/user",
            element: <QuanLyNguoiDungAdmin />,
         },
         {
            path: "/admin/user/add",
            element: <AddUserForm />,
         },
         {
            path: "/admin/user/update",
            element: <AccountInfo></AccountInfo>,
         },
         {
            path: PATH.courseAdmin,
            index: true,
            element: <QuanLyKhoaHocAdmin></QuanLyKhoaHocAdmin>,
         },
      ],
   },
   {
      element: <AuthLayout />,
      children: [
         {
            path: PATH.login,
            element: <Login />,
         },
         {
            path: PATH.register,
            element: <Register />,
         },
      ],
   },
];
