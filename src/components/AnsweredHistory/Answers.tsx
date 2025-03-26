import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Answer } from "../../models/Answer.model";
import "swiper/css";
import "swiper/css/free-mode";
import AnswerBox from "./AnswerBox";

export default Answers;

interface Props {
  className?: string;
  answers?: Answer[];
  getCategoryName: (categoryId: number) => string;
}

function Answers({ className, answers, getCategoryName }: Props) {
  const options: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 8,
    direction: "vertical",
    mousewheel: true,
    freeMode: true,
    modules: [FreeMode, Mousewheel],
  };

  return (
    <AnswersStyle className={className}>
      <Swiper {...options}>
        {answers?.map((answer) => {
          const categoryName = getCategoryName(answer.question.categories[0]);

          return (
            <SwiperSlide key={answer.id}>
              <AnswerBox
                questionId={answer.question.id}
                answerId={answer.id}
                title={answer.question.title}
                categoryImagePath={`../assets/categories/${categoryName}.png`}
                categoryName={categoryName}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </AnswersStyle>
  );
}

const AnswersStyle = styled.div`
  padding-top: 54px;
  height: 100%;

  .swiper {
    width: min(100%, 393px);
    height: 100%;
    padding: 0 25px;
    z-index: 0;
  }

  .swiper-slide {
    height: fit-content;
  }
`;
