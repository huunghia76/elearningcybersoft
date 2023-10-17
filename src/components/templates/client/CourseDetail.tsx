import { Breadcrumb, Col, Divider, Row } from "antd"
import { Button } from "components"
import { useAuth } from "hooks"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { khoaHocServices } from "services"
import { Course } from "types/QuanLyKhoaHoc"
import { getAccessToken, handleError, sleep } from "utils"
import { toast } from 'react-toastify';
import { PATH } from "constant"

export const CourseDetail = () => {
   const { user } = useAuth()
   const location = useLocation();
   const query = new URLSearchParams(location.search);
   const maKhoaHoc = query.get("maKhoaHoc");
   const navigate = useNavigate()
   const dataDangKy = {
      maKhoaHoc,
      taiKhoan: user?.taiKhoan
   }
   const [course, setCourse] = useState<Course>()
   const fetchData = async () => {

      try {
         const data = await khoaHocServices.getKhoaHocById(maKhoaHoc);
         const dataCourse = data.data;

         setCourse(dataCourse)
      } catch (err) {
         return handleError(err);
      }


   }
   useEffect(() => {
      fetchData()
   }, [])
   return (<>
      <Breadcrumb
         className="!px-[3rem] !pt-5"
         items={[
            {
               href: '/',
               title: 'Home',
            },
            {
               title: <>{course?.tenKhoaHoc}</>,
            },
         ]}
      />
      <Row className="px-[3rem] py-[2rem]" >
         <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} >
            <img src={course?.hinhAnh} width={'100%'} height={'100px'} alt="" />
         </Col>
         <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
            <div className="pl-3">
               <Divider className="!px-0 !mb-2 !text-[24px]" orientation="left">{course?.tenKhoaHoc}</Divider>
               <div className="pl-24">
                  <i className="px-3 "><i className="fa-regular fa-clock"></i> {course?.ngayTao}</i>
                  <i className="fa-regular fa-eye ml-10"></i> {course?.luotXem}
               </div>
            </div>
            <div className="pl-6">
               <p className="mt-4">{course?.moTa}</p>
               <h2 className="font-600 ">Danh Mục khóa học:
                  <span className="text-red-600 pl-3">{course?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</span>
               </h2>
               <Button type="primary" className="!mt-[15px] !p-3 !h-[42px] !w-[100px]"
                  onClick={async () => {
                     const token = getAccessToken()
                     if (token) {
                        try {
                           await khoaHocServices.dangKyKhoaHoc(dataDangKy)
                           toast.success("Đăng ký thành công")
                        } catch (error) {
                           return handleError(error)
                        }
                     } else {
                        toast.warning("Đăng nhập để đăng ký !")
                       await sleep(1000)
                        navigate(PATH.login)
                     }
                  }}
               >Đăng ký</Button>
            </div>

         </Col>
      </Row >
   </>
   )
}
