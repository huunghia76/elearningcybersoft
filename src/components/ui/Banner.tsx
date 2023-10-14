import { Carousel } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getBannerList } from "store/quanLyBanner";

export const Banner = ()=> {
  const dispatch = useAppDispatch();
  const { bannerList } = useSelector((state: RootState) => state.quanLyBanner);

  useEffect(() => {
    dispatch(getBannerList());
  }, [dispatch]);

 

  return (
    <Carousel >
      {bannerList?.map((value, index) => (
        <div key={index} style={{ height: "200px" }}>
          <img
            src={value?.hinhAnh}
            style={{ width: "100%", height: "500px" }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
