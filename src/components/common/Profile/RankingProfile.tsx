import styled from "styled-components";
import { RankingItem } from "../../../models/Ranking.model";

interface Props extends RankingItem {
  commonRanking?: number; // 이건 여전히 선택
}
function RankingProfile({
  // profileImageUrl,
  nickname,
  totalAnswerCount,
  level,
  totalFavoriteCount,
  commonRanking,
  rank,
}: Props) {
  const displayLevel = String(level).padStart(2, "0");

  return (
    <RankingProfileStyle>
      {commonRanking !== undefined && (
        <CommonRankingNumber>
          <p>{commonRanking > 100 ? "..." : commonRanking}</p>
        </CommonRankingNumber>
      )}
      {rank !== undefined && (
        <RankingNumber>
          <p>{rank}</p>
          <span>RANK</span>
        </RankingNumber>
      )}
      <RankingProfileimg
        // src={profileImageUrl}
        src="../public/user1.png"
        alt={`${nickname}의 프로필`}
      />
      <FlexWrap>
        <UserInfo>
          <Username>{nickname}</Username>
          <Level>
            LV. <b>{displayLevel}</b>
          </Level>
        </UserInfo>
        <UserData>
          <p>
            <LikeComment>
              <b>누적 좋아요</b>
            </LikeComment>
            <LikeComment className="count-number">
              {totalFavoriteCount}개
            </LikeComment>
          </p>
          <p>
            <LikeComment>
              <b>누적 답변</b>
            </LikeComment>
            <LikeComment className="count-number">
              {totalAnswerCount}개
            </LikeComment>
          </p>
        </UserData>
      </FlexWrap>
    </RankingProfileStyle>
  );
}

const CommonRankingNumber = styled.div`
  width: 30px;
  min-width: 30px;
  margin-right: 20px;

  p {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
`;

const RankingNumber = styled.div`
  width: 30px;
  min-width: 30px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: 900;
  }

  span {
    font-size: 12px;
    font-weight: 300;
  }
`;

const RankingProfileimg = styled.img`
  width: 35px;
  height: 35px;
  background-color: #ccc;
  border-radius: 30px;
  display: block;
`;

const RankingProfileStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 35px);
`;

const UserInfo = styled.div`
  margin-left: 10px;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const UserData = styled.div`
  width: 100px;
  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LikeComment = styled.span`
  font-weight: 300;
  font-size: 12px;
  color: #888;

  b {
    font-weight: 600;
    color: #888;
  }
`;

const Level = styled.div`
  font-size: 12px;
  color: #888;

  font-weight: 100;

  b {
    color: #888;
    font-weight: 600;
  }
`;

export default RankingProfile;
