import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { AnsweredQuestion } from "../../models/Answer.model";
import "swiper/css";
import "swiper/css/free-mode";
import AnswerBox from "./AnswerBox";

export default AnsweredQuestions;

interface Props {
  className?: string;
  answeredQuestions?: AnsweredQuestion[];
}

function AnsweredQuestions({
  className,
  answeredQuestions,
}: Props) {
  const options: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 8,
    direction: "vertical",
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
    freeMode: {
      enabled: true,
      sticky: false,
    },
    modules: [FreeMode, Mousewheel],
  };

  return (
    <AnswersStyle className={className}>
      <Swiper {...options}>
        {answeredQuestions?.map((answeredQuestion) => {

          return (
            <SwiperSlide key={answeredQuestion.id}>
              <AnswerBox
                questionId={answeredQuestion.question.id}
                question={answeredQuestion.question}
                answerId={answeredQuestion.id}
                content={answeredQuestion.content}
                viewCount={answeredQuestion.viewCount}
                favoriteCount={answeredQuestion.favoriteCount}
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
