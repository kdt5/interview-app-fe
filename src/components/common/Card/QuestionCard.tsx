import styled from "styled-components";

interface Props {
  category: string;
  title: string;
  date: string;
}

function QuestionCard({ category, title, date }: Props) {
  return (
    <>
      <QuestionCardStyle>
        <QuestionCategory>{category}</QuestionCategory>
        <QuestionTitle>{title}</QuestionTitle>
        <QuestionInfo>
          <QuestionDate>{date}</QuestionDate>
          <QuestionAnswer>지금 답변하기</QuestionAnswer>
        </QuestionInfo>
      </QuestionCardStyle>
    </>
  );
}

const QuestionCardStyle = styled.div`
  width: auto;
  height: fit-content;
  padding: 15px 20px;
  border-radius: 20px;
  background-color: #6ea1ff;
  box-shadow: 5px 5px 20px #a8a8a866;
  box-sizing: border-box;
  margin: 0 30px;
`;

const QuestionCategory = styled.p`
  background-color: #bbd3ff;
  color: #fff;
  font-size: 14px;
  display: inline-block;
  padding: 5px 15px;
  border-radius: 30px;
`;

const QuestionTitle = styled.h3`
  color: #fff;
  font-weight: 400 !important;
  margin: 10px 0 30px;
`;

const QuestionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionDate = styled.div`
  color: #fff;
  font-weight: 300 !important;
`;

const QuestionAnswer = styled.a`
  color: #fff;
  font-weight: 300 !important;
`;

export default QuestionCard;
