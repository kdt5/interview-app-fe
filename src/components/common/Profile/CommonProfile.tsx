import styled from "styled-components";

interface Props {
  profileImg: string;
  username: string;
  comments?: number;
  level: number;
  position?: string;
}

function CommonProfile({
  profileImg,
  username,
  comments,
  level,
  position,
}: Props) {
  const displayLevel = String(level).padStart(2, "0");

  return (
    <>
      <ProfileSection>
        <CommonProfileStyle src={profileImg} alt={`${username}의 프로필`} />
        <FlexWrap>
          <UserInfo>
            <Username>{username}</Username>
            {position ? (
              <Position>{position}</Position>
            ) : (
              <Comments>누적 답변 {comments}개</Comments>
            )}
          </UserInfo>
          <Level>
            LV. <b>{displayLevel}</b>
          </Level>
        </FlexWrap>
      </ProfileSection>
    </>
  );
}

const CommonProfileStyle = styled.img`
  width: 35px;
  height: 35px;
  background-color: #ccc;
  border-radius: 30px;
  display: block;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 10px;
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

const Comments = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #888888;
`;

const Position = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #888888;
`;

const Level = styled.div`
  font-size: 12px;
  color: #fff;
  background-color: #6ea1ff;
  border-radius: 20px;
  font-weight: 100;
  padding: 5px 10px;

  b {
    color: #fff;
  }
`;

export default CommonProfile;
