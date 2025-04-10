import { useState } from "react";
import Tabs from "../components/common/Tabs";
import styled from "styled-components";
import WeeklyQuestionCard from "../components/common/Card/WeeklyQuestionCard";
import SectionTitle from "../components/common/SectionTitle";
import CommonQuestionList from "../components/common/List/CommonQuestionList";

export default Community;

const WeeklyQuestionData = [
  {
    category: "Javascript",
    title:
      "Javascript에서 var, let, const의 역할과 각각의 차이점은 무엇일까요?",
    date: "3d 2h 30m",
  },
];

const questionData = [
  {
    category: "React",
    questiontitle: "useEffect 훅은 언제 사용하는가?",
    complete: "작성 완료",
    comments: 23,
    likes: 53,
  },
];

function Community() {
  const [currentTab, setCurrentTab] = useState("면접토론");
  const titles: string[] = ["면접토론", "게시글"];
  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };
  return (
    <>
      <Tabs
        titles={titles}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      ></Tabs>
      {currentTab === "면접토론" && (
        <CommunityStyle>
          <SectionTitle>위클리 답변 토론</SectionTitle>
          {WeeklyQuestionData.map((item, index) => (
            <WeeklyQuestionCard key={index} {...item} />
          ))}

          {questionData.map((item, index) => (
            <CommonQuestionList key={index} {...item} />
          ))}
        </CommunityStyle>
      )}
      {currentTab === "게시글" && (
        <CommunityStyle>
          2
          게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글게시글
        </CommunityStyle>
      )}
    </>
  );
}

const CommunityStyle = styled.div`
  margin-top: 70px;
  height: fit-content;
`;
