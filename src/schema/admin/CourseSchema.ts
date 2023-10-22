import { z } from "zod";

export const CourseSchema = z.object({
   maKhoaHoc: z
      .string()
      .trim()
      .nonempty("Vui lòng nhập mã khóa hoc"),
   tenKhoaHoc: z.string().nonempty("Vui lòng nhập tên khóa học"),
   moTa: z.string().min(1, "Vui lòng nhập mô tả"),
   luotXem: z.string().nonempty("Vui lòng nhập lượt xem"),
   danhGia: z
      .string()
      .nonempty("Vui lòng đánh giá"),
   hinhAnh:  z.instanceof(FileList),
   ngayTao: z.string().nonempty("Vui lòng nhập ngày tạo"),
   maDanhMucKhoaHoc: z.string().min(1,"Vui lòng chọn mã danh mục khóa học"),
   maNhom: z.string().nonempty("Vui lòng nhập mã nhóm"),
   taiKhoanNguoiTao: z.string().nonempty("Vui lòng nhập tài khoản người tạo"),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
