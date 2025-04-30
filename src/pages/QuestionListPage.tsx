import { JSX, useState } from "react";
import { Position, Positions } from "../constants/Question.ts";
import { useParams } from "react-router-dom";
import Tabs from "../components/common/Tabs.tsx";
import QuestionBox from "../components/QuestionList/QuestionBox.tsx";
import styled from "styled-components";
import { useFetchWeeklyQuestions } from "../hooks/UseFetchWeeklyQuestions.ts";
import { useFetchQuestions } from "../hooks/UseFetchQuestions.ts";

export default QuestionListPage;

function QuestionListPage(): JSX.Element {
  const { position } = useParams<{ position: Position }>();
  const [currentTab, setCurrentTab] = useState("위클리");
  const tabs = [{ title: "위클리" }, { title: "필수 면접" }];
  const { weeklyQuestions, isLoading: isLoadingWeeklyQuestions } =
    useFetchWeeklyQuestions();
  const { questions: basicQuestions, isLoading: isLoadingBasicQuestions } =
    useFetchQuestions(position);

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  if (
    currentTab === "필수 면접" &&
    (position === undefined || !Positions.includes(position))
  ) {
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
        {isWeekly
          ? (isLoadingWeeklyQuestions ?? (
              <QuestionBox questions={weeklyQuestions} isWeekly={isWeekly} />
            ))
          : (isLoadingBasicQuestions ?? (
              <QuestionBox questions={basicQuestions} isWeekly={isWeekly} />
            ))}
      </QuestionListPageStyle>
    </>
  );
}

const QuestionListPageStyle = styled.div<{ $isWeekly: boolean }>`
  margin-top: ${({ $isWeekly }) => ($isWeekly ? "30px" : "60px")};
  height: fit-content;
  position: relative;
`;
