import { useState } from "react";
import Tabs from "../components/common/Tabs";
import styled from "styled-components";
import InterviewTab from "../components/Community/CommunityInterview";
import PostTab from "../components/Community/CommunityPost";

export default Community;

function Community() {
  const [currentTab, setCurrentTab] = useState("면접토론");

  const tabs = [{ title: "면접토론" }, { title: "게시글" }];

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };
  return (
    <>
      <Tabs
        tabs={tabs}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      ></Tabs>
      {currentTab === "면접토론" && (
        <CommunityStyle>
          <InterviewTab></InterviewTab>
        </CommunityStyle>
      )}
      {currentTab === "게시글" && (
        <CommunityStyle>
          <PostTab></PostTab>
        </CommunityStyle>
      )}
    </>
  );
}

const CommunityStyle = styled.div`
  margin-top: 60px;
  height: fit-content;
  position: relative;
`;
