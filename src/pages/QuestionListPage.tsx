import { JSX, useState } from "react";
import styled from "styled-components";
import Categories from "../components/QuestionList/Categories.tsx";
import Questions from "../components/QuestionList/Questions.tsx";
import { useQuestion } from "../hooks/UseQuestion.ts";
import { ALL_CATEGORIES } from "../constants/Question.ts";

export default QuestionListPage;

function QuestionListPage(): JSX.Element {
  const { categories, questions, setQuestions, getCategoryName } =
    useQuestion();
  const [activeCategoryId, setActiveCategoryId] =
    useState<number>(ALL_CATEGORIES);

  const onClickCategoryButton = (id: number) => {
    setActiveCategoryId(id);
    setQuestions(id);
  };

  return (
    <QuestionListStyle>
      <Categories
        activeCategoryId={activeCategoryId}
        categories={categories}
        onClickCategoryButton={onClickCategoryButton}
      />
      <Questions
        questions={questions}
        questionsType="Complex"
        getCategoryName={getCategoryName}
      />
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
