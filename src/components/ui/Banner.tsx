import { Carousel } from "antd";


function Banner() {
   const bannerList = [
      { hinhAnh: "./images/banner1.jpg" },
      { hinhAnh: "./images/banner2.jpg" },
      { hinhAnh: "./images/banner3.jpg" },
   ];
   
   return (
      <Carousel >
         {bannerList?.map((value, index) => (
            <div key={index} style={{ height: "200px" }}>
               <img
                  src={value?.hinhAnh}
                  style={{ width: "100%", height: "600px" }}
               />
            </div>
         ))}
      </Carousel>
   );
}

export default Banner;
