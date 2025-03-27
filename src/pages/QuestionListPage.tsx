import { JSX, useState } from "react";
import styled from "styled-components";
import Categories from "../components/QuestionList/Categories.tsx";
import Questions from "../components/QuestionList/Questions.tsx";
import { useQuestions } from "../hooks/UseQuestions.ts";
import { ALL_CATEGORIES, Position, Positions } from "../constants/Question.ts";
import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/UseCategory.ts";

export default QuestionListPage;

function QuestionListPage(): JSX.Element {
  const { position } = useParams<{ position: Position }>();

  if (position === undefined || !Positions.includes(position)) {
    throw new Error("Position is not defined");
  }

  const { categories, getCategoryName } = useCategory(position);
  const { questions, updateQuestions } = useQuestions(position);

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
