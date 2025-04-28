import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import AnsweredQuestions from "../components/AnswerHistory/AnsweredQuestions";
import { useCategory } from "../hooks/UseCategory";
import { useAnsweredHistory } from "../hooks/UseAnsweredHistory";

export default AnswerHistoryPage;

type TabType = "위클리" | "기본";

function AnswerHistoryPage() {
  const { getCategoryName } = useCategory();
  const { basicAnsweredQuestions, weeklyAnsweredQuestions } =
    useAnsweredHistory();
  const [currentTab, setCurrentTab] = useState<TabType>("기본");

  const tabs = [{ title: "기본" }, { title: "위클리" }];

  const handleClickTab = (title: string) => {
    setCurrentTab(title as TabType);
  };

  return (
    <AnswerHistoryStyle>
      <Tabs tabs={tabs} onClickTab={handleClickTab} currentTab={currentTab} />
      <AnsweredQuestions
        className="answers"
        answeredQuestions={
          currentTab === "위클리"
            ? weeklyAnsweredQuestions
            : basicAnsweredQuestions
        }
        getCategoryName={getCategoryName}
      />
    </AnswerHistoryStyle>
  );
}

const AnswerHistoryStyle = styled.div`
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
