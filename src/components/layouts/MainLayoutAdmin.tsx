import { Outlet } from "react-router-dom";
import { Col, Row } from "antd";
import { HeaderAdmin } from "components";

export const MainLayoutAdmin = () => {
  // const navigate = useNavigate();

  return (
    <main>
      <HeaderAdmin />
      <Row>
        <Col>{/* Component sidebar admin */}</Col>
        <Col>
          <div id="main-content">
            <Outlet />
          </div>
        </Col>
      </Row>
    </main>
  );
};
