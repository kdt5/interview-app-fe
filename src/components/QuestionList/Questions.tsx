import { JSX } from "react";
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
}

function Questions({ questions }: Props): JSX.Element {
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
            <QuestionBox question={question} />
          </SwiperSlide>
        ))}
      </Swiper>
    </QuestionStyle>
  );
}

const QuestionStyle = styled.div`
  padding-top: 1rem;

  .swiper {
    width: min(100%, 393px);
    height: 600px;
  }

  .swiper-slide {
    height: fit-content;
  }
`;
