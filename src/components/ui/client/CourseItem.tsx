import { Card } from 'antd'
import { useNavigate } from 'react-router-dom';
import style from "../../../assets/HomeTemplate.module.css";

export const CourseItem = ({ khoaHoc }) => {
   const navigate = useNavigate();

   return (
      <Card
         hoverable
         onClick={() => navigate(`/course-detail?maKhoaHoc=${khoaHoc?.maKhoaHoc}`)}
         className={`!mt-20 Card ${style.Card}`}
         cover={<img alt="example" src={khoaHoc?.hinhAnh} />}
      >
         <Card.Meta
            title={khoaHoc?.tenKhoaHoc}
            description={khoaHoc?.moTa?.substring(0, 30)}
         />
      </Card>
   )
}
