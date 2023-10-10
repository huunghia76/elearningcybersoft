import { Col, Row } from "antd";
import { SimpleMap } from "components";

export const ContactTemplate = () => {
  return (
    <div>
      <h1 className="text-[37px] font-700 text-center py-20">CONTACT</h1>
      <Row className="px-11">
        <Col span={12}>
          <h3 className="text-[25px] font-600">GET IN TOUCH!</h3>
          <hr className="w-32 border-red-600 my-8"/>
          <h3 className="text-[20px]">CYBERMOVIE: Luôn có những chương trình khuyến mãi, ưu đãi, quà tặng vô cùng hấp dẫn như giảm giá vé, tặng vé xem phim miễn phí, tặng Combo, tặng quà phim…  dành cho các khách hàng.</h3>
          <div className="mt-5">
            <p className="text-[17px] pb-5 ">
              <i className="mr-5 fa-solid fa-location-dot" />
              1078 Lê Văn Lương, Phước Kiển, Nhà Bè, Thành phố Hồ Chí Minh, Việt
              Nam
            </p>
            <p className="text-[17px] pb-5 ">
              <i className="mr-5 fa-solid fa-phone" />
              (657) 123-456
            </p>
            <p className="text-[17px] pb-5 ">
              <i className="mr-5 fa-regular fa-envelope" />
              the1987.vn@gmail.com
            </p>
          </div>
        </Col>
        <Col span={12}>
          <SimpleMap />
        </Col>
      </Row>
    </div>
  );
};
