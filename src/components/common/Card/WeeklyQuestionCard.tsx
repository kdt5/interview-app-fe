import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Clock from "../../../assets/Clock.png";
import AnswerCountProfile from "../../../assets/Profile_Small.png";
import { SlArrowRight as ArrowIcon } from "react-icons/sl";

interface Props {
  category: string;
  title: string;
  date: string;
  answercount?: number;
}

function WeeklyQuestionCard({ category, title, date, answercount }: Props) {
  const location = useLocation();
  const inWeeklyAnswer = location.pathname === "/community";
  const isComplete = false;

  return (
    <>
      <WeeklyQuestionCardStyle>
        <WeeklyQuestionCategory>{category}</WeeklyQuestionCategory>
        <WeeklyQuestionTitle>{title}</WeeklyQuestionTitle>
        <WeeklyQuestionInfo>
          {inWeeklyAnswer ? (
            isComplete ? (
              <>
                <WeeklyQuestionDate>
                  <img src={Clock} alt="" />
                  {date}
                </WeeklyQuestionDate>
                <AnswerCount>
                  <img src={AnswerCountProfile} alt="" />
                  {answercount}명 답변
                </AnswerCount>
              </>
            ) : (
              <>
                <WeeklyQuestionDate>
                  <img src={Clock} alt="" />
                  {date}
                </WeeklyQuestionDate>
                <WeeklyQuestionAnswer>
                  지금 답변하기 <SlArrowRight />
                </WeeklyQuestionAnswer>
              </>
            )
          ) : (
            <>
              <WeeklyQuestionDate>
                <img src={Clock} alt="" />
                {date}
              </WeeklyQuestionDate>
              <WeeklyQuestionAnswer>
                지금 답변하기 <SlArrowRight />
              </WeeklyQuestionAnswer>
            </>
          )}
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
  padding: 5px 15px;
  border-radius: 30px;
`;

const WeeklyQuestionTitle = styled.h3`
  color: #fff;
  font-weight: 400 !important;
  margin: 10px 0 30px;
`;

const WeeklyQuestionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WeeklyQuestionDate = styled.div`
  color: #fff;
  font-weight: 300 !important;
  display: flex;
  align-items: center;
  justify-content: left;
  img {
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }
`;

const WeeklyQuestionAnswer = styled.a`
  color: #fff;
  font-weight: 300 !important;
`;

const AnswerCount = styled.p`
  color: #fff;
  font-weight: 300 !important;
  display: flex;
  align-items: center;
  justify-content: left;
  img {
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }
`;

const SlArrowRight = styled(ArrowIcon)`
  margin: 0 0 2px 2px;
  fill: #fff;
`;

export default WeeklyQuestionCard;
