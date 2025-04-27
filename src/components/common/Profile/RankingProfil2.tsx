import styled from "styled-components";

interface Props {
  nickname: string;
  totalAnswerCount: number;
  rank: number;
  totalFavoriteCount: number;

  profileImg: string;
  commonRanking?: number;
  ranking?: number;
}

function RankingProfile2({
  profileImg,
  nickname,
  totalAnswerCount,
  rank,
  totalFavoriteCount,
  commonRanking,
  ranking,
}: Props) {
  const displayLevel = String(rank).padStart(2, "0");

  return (
    <>
      <RankingProfileStyle>
        {commonRanking !== undefined && (
          <CommonRankingNumber className="my-ranking-number">
            <p>{commonRanking > 100 ? "..." : commonRanking}</p>
          </CommonRankingNumber>
        )}
        {ranking !== undefined && (
          <RankingNumber className="ranking-number">
            <p>{ranking}</p>
            <span>RANK</span>
          </RankingNumber>
        )}
        <RankingProfileimg src={profileImg} alt={`${nickname}의 프로필`} />
        <FlexWrap>
          <UserInfo>
            <Username>{nickname}</Username>
            <Level className="level">
              LV. <b className="level">{displayLevel}</b>
            </Level>
          </UserInfo>
          <UserData>
            <p>
              <LikeComment>
                <b className="label-like">누적 좋아요</b>
              </LikeComment>
              <LikeComment className="count-number">
                {totalFavoriteCount}개
              </LikeComment>
            </p>
            <p>
              <LikeComment>
                <b className="label-comment">누적 답변</b>
              </LikeComment>
              <LikeComment className="count-number">
                {totalAnswerCount}개
              </LikeComment>
            </p>
          </UserData>
        </FlexWrap>
      </RankingProfileStyle>
    </>
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

export default RankingProfile2;
