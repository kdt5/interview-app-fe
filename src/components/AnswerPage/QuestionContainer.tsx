import styled from "styled-components";

interface Props {
  title: string;
}

function QuestionContainer({ title }: Props) {
  return (
    <QuestionContainerStyle>
      <p className="date-box">25년 3월 4주차 질문</p>
      <h2 className="question-title">{title}</h2>
    </QuestionContainerStyle>
  );
}

const QuestionContainerStyle = styled.div`
  margin: 0 auto;
  text-align: center;

  .date-box {
    margin: 20px 0;
    font-weight: 500;
    color: #888888;
    font-size: 12px;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    padding: 12px 32px;
    display: inline-block;
  }

  .question-title {
    font-size: 16px;
    font-weight: 500;
    width: 250px;
    margin: 10px auto 45px auto;
    word-break: keep-all;
  }
`;

export default QuestionContainer;
