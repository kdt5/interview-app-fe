import styled from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { useCategory } from "../../../hooks/UseCategory";

interface Props {
  className?: string;
  onSelectCategory: (categoryId: number | null) => void;
}

function CommonCategory({ className, onSelectCategory }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { categories, getCategoryName } = useCategory();

  return (
    <CommonCategoryStyle>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        onSlideChange={() => console.log("slide changed")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide
          className={className}
          style={{ width: "auto" }}
          onClick={() => {
            setSelectedIndex(0);
            onSelectCategory(null);
          }}
        >
          <CategoryName className={selectedIndex === 0 ? "active" : ""}>
            전체
          </CategoryName>
        </SwiperSlide>
        {categories
          .filter((cat) => cat.id !== -1)
          .map((cat, index) => (
            <SwiperSlide
              key={cat.id}
              className={className}
              style={{ width: "auto" }}
              onClick={() => {
                setSelectedIndex(index + 1);
                onSelectCategory(cat.id);
              }}
            >
              <CategoryName
                className={selectedIndex === index + 1 ? "active" : ""}
              >
                {getCategoryName(cat.id)}
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
