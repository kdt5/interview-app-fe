import styled from "styled-components";
import QuestionBox from "./QuestionBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Question } from "../../models/Question.model";
import "swiper/css";
import "swiper/css/free-mode";

export default Questions;

export type QuestionsType = "Answered" | "Complex";

interface Props {
  className?: string;
  questions: Question[];
  questionsType: QuestionsType;
  getCategoryName: (categoryId: number) => string;
}

function Questions({
  className,
  questions,
  questionsType,
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
    <QuestionStyle className={className}>
      <Swiper {...options}>
        {questions.map((question) => {
          const categoryName = getCategoryName(question.categories[0]);

          return (
            <SwiperSlide key={question.id}>
              <QuestionBox
                questionId={question.id}
                title={question.title}
                categoryImagePath={`../assets/categories/${question.categories[0]}.png`}
                categoryName={categoryName}
                isAnswered={
                  questionsType === "Answered" ? false : question.isAnswered
                }
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </QuestionStyle>
  );
}

const QuestionStyle = styled.div`
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
