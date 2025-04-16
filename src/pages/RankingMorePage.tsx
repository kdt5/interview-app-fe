import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import RankingProfile from "../components/common/Profile/RankingProfile";
import RankingList from "../components/RankingMorePage/RankingList";
import { RankingData } from "../models/Ranking.model";

function RankingMorePage() {
  const titles: string[] = ["통합랭킹", "답변랭킹", "좋아요랭킹"] as const;
  type TabTitle = (typeof titles)[number];

  const [currentTab, setCurrentTab] = useState<TabTitle>("통합랭킹");

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  const rankingData: Record<TabTitle, RankingData[]> = {
    통합랭킹: [
      {
        id: 1,
        username: "통합옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 1,
      },
      {
        id: 2,
        username: "통합옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 2,
      },
      {
        id: 3,
        username: "통합옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 3,
      },
      {
        id: 4,
        username: "통합옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 4,
      },
      {
        id: 5,
        username: "통합옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 5,
      },
      {
        id: 6,
        username: "통합옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 6,
      },
      {
        id: 7,
        username: "통합옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 7,
      },
    ],
    답변랭킹: [
      {
        id: 1,
        username: "답변옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 1,
      },
      {
        id: 2,
        username: "답변옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 2,
      },
      {
        id: 3,
        username: "답변옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 3,
      },
      {
        id: 4,
        username: "답변옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 4,
      },
      {
        id: 5,
        username: "답변옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 5,
      },
      {
        id: 6,
        username: "답변옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 6,
      },
      {
        id: 7,
        username: "답변옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 7,
      },
    ],
    좋아요랭킹: [
      {
        id: 1,
        username: "좋아요옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 1,
      },
      {
        id: 2,
        username: "좋아요옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 2,
      },
      {
        id: 3,
        username: "좋아요옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 3,
      },
      {
        id: 4,
        username: "좋아요옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 4,
      },
      {
        id: 5,
        username: "좋아요옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 5,
      },
      {
        id: 6,
        username: "좋아요옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 6,
      },
      {
        id: 7,
        username: "좋아요옹",
        level: 5,
        like: 132,
        comments: 423,
        ranking: 7,
      },
    ],
  };

  return (
    <RankingMorePageStyle>
      <Tabs
        titles={titles}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      />
      <div>
        <div className="my-profile-box">
          <RankingProfile
            profileImg="../public/user1.png"
            username="내계정이다옹"
            level={5}
            like={132}
            comments={423}
            commonRanking={32165498}
          />
        </div>
        <div className="mid-line"></div>
        <RankingList rankingData={rankingData[currentTab]} />
      </div>
    </RankingMorePageStyle>
  );
}

const RankingMorePageStyle = styled.div`
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

export default RankingMorePage;
