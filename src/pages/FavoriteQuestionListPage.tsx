import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import QuestionBox from "../components/QuestionList/QuestionBox";

export default FavoriteQuestionListPage;

function FavoriteQuestionListPage() {
  const [currentTab, setCurrentTab] = useState("위클리");

  const tabs = [{ title: "위클리" }, { title: "기본" }];

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  const isWeekly = currentTab === "위클리";

  return (
    <FavoriteQuestionListStyle>
      <Tabs tabs={tabs} onClickTab={handleClickTab} currentTab={currentTab} />
      <QuestionBox isWeekly={isWeekly} />
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
