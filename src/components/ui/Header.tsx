import { useEffect, useState } from "react";
import styles from "../../assets/header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Popover } from "antd";
import { useAuth } from "hooks";
import { useAppDispatch } from "store";
import { Button, Input } from ".";
import { getUserByAccessTokenThunk, quanLyNguoiDungActions } from "store/quanLyNguoiDung";
import { PATH } from "constant";
import classNames from "classnames";

export const Header = () => {
   const navigate = useNavigate();
   const { accessToken, user } = useAuth();
   const dispatch = useAppDispatch();
   const [scroll, setSecroll] = useState<boolean>(false);
   const [inputSearch, setInputSearch] = useState<string>();

   const handleScroll = () => {
      if (window.pageYOffset > 50) {
         setSecroll(true);
         return;
      }
      setSecroll(false);
   };

   useEffect(() => {
      dispatch(getUserByAccessTokenThunk())
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [accessToken]);

   const [isActive, setIsActive] = useState(false);

   const toggleActiveClass = () => {
      setIsActive(!isActive);
   };

   return (
      <div className="App">
         <header
            className={classNames({
               "header-fixed App-header": scroll,
            })}
         >
            <nav className={`${styles.navbar}`}>
               <h1 className="brand font-700">
                  <span className="text-[var(--primary-color)] ">CYBER</span>ACADEMY
               </h1>
               <div className="flex">
                  <Input
                     id="search"
                     placeholder="Tìm kiếm tên khóa học"
                     onChange={(e) => {
                        setInputSearch(e.target.value);
                     }}
                  ></Input>
                  <Button
                     className="!h-[100%] mt-[9px] !py-[10px] !px-[15px] "
                     onClick={() => {
                        // let searchInput =
                        navigate(PATH.search + `?tenKhoaHoc=${inputSearch}`);
                     }}
                  >
                     <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
               </div>
               <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
                  <NavLink className="font-600 tracking-[.10em] p-4" to="/">
                     Khóa Học
                  </NavLink>
                  <NavLink className="font-600 tracking-[.10em] p-4" to="/">
                     Link
                  </NavLink>
                  <NavLink className="font-600 tracking-[.10em] p-4" to="/">
                     Link
                  </NavLink>
                  <NavLink
                     className="font-600 tracking-[.10em] p-4"
                     to="/client/Contact"
                  >
                     CONTACT
                  </NavLink>
                  <div>
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
                        <Popover
                           content={
                              <div className="p-10">
                                 <p className="font-600 text-16">{user?.hoTen}</p>
                                 <hr className="my-16" />
                                 <p
                                    className="text-16 cursor-pointer"
                                    onClick={() => navigate(PATH.account)}
                                 >
                                    Thông tin tài khoản
                                 </p>
                                 <hr className="my-16" />
                                 <Button
                                    className="!h-[46px]"
                                    type="primary"
                                    onClick={() => {
                                       dispatch(quanLyNguoiDungActions.logOut());
                                       navigate("/");
                                    }}
                                 >
                                    <i className="fa-solid fa-arrow-right-from-bracket text-16"></i>
                                    <span className="ml-10 font-500 text-16">
                                       Đăng xuất
                                    </span>
                                 </Button>
                              </div>
                           }
                           trigger="click"
                           arrow={false}
                        >
                           <Avatar
                              size="large"
                              className="!bg-[var(--primary-color)] cursor-pointer"
                           >
                              <i className="fa-regular fa-user text-20"></i>
                           </Avatar>
                        </Popover>
                     )}
                  </div>
               </ul>
               <div
                  className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
                  onClick={toggleActiveClass}
               >
                  <span className={`${styles.bar}`}></span>
                  <span className={`${styles.bar}`}></span>
                  <span className={`${styles.bar}`}></span>
               </div>
            </nav>
         </header>
      </div>
   );
};
