import { JSX, useState } from "react";
import styled from "styled-components";
import Categories from "../components/QuestionList/Categories.tsx";
import Questions from "../components/QuestionList/Questions.tsx";
import Header from "../components/common/Header.tsx";
import { useQuestion } from "../hooks/UseQuestion.ts";
import { ALL_CATEGORIES } from "../constants/Question.ts";

export default QuestionList;

function QuestionList(): JSX.Element {
  const { categories, questions, getQuestions } = useQuestion();
  const [activeCategoryId, setActiveCategoryId] =
    useState<number>(ALL_CATEGORIES);

  function onClickCategoryButton(id: number) {
    setActiveCategoryId(id);
    getQuestions(id);
  }

  return (
    <QuestionListStyle>
      <Header title="면접 필수 질문">
        <Categories
          activeCategoryId={activeCategoryId}
          categories={categories}
          onClickCategoryButton={onClickCategoryButton}
        />
      </Header>
      <Questions questions={questions} />
    </QuestionListStyle>
  );
}

const QuestionListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
