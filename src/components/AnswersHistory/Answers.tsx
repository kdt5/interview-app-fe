import styled from "styled-components";
import { FreeMode, Mousewheel } from "swiper/modules";
import QuestionBox from "../QuestionList/QuestionBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { Question } from "../../models/Question.model";
import "swiper/css";
import "swiper/css/free-mode";

export default Answers;

interface Props {
  questions: Question[];
}

function Answers({ questions }: Props) {
  const options: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 8,
    direction: "vertical",
    mousewheel: true,
    freeMode: true,
    modules: [FreeMode, Mousewheel],
  };

  const getCategoryName = (categoryId: number) => {
    return `${categoryId}`;
  };

  return (
    <AnswersStyle>
      <Swiper {...options}>
        {questions.map((question) => (
          <SwiperSlide key={question.id}>
            <QuestionBox
              questionId={question.id}
              title={`question ${question.title}`}
              categoryImagePath={`assets/logo.png`}
              categoryName={getCategoryName(question.categoryId)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </AnswersStyle>
  );
}

const AnswersStyle = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 68px;
  height: 100%;

  .swiper {
    width: min(100%, 393px);
    height: 100%;
    padding: 0 30px;
    z-index: 0;
  }

  .swiper-slide {
    height: fit-content;
  }
`;
