import React from "react";
import RankingProfile from "../common/Profile/RankingProfile";
import { RankingData } from "../../models/Ranking.model";
import styled from "styled-components";

interface Props {
  rankingData: RankingData[];
  mode?: "main" | "more";
}

const RankingList: React.FC<Props> = ({ rankingData, mode = "more" }) => {
  const getRankClassName = (rank?: number) => {
    if (mode === "main") return "common-ranking-box";
    if (rank === 1) return "top1-ranking-box";
    if (rank === 2) return "top2-ranking-box";
    if (rank === 3) return "top3-ranking-box";
    return "common-ranking-box";
  };

  return (
    <RankingListStyle>
      {rankingData.map((user) => (
        <div
          key={user.id}
          className={`rank-profile-box rank-users-profile-box ${getRankClassName(user.ranking)}`}
        >
          <RankingProfile
            profileImg="/user1.png"
            username={user.username}
            level={user.level}
            like={user.like}
            comments={user.comments}
            {...(mode === "more" && user.ranking && user.ranking <= 3
              ? { ranking: user.ranking }
              : { commonRanking: user.ranking })}
          />
        </div>
      ))}
    </RankingListStyle>
  );
};

const RankingListStyle = styled.div`
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

export default RankingList;
