import styled from "styled-components";
import Tabs from "../components/common/Tabs";
import { useState } from "react";
import RankingProfile from "../components/common/Profile/RankingProfile";

function RankingMorePage() {
  const titles: string[] = ["통합랭킹", "답변랭킹", "좋아요랭킹"] as const;
  type TabTitle = (typeof titles)[number];

  const [currentTab, setCurrentTab] = useState<TabTitle>("통합랭킹");

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  const rankingData: Record<
    TabTitle,
    {
      id: number;
      username: string;
      level: number;
      like: number;
      comments: number;
      ranking: number;
    }[]
  > = {
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

  const getRankClassName = (rank: number) => {
    if (rank === 1) return "top1-ranking-box";
    if (rank === 2) return "top2-ranking-box";
    if (rank === 3) return "top3-ranking-box";
    return "common-ranking-box";
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
        {rankingData[currentTab].map((user) => (
          <div
            key={user.id}
            className={`rank-profile-box rank-users-profile-box ${getRankClassName(user.ranking)}`}
          >
            <RankingProfile
              profileImg="../public/user1.png"
              username={user.username}
              level={user.level}
              like={user.like}
              comments={user.comments}
              ranking={user.ranking}
            />
          </div>
        ))}
      </div>
    </RankingMorePageStyle>
  );
}

const RankingMorePageStyle = styled.div`
  padding-bottom: 120px;

  .my-profile-box,
  .rank-profile-box {
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

  .rank-users-profile-box {
    margin: 10px auto 5px auto;
    background: #6ea1ff;

    .level,
    .label-like,
    .label-comment {
      color: #ffffff;
    }

    .count-number {
      color: #333333;
    }
  }

  .top2-ranking-box {
    background: #9bbeff;
  }

  .top3-ranking-box {
    background: #c6daff;
    margin-bottom: 0;
  }

  .common-ranking-box {
    background: none;
    border: none;
    border-radius: 0;
    margin: 0 auto;
    border-bottom: 1px solid #f8f8f8;
    box-sizing: border-box;

    .level,
    .label-like,
    .label-comment,
    .count-number {
      color: #888888;
    }
  }
`;

export default RankingMorePage;
