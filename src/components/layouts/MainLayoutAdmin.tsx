
import { Outlet } from "react-router-dom";
import { Col, Row } from 'antd';

export const MainLayoutAdmin = () => {
   // const navigate = useNavigate();


   return (
      <main>
         {/* component Header admin */}
         <Row>
            <Col>
               {/* Component sidebar admin */}
            </Col>
            <Col>
               <div id="main-content">
                  <Outlet />
               </div>
            </Col>
         </Row>
      </main>
   );
};
