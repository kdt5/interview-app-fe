import styled from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePostCategories } from "../../../hooks/UsePost";

interface Props {
  className?: string;
  selectedCatId: number;
  setSelectedCatId: (catId: number) => void;
}
function CommonCategory({ className, selectedCatId, setSelectedCatId }: Props) {
  const { postCategories } = usePostCategories();
  const categories = [{ id: 0, name: "전체" }, ...postCategories];

  // const categories = [
  //   "전체",
  //   "HTML",
  //   "CSS",
  //   "JAVASCRIPT",
  //   "REACT",
  //   "VUE",
  //   "NODE.JS",
  //   "FFFF",
  // ];

  return (
    <CommonCategoryStyle>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        onSlideChange={() => console.log("slide changed")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className={className}
            style={{ width: "auto" }}
            onClick={() => setSelectedCatId(category.id)}
          >
            <CategoryName className={selectedCatId === category.id ? "active" : ""}>
              {category.name}
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
