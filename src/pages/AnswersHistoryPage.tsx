import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import Answers from "../components/AnswersHistory/Answers";
import { useCategory } from "../hooks/UseCategory";
import { useAnsweredHistory } from "../hooks/UseAnsweredHistory";

export default AnswersHistoryPage;

type TabType = "위클리" | "기본";

function AnswersHistoryPage() {
  const { getCategoryName } = useCategory();
  const { basicAnsweredQuestions, weeklyAnsweredQuestions } =
    useAnsweredHistory();
  const [currentTab, setCurrentTab] = useState<TabType>("기본");

  const titles: TabType[] = ["기본", "위클리"];

  const handleClickTab = (title: string) => {
    setCurrentTab(title as TabType);
  };

  return (
    <AnswersHistoryStyle>
      <Tabs
        titles={titles}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      />
      <Answers
        className="answers"
        answers={
          currentTab === "위클리"
            ? weeklyAnsweredQuestions
            : basicAnsweredQuestions
        }
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

  .answers {
    padding-top: 68px;
  }
`;
