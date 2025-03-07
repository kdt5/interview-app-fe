import { JSX } from "react";
import styled from "styled-components";
import Categories from "../components/QuestionList/Categories.tsx";
import Questions from "../components/QuestionList/Questions.tsx";
import Header from "../components/common/Header.tsx";

export default QuestionList;

function QuestionList(): JSX.Element {
  return (
    <QuestionListStyle>
      <Header title="면접 필수 질문">
        <Categories />
      </Header>
      <Questions />
    </QuestionListStyle>
  );
}

const QuestionListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
