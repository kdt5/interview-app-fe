import styled from "styled-components";
import Clock from "../../../assets/Clock.png";
import AnswerCountProfile from "../../../assets/Profile_Small.png";
import { SlArrowRight as ArrowIcon } from "react-icons/sl";
import { Link } from "react-router-dom";

interface Props {
  category: string;
  title: string;
  date: string;
  answerCount?: number;
  isComplete?: boolean;
  linkTo?: string;
}

function WeeklyQuestionCard({
  category,
  title,
  date,
  answerCount,
  isComplete = true,
  linkTo = "/",
}: Props) {
  return (
    <>
      <WeeklyQuestionCardStyle>
        <WeeklyQuestionCategory>{category}</WeeklyQuestionCategory>
        <WeeklyQuestionTitle>{title}</WeeklyQuestionTitle>
        <WeeklyQuestionInfo>
          {
            <>
              <WeeklyQuestionDate>
                <img src={Clock} alt="" />
                <p>{date}</p>
              </WeeklyQuestionDate>
              <AnswerCount>
                <img src={AnswerCountProfile} alt="" />
                <p>{answerCount}명 답변</p>
              </AnswerCount>
              {!isComplete && (
                <WeeklyQuestionAnswer>
                  <Link to={linkTo} className="go-to-answer-button">
                    지금 답변하기
                  </Link>
                  <SlArrowRight />
                </WeeklyQuestionAnswer>
              )}
            </>
          }
        </WeeklyQuestionInfo>
      </WeeklyQuestionCardStyle>
    </>
  );
}

const WeeklyQuestionCardStyle = styled.div`
  width: auto;
  height: fit-content;
  padding: 15px 20px;
  border-radius: 20px;
  background-color: #6ea1ff;
  box-shadow: 5px 5px 20px #a8a8a866;
  box-sizing: border-box;
  margin: 0 30px;
`;

const WeeklyQuestionCategory = styled.p`
  background-color: #bbd3ff;
  color: #fff;
  font-size: 14px;
  display: inline-block;
  padding: 2px 12px;
  border-radius: 30px;
  font-weight: 400;
`;

const WeeklyQuestionTitle = styled.h3`
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  margin: 10px 0 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`;

const WeeklyQuestionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WeeklyQuestionDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  p {
    color: #fff;
    font-weight: 400;
    font-size: 14px;
  }

  img {
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
`;

const WeeklyQuestionAnswer = styled.div`
  display: flex;
  align-items: center;

  .go-to-answer-button {
    color: #fff;
    font-weight: 400;
    font-size: 14px;
  }
`;

const AnswerCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  p {
    color: #fff;
    font-weight: 400;
    font-size: 14px;
  }

  img {
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
`;

const SlArrowRight = styled(ArrowIcon)`
  stroke: #fff;
  stroke-width: 40;
  fill: #fff;
  font-size: 12px;
  margin-left: 10px;
`;

export default WeeklyQuestionCard;
