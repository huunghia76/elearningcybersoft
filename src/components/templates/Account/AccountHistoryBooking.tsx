import { useAppDispatch } from "store";
import { getUserByAccessTokenThunk } from "store/quanLyNguoiDung";
import { handleError } from "utils";
import { useState, useEffect } from 'react';
import { Table } from "antd";

export const AccountHistoryBooking = () => {
   const dispatch = useAppDispatch();
   const [infoTiket, setInfoTiket] = useState([])


   useEffect(() => {
      const thongTinDatVe = dispatch(getUserByAccessTokenThunk())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thongTinDatVe.then((res: any) => {
         setInfoTiket(res.payload.thongTinDatVe);
      }).catch(err => {
         return handleError(err)
      })
   }, [])
   const columns = [
      {
         title: 'Danh sách ghế',
         dataIndex: 'danhSachGhe',
         key: 'danhSachGhe',
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         render: (danhSachGhe: any) => danhSachGhe.map((item: any) => item.tenGhe).join(),
      },
      {
         title: 'Hình ảnh',
         dataIndex: 'hinhAnh',
         key: 'hinhAnh',
         render: (img: string) => (
            <>
               <img width={55} height={40} src={img} alt="" />
            </>
         )
      },
      {
         title: 'Giá Vé',
         dataIndex: 'giaVe',
         key: 'giaVe',
      },
      {
         title: 'Ngày đặt',
         dataIndex: 'ngayDat',
         key: 'ngayDat',
      },
      {
         title: 'Tên Phim',
         dataIndex: 'tenPhim',
         key: 'tenPhim',
      },
      {
         title: 'Thời lượng phim',
         dataIndex: 'thoiLuongPhim',
         key: 'thoiLuongPhim',
      },
   ];

   return <>
      <p className="font-500 text-[26px]">Lịch sử đặt vé</p>

      <Table dataSource={infoTiket} columns={columns} />;
   </>;
};
