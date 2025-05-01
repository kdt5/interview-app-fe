import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import AnsweredQuestions from "../components/AnswerHistory/AnsweredQuestions";
import { useAnsweredHistory } from "../hooks/UseAnsweredHistory";
import { useLocation } from "react-router-dom";

export default AnswerHistoryPage;

type TabType = "위클리" | "필수 질문";

function AnswerHistoryPage() {
  const location = useLocation();
  const initialTab = location.state?.tabType ?? "필수 질문";
  const { basicAnsweredQuestions, weeklyAnsweredQuestions } =
    useAnsweredHistory();
  const [currentTab, setCurrentTab] = useState<TabType>(initialTab);

  const tabs = [{ title: "필수 질문" }, { title: "위클리" }];

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
