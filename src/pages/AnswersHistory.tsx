import styled from "styled-components";
import Answers from "../components/AnswersHistory/Answers";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import { Question } from "../models/Question.model";

export default AnswersHistory;

function AnswersHistory() {
  const [currentTab, setCurrentTab] = useState("위클리");
  const titles: string[] = ["위클리", "기본"];

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  const answers: Question[] = [
    {
      id: 1,
      categoryId: 1,
      title: "title1",
    },
    {
      id: 2,
      categoryId: 2,
      title: "title2",
    },
    {
      id: 3,
      categoryId: 3,
      title: "title3",
    },
    {
      id: 4,
      categoryId: 4,
      title: "title4",
    },
    {
      id: 5,
      categoryId: 5,
      title: "title5",
    },
  ];

  return (
    <AnswersHistoryStyle>
      <Tabs
        titles={titles}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      />
      <Answers questions={answers} />
    </AnswersHistoryStyle>
  );
}

const AnswersHistoryStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
