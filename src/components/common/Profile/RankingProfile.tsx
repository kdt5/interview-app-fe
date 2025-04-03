import styled from "styled-components";

interface Props {
  profileImg: string;
  username: string;
  comments: number;
  level: number;
  like: number;
}

function RankingProfile({
  profileImg,
  username,
  comments,
  level,
  like,
}: Props) {
  return (
    <>
      <RankingProfileStyle>
        <RankingProfileimg src={profileImg} alt={`${username}의 프로필`} />
        <FlexWrap>
          <UserInfo>
            <Username>{username}</Username>
            <Level>
              LV. <b>{level}</b>
            </Level>
          </UserInfo>
          <UserData>
            <p>
              <LikeComment>누적 좋아요</LikeComment>
              <LikeComment>{like}개</LikeComment>
            </p>
            <p>
              <LikeComment>누적 답변</LikeComment>
              <LikeComment>{comments}개</LikeComment>
            </p>
          </UserData>
        </FlexWrap>
      </RankingProfileStyle>
    </>
  );
}

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
`;

const Level = styled.div`
  font-size: 12px;
  color: #888;

  font-weight: 100;

  b {
    color: #888;
  }
`;

export default RankingProfile;
