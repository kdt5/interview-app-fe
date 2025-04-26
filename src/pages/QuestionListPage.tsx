import { JSX, useEffect, useState } from "react";
import { Position, Positions } from "../constants/Question.ts";
import { useParams } from "react-router-dom";
import Tabs from "../components/common/Tabs.tsx";
import QuestionBox from "../components/QuestionList/QuestionBox.tsx";
import styled from "styled-components";
import { fetchQuestions, fetchWeeklyQuestions } from "../api/Question.api.ts";

export default QuestionListPage;

function QuestionListPage(): JSX.Element {
  const { position } = useParams<{ position: Position }>();

  const [currentTab, setCurrentTab] = useState("위클리");
  const [weeklyCount, setWeeklyCount] = useState<number>(0);
  const [requiredCount, setRequiredCount] = useState<number>(0);

  const tabs = [
    { title: "위클리", count: weeklyCount },
    { title: "필수 면접", count: requiredCount },
  ];

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const weeklyData = await fetchWeeklyQuestions();
        setWeeklyCount(weeklyData.length);

        if (position) {
          const requiredData = await fetchQuestions(position);
          setRequiredCount(requiredData.length);
        }
      } catch (e) {
        console.error("질문 개수 로딩 실패", e);
      }
    };

    loadCounts();
  }, [position]);

  if (position === undefined || !Positions.includes(position)) {
    throw new Error("Position is not defined");
  }

  const isWeekly = currentTab === "위클리";

  return (
    <>
      <Tabs
        tabs={tabs}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      ></Tabs>
      <QuestionListPageStyle $isWeekly={isWeekly}>
        <QuestionBox isWeekly={isWeekly} />
      </QuestionListPageStyle>
    </>
  );
}

const QuestionListPageStyle = styled.div<{ $isWeekly: boolean }>`
  margin-top: ${({ $isWeekly }) => ($isWeekly ? "30px" : "60px")};
  height: fit-content;
  position: relative;
`;
