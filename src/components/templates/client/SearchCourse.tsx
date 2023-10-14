import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { khoaHocServices } from 'services';
import { handleError } from 'utils';
import { CourseItem } from 'components/ui/client/CourseItem';
import { Course } from 'types/QuanLyKhoaHoc';

export const SearchCourse = () => {
   const location = useLocation();
   const query = new URLSearchParams(location.search);
   const tenKhoaHoc = query.get("tenKhoaHoc");

   const [dataKhoaHoc, setDataKhoaHoc] = useState<Course[]>()

   useEffect(() => {
      async function fetchData() {
         try {
            const data = await khoaHocServices.getKhoaHoc(tenKhoaHoc)
            console.log("data: ", data.data);
            setDataKhoaHoc(data.data)
         } catch (error) {
            return handleError(error)
         }
      }
      fetchData()
   }, [tenKhoaHoc]);

   return (
      <div>
         <h2 className='font-600 text-20 pl-11 mt-5'>Hiển thị kết quả tìm kím</h2>
         <div className="flex justify-evenly flex-wrap">
            {
               dataKhoaHoc?.map((item) => (
                  <CourseItem key={item.maKhoaHoc} khoaHoc={item}></CourseItem>
               ))
            }
         </div>
      </div >
   )
}
