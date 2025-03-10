import { JSX } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { moveToFront } from "../../utils/Array";
import { Category } from "../../models/Question.model";
import "swiper/css";

export default Categories;

interface Props {
  activeCategoryId: number;
  categories: Category[];
  onClickCategoryButton: (id: number) => void;
}

function Categories({
  activeCategoryId,
  categories,
  onClickCategoryButton,
}: Props): JSX.Element {
  const options: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 5,
    mousewheel: true,
    freeMode: true,
    modules: [FreeMode, Mousewheel],
  };

  const currentCategoryIndex = categories.findIndex(
    (category) => category.id === activeCategoryId
  );
  const categoriesView = moveToFront([...categories], currentCategoryIndex);

  return (
    <CategoriesStyle>
      <Swiper {...options}>
        {categoriesView.map((category) => (
          <SwiperSlide key={category.id}>
            <button
              className={category.id === activeCategoryId ? "active" : ""}
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
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  .swiper {
    width: 100%;
    max-width: 340px;
    margin: 0 20px;
    box-sizing: border-box;
  }

  .swiper-slide {
    width: fit-content;
  }

  button {
    height: 30px;
    border-radius: 15px;
    padding: 5px 10px;

    color: #d1d1d1;
    background-color: #fbfbfb;
    border: solid 1px #d1d1d1;

    &:hover {
      border-color: #6ea1ff;
    }

    &.active {
      color: #ffffff;
      background-color: #6ea1ff;
      border-color: #6ea1ff;
    }
  }
`;
