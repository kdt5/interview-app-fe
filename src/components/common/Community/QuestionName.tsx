import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
function QuestionName() {
  const location = useLocation();
  const inWeeklyAnswer = location.pathname === "/weeklypost";

  return (
    <QuestionNameStyle>
      {inWeeklyAnswer ? (
        <>
          <WeeklyAnswerText>
            <span>이번주 위클리 질문</span>에 답변하지 않았어요
          </WeeklyAnswerText>
          <SlArrowRight></SlArrowRight>
        </>
      ) : (
        <>
          <CommonQuestion>Q</CommonQuestion>
          <Question>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quae
            eveniet commodi, doloremque,
          </Question>
        </>
      )}
    </QuestionNameStyle>
  );
}

const QuestionNameStyle = styled.div`
  height: fit-content;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommonQuestion = styled.span`
  background-color: #6ea1ff;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 30px;
  display: block;
`;

const Question = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  width: calc(100% - 35px);
`;

const WeeklyAnswerText = styled.p`
  font-size: 16px;
  display: block;
  span {
    color: #6ea1ff;
    font-size: 16px;
  }
`;

export default QuestionName;
