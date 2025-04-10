import styled from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

interface Props {
  className?: string;
}
function CommonCategory({ className }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = [
    "전체",
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "REACT",
    "VUE",
    "NODE.JS",
    "FFFF",
  ];

  return (
    <CommonCategoryStyle>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        onSlideChange={() => console.log("slide changed")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {categories.map((cat, index) => (
          <SwiperSlide
            key={index}
            className={className}
            style={{ width: "auto" }}
            onClick={() => setSelectedIndex(index)}
          >
            <CategoryName className={selectedIndex === index ? "active" : ""}>
              {cat}
            </CategoryName>
          </SwiperSlide>
        ))}
      </Swiper>
    </CommonCategoryStyle>
  );
}

const CommonCategoryStyle = styled.div`
  padding: 0 30px;
`;

const CategoryName = styled.div`
  background-color: #fbfbfb;
  border: solid 1px #fbfbfb;
  color: #ccc;
  font-weight: 300;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 14px;
  width: fit-content;

  &.active {
    border: solid 1px #6ea1ff;
    color: #6ea1ff;
    font-weight: 500;
  }
`;

export default CommonCategory;
