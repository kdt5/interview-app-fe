import { JSX, useState } from "react";
import styled from "styled-components";
import Categories from "../components/QuestionList/Categories.tsx";
import Questions from "../components/QuestionList/Questions.tsx";
import { useQuestions } from "../hooks/UseQuestions.ts";
import { ALL_CATEGORIES } from "../constants/Question.ts";
import { useParams } from "react-router-dom";
import { Position } from "../api/Question.api.ts";

export default QuestionListPage;

function QuestionListPage(): JSX.Element {
  const { position } = useParams<{ position: string }>();

  const { categories, questions, updateQuestions, getCategoryName } =
    useQuestions((position ? position : "frontend") as Position);

  const [activeCategoryId, setActiveCategoryId] =
    useState<number>(ALL_CATEGORIES);

  const onClickCategoryButton = (categoryId: number) => {
    setActiveCategoryId(categoryId);
    updateQuestions(categoryId);
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
