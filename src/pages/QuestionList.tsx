import { JSX, useState } from "react";
import styled from "styled-components";
import Categories from "../components/QuestionList/Categories.tsx";
import Questions from "../components/QuestionList/Questions.tsx";
import { useQuestion } from "../hooks/UseQuestion.ts";
import { ALL_CATEGORIES } from "../constants/Question.ts";

export default QuestionList;

function QuestionList(): JSX.Element {
  const { categories, questions, getQuestions, getCategoryName } =
    useQuestion();
  const [activeCategoryId, setActiveCategoryId] =
    useState<number>(ALL_CATEGORIES);

  const onClickCategoryButton = (id: number) => {
    setActiveCategoryId(id);
    getQuestions(id);
  };

  return (
    <QuestionListStyle>
      <Categories
        activeCategoryId={activeCategoryId}
        categories={categories}
        onClickCategoryButton={onClickCategoryButton}
      />
      <Questions questions={questions} getCategoryName={getCategoryName} />
    </QuestionListStyle>
  );
}

const QuestionListStyle = styled.div`
  width: 100%;
  height: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;
