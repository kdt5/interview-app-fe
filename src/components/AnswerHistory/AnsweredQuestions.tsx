import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { AnsweredQuestion } from "../../models/Answer.model";
import "swiper/css";
import "swiper/css/free-mode";
import AnsweredQuestionBox from "./AnsweredQuestionBox";

export default AnsweredQuestions;

interface Props {
  className?: string;
  answeredQuestions?: AnsweredQuestion[];
  getCategoryName: (categoryId: number) => string;
}

function AnsweredQuestions({
  className,
  answeredQuestions,
  getCategoryName,
}: Props) {
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
        {answeredQuestions?.map((answeredQuestion) => {
          const categoryName = getCategoryName(
            answeredQuestion.question.categories[0].category.id
          );

          return (
            <SwiperSlide key={answeredQuestion.id}>
              <AnsweredQuestionBox
                questionId={answeredQuestion.question.id}
                answerId={answeredQuestion.id}
                title={answeredQuestion.question.title}
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
