export type Course = {
   biDanh: string;
   danhMucKhoaHoc: {
      maDanhMucKhoahoc: string;
      tenDanhMucKhoaHoc: string;
   };
   hinhAnh: string;
   luotXem: number;
   maKhoaHoc: string;
   maNhom: string;
   moTa: string;
   ngayTao: string;
   nguoiTao: {
      taiKhoan: string;
      hoTen: string;
      maLoaiNguoiDung: string;
      tenLoaiNguoiDung: string;
   };
   soLuongHocVien: 0;
   tenKhoaHoc: string;
};
export type CategoryCourse = {
   maDanhMuc:string;
   tenDanhMuc: string;
};
