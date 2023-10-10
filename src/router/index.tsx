import { RouteObject } from "react-router-dom";
import { PATH } from "constant";
import { AuthLayout, MainLayoutAdmin, MainLayoutClient, } from "components";
import { Account, Login, Register, Contact, Home, HomeAdmin } from "pages";

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
      ],
   },
   {
      path: "/admin",
      element: <MainLayoutAdmin />,
      children: [
         {
            index: true,
            element: <HomeAdmin />,
         },
         // add new page here
         
         // 
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