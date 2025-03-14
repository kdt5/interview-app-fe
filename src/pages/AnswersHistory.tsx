import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import { Question } from "../models/Question.model";
import Questions from "../components/QuestionList/Questions";
import { useQuestion } from "../hooks/UseQuestion";

export default AnswersHistory;

function AnswersHistory() {
  const { getCategoryName } = useQuestion();
  const [currentTab, setCurrentTab] = useState("위클리");

  const titles: string[] = ["위클리", "기본"];

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  const questions: Question[] = [
    {
      id: 1,
      categoryId: 1,
      title: "title1",
      isAnswered: false,
    },
    {
      id: 2,
      categoryId: 2,
      title: "title2",
      isAnswered: false,
    },
    {
      id: 3,
      categoryId: 3,
      title: "title3",
      isAnswered: false,
    },
    {
      id: 4,
      categoryId: 4,
      title: "title4",
      isAnswered: false,
    },
    {
      id: 5,
      categoryId: 5,
      title: "title5",
      isAnswered: false,
    },
    {
      id: 6,
      categoryId: 1,
      title: "title6",
      isAnswered: false,
    },
    {
      id: 7,
      categoryId: 2,
      title: "title7",
      isAnswered: false,
    },
    {
      id: 8,
      categoryId: 3,
      title: "title8",
      isAnswered: false,
    },
    {
      id: 9,
      categoryId: 4,
      title: "title9",
      isAnswered: false,
    },
    {
      id: 10,
      categoryId: 5,
      title: "title10",
      isAnswered: false,
    },
  ];

  return (
    <AnswersHistoryStyle>
      <Tabs
        titles={titles}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      />
      <Questions
        className="questions"
        questions={questions}
        questionsType="Answered"
        getCategoryName={getCategoryName}
      />
    </AnswersHistoryStyle>
  );
}

const AnswersHistoryStyle = styled.div`
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
