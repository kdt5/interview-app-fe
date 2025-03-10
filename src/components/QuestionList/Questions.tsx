import styled from "styled-components";
import QuestionBox from "./QuestionBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Question } from "../../models/Question.model";
import "swiper/css";
import "swiper/css/free-mode";

export default Questions;

interface Props {
  questions: Question[];
  getCategoryName: (categoryId: number) => string | undefined;
}

function Questions({ questions, getCategoryName }: Props) {
  const options: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 8,
    direction: "vertical",
    mousewheel: true,
    freeMode: true,
    modules: [FreeMode, Mousewheel],
  };

  return (
    <QuestionStyle>
      <Swiper {...options}>
        {questions.map((question) => (
          <SwiperSlide key={question.id}>
            <QuestionBox
              questionId={question.id}
              title={question.title}
              categoryImagePath={`../assets/categories/${question.categoryId}.png`}
              categoryName={getCategoryName(question.categoryId)}
            />
          </SwiperSlide>
        ))}
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
    padding: 0 30px;
  }

  .swiper-slide {
    height: fit-content;
  }
`;
