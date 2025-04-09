import styled from "styled-components";

interface Props {
  category: string;
  title: string;
  date: string;
}

function WeeklyQuestionCard({ category, title, date }: Props) {
  return (
    <>
      <WeeklyQuestionCardStyle>
        <WeeklyQuestionCategory>{category}</WeeklyQuestionCategory>
        <WeeklyQuestionTitle>{title}</WeeklyQuestionTitle>
        <WeeklyQuestionInfo>
          <WeeklyQuestionDate>{date}</WeeklyQuestionDate>
          <WeeklyQuestionAnswer>지금 답변하기</WeeklyQuestionAnswer>
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
`;

const WeeklyQuestionAnswer = styled.a`
  color: #fff;
  font-weight: 300 !important;
`;

export default WeeklyQuestionCard;
