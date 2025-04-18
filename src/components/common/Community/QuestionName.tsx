import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SlArrowRight as ArrowIcon } from "react-icons/sl";
function QuestionName() {
  const location = useLocation();
  const inWeeklyAnswer = location.pathname === "/weeklypost";
  const isComplete = false;

  return (
    <QuestionNameStyle>
      {inWeeklyAnswer ? (
        isComplete ? (
          <>
            <CommonQuestion>Q</CommonQuestion>
            <Question>
              이번주 위클리 질문이 출력되는 곳 이번주 위클리 질문이 출력되는
              곳이번주 위클리 질문이 출력되는 곳이번주 위클리 질문이 출력되는 곳
            </Question>
          </>
        ) : (
          <>
            <WeeklyAnswerText>
              <span>이번주 위클리 질문</span>에 답변하지 않았어요
            </WeeklyAnswerText>
            <SlArrowRight />
          </>
        )
      ) : (
        <>
          <CommonQuestion>Q</CommonQuestion>
          <Question>
            내가 클릭해서 들어온 면접 필수 질문이 출력 되는 곳
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
  align-items: flex-start;
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
  margin-top: 3px;
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

const SlArrowRight = styled(ArrowIcon)`
  margin-top: 5px;
`;
export default QuestionName;
