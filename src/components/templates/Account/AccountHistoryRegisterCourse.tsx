
import { useEffect, useState } from 'react';
import { handleError } from "utils";
import { khoaHocServices, quanLyNguoiDungServices } from 'services';
import { UserByAccessToken } from "types";
import { Button, Card, Rate, Typography } from 'antd';
import { toast } from 'react-toastify';
import { useAuth } from 'hooks';

export const AccountHistoryRegisterCourse = () => {
   const [course, setCourse] = useState<UserByAccessToken>()
   const { user } = useAuth()


   const fectData = (async () => {
      try {
         const data = await quanLyNguoiDungServices.getUserByAccessToken()
         setCourse(data.data)
      } catch (error) {
         return handleError(error)
      }
   })

   const handleUnRegister = async (maKhoaHoc) => {
      // Hiển thị Toast Confirm
      toast.warn("Bạn có chắc chắn muốn hủy đăng ký khóa học này?", {
         position: "top-center",
         // autoClose: false, // Tắt tự động đóng
         closeOnClick: false, // Tắt đóng khi click
         closeButton: (
            <button
               className='bg-yellow-500 text-white'
               onClick={async () => {
                  // Xử lý xóa khi người dùng xác nhận
                  toast.dismiss(); // Đóng Toast Confirm
                  try {
                     const dataDangKy = {
                        maKhoaHoc,
                        taiKhoan: user?.taiKhoan
                     }
                     await khoaHocServices.huyGhiDanh(dataDangKy)
                     fectData();
                     toast.success("Hủy Đăng ký thành công!")
                  } catch (error) {
                     return handleError(error)
                  }
               }}
            >
               Xác nhận
            </button>
         ),
      });


   }
   useEffect(() => {
      fectData();
   }, [])


   return <>
      <p className="font-500 text-[26px]">Khóa học của tôi</p>
      {course?.chiTietKhoaHocGhiDanh?.map((item) => (
         <div key={item.maKhoaHoc}>
            <Card hoverable bodyStyle={{ padding: 0, overflow: 'hidden' }} className='!mb-[50px]'>
               <div className="md:space-between md:flex">
                  <img
                     alt="avatar"
                     src={item.hinhAnh}
                     className='sm:w-[100%] md:w-[40%] h-[250px] md:h-auto block'
                  />
                  <div style={{ padding: 32 }}>
                     <Typography.Title level={3}>
                        {item.tenKhoaHoc}
                     </Typography.Title>
                     <span>
                        <Rate disabled value={item.danhGia} />
                        {item.danhGia ? <span className="ant-rate-text"></span> : ''}
                     </span>
                     <Typography.Paragraph>
                        {item.moTa}
                     </Typography.Paragraph>
                     <Button type="primary"
                        onClick={() => { handleUnRegister(item.maKhoaHoc) }}
                     >
                        Hủy đăng ký
                     </Button>
                  </div>
               </div>
            </Card>
         </div>
      ))}
   </>;
};
