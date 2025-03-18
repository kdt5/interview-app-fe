import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import Questions from "../components/QuestionList/Questions";
import { useQuestion } from "../hooks/UseQuestion";
import { useFavorite } from "../hooks/UseFavorite";

export default FavoriteQuestionListPage;

function FavoriteQuestionListPage() {
  const { getCategoryName } = useQuestion();
  const { favoriteQuestions } = useFavorite();
  const [currentTab, setCurrentTab] = useState("위클리");

  const titles: string[] = ["위클리", "기본"];

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  return (
    <FavoriteQuestionListStyle>
      <Tabs
        titles={titles}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      />
      <Questions
        className="questions"
        questions={favoriteQuestions}
        questionsType="Answered"
        getCategoryName={getCategoryName}
      />
    </FavoriteQuestionListStyle>
  );
}

const FavoriteQuestionListStyle = styled.div`
  width: 100%;
  height: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  .questions {
    padding-top: 68px;
  }
`;
