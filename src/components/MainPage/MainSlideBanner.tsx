import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import MainBannerImage01 from "../../assets/SlideBanner-01.png";
import MainBannerImage02 from "../../assets/SlideBanner-02.png";
import MainBannerImage03 from "../../assets/SlideBanner-03.png";
import MainBannerImage04 from "../../assets/SlideBanner-04.png";
import styled from "styled-components";
const MainSlideBanner = () => {
  return (
    <MainSlideBannerStyle>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ type: "fraction" }}
      >
        <SwiperSlide>
          <img
            src={MainBannerImage01}
            alt="배너 1"
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={MainBannerImage02}
            alt="배너 2"
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={MainBannerImage03}
            alt="배너 3"
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={MainBannerImage04}
            alt="배너 4"
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
      </Swiper>
    </MainSlideBannerStyle>
  );
};

const MainSlideBannerStyle = styled.div`
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  max-width: 380px;
  position: relative;
  margin-top: 30px;

  .swiper-pagination-fraction {
    background: #00000052;
    color: #fff;
    font-size: 12px;
    border-radius: 8px;
    position: relative;
    bottom: 25px;
    width: 32px;
    float: right;
    margin-right: 8px;

    span {
      color: #fff;
      font-weight: 400;
    }
  }
`;

export default MainSlideBanner;
