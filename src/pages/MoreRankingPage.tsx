import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import RankingProfile from "../components/common/Profile/RankingProfile";
import RankingList from "../components/RankingPage/RankingList";
import {
  useIntegrationRanking,
  useAnswerRanking,
  useFavoriteRanking,
} from "../hooks/UseRanking";

function MoreRankingPage() {
  const [currentTab, setCurrentTab] = useState("통합랭킹");

  const tabs = [
    { title: "통합랭킹" },
    { title: "답변랭킹" },
    { title: "좋아요랭킹" },
  ];

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  const {
    data: integrationRanking,
    isLoading: isIntegrationLoading,
    error: integrationError,
  } = useIntegrationRanking();

  const {
    data: answerRanking,
    isLoading: isAnswerLoading,
    error: answerError,
  } = useAnswerRanking();

  const {
    data: favoriteRanking,
    isLoading: isFavoriteLoading,
    error: favoriteError,
  } = useFavoriteRanking();

  if (isIntegrationLoading || isAnswerLoading || isFavoriteLoading) {
    return <div>로딩중...</div>;
  }

  if (integrationError || answerError || favoriteError) {
    return <div>에러가 발생했습니다.</div>;
  }

  const selectedRanking = {
    통합랭킹: integrationRanking,
    답변랭킹: answerRanking,
    좋아요랭킹: favoriteRanking,
  }[currentTab];

  const topUser = selectedRanking?.find((user) => user.rank === 1);

  return (
    <MoreRankingPageStyle>
      <Tabs tabs={tabs} onClickTab={handleClickTab} currentTab={currentTab} />
      <div>
        {topUser && (
          <div className="my-profile-box">
            <RankingProfile
              profileImageUrl={topUser.profileImageUrl}
              nickname={topUser.nickname}
              level={topUser.level}
              totalFavoriteCount={topUser.totalFavoriteCount}
              totalAnswerCount={topUser.totalAnswerCount}
              totalScore={topUser.totalScore}
              rank={topUser.rank}
            />
          </div>
        )}
        <div className="mid-line"></div>
        {selectedRanking && <RankingList rankingData={selectedRanking} />}
      </div>
    </MoreRankingPageStyle>
  );
}

const MoreRankingPageStyle = styled.div`
  padding-bottom: 120px;

  .my-profile-box {
    width: 320px;
    height: 80px;
    border-radius: 10px;
    background: #fbfbfb;
    padding: 17.5px 15px;
    margin: 50px auto 20px auto;

    .count-number {
      color: #6ea1ff;
    }
  }

  .mid-line {
    width: 100%;
    height: 5px;
    background: #f5f5f5;
  }
`;

export default MoreRankingPage;
