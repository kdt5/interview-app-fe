import { JSX, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { moveToFront } from "../../utils/Array";
import { useQuestion } from "../../hooks/UseQuestion";
import { ALL_CATEGORIES } from "../../constants/Question";
import "swiper/css";

export default Categories;

function Categories(): JSX.Element {
  const { categories, getQuestions } = useQuestion();
  const [currentCategoryId, setCurrentCategoryId] =
    useState<number>(ALL_CATEGORIES);

  const options: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 5,
    mousewheel: true,
    freeMode: true,
    modules: [FreeMode, Mousewheel],
  };

  function onClickCategoryButton(id: number) {
    setCurrentCategoryId(id);
    getQuestions(id);
  }

  const currentCategoryIndex = categories.findIndex(
    (category) => category.id === currentCategoryId
  );
  const categoriesView = moveToFront([...categories], currentCategoryIndex);

  return (
    <CategoriesStyle>
      <Swiper {...options}>
        {categoriesView.map((category) => (
          <SwiperSlide key={category.id}>
            <button
              className={category.id === currentCategoryId ? "active" : ""}
              onClick={() => onClickCategoryButton(category.id)}
            >
              {category.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </CategoriesStyle>
  );
}

const CategoriesStyle = styled.div`
  position: absolute;
  top: 75%;
  left: 0%;

  .swiper {
    width: min(100%, 353px);
    margin: 0 20px;
  }

  .swiper-slide {
    width: fit-content;
  }

  button {
    height: 30px;
    border-radius: 15px;
    padding: 5px 10px;

    color: "#D1D1D1";
    background-color: "#FBFBFB";
    border: solid 1px #d1d1d1;

    &.active {
      color: "#FFFFFF";
      background-color: "#6EA1FF";
      border-color: #6ea1ff;
    }
  }
`;
