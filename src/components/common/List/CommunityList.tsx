import styled from "styled-components";

interface Props {
  profileImg: string;
  username: string;
  comments: number;
  level: number;
  title: string;
  content: string;
  views: number;
  likes: number;
}

function CommunityList({
  profileImg,
  username,
  comments,
  level,
  title,
  content,
  views,
  likes,
}: Props) {
  return (
    <>
      <CommunityListStyle>
        <ProfileSection>
          <CommonProfile src={profileImg} alt={`${username}의 프로필`} />
          <FlexWrap>
            <UserInfo>
              <Username>{username}</Username>
              <Comments>누적 답변{comments}개</Comments>
            </UserInfo>
            <Level>
              LV. <b>{level}</b>
            </Level>
          </FlexWrap>
        </ProfileSection>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Info>
          <span>{views}명이 봤어요</span> | <span>좋아요 {likes}</span>
        </Info>
      </CommunityListStyle>
    </>
  );
}

const CommunityListStyle = styled.div`
  border-bottom: 3px solid #f5f5f5;
  cursor: pointer;
  margin-bottom: 25px;
`;

const CommonProfile = styled.img`
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

const Title = styled.h3`
  font-size: 14px;
  color: #333;
  margin-top: 20px;
`;

const Content = styled.p`
  color: #888;
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
`;

const Info = styled.div`
  font-size: 12px;
  color: #888;
  margin: 15px 0 25px;
  span {
    font-weight: 300;
    color: #888888;
  }
`;

export default CommunityList;
