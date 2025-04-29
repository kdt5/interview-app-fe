import styled from "styled-components";
import CommonProfile from "../Profile/CommonProfile";
import ViewerImg from "../../../assets/Viewer.png";

interface Props {
  title?: string;
  content: string;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    answerCount: number;
    level: number;
  }
  viewCount: number;
  favoriteCount: number;
}

function CommunityList({ title, content, user, viewCount, favoriteCount }: Props) {
  return (
    <>
      <CommunityListStyle>
        {<CommonProfile key={user.id} {...user} />}
        {  title && <Title>{title}</Title> }
        <Content>{content}</Content>
        <Info>
          <span>
            <img src={ViewerImg} alt="Viewer Icon" />
            {viewCount}명이 봤어요
          </span>{" "}
          | <span>좋아요 {favoriteCount}</span>
        </Info>
      </CommunityListStyle>
    </>
  );
}

const CommunityListStyle = styled.div`
  border-bottom: 3px solid #f5f5f5;
  cursor: pointer;
  padding: 25px 30px;
`;

const Title = styled.h3`
  font-size: 14px;
  color: #333;
  margin-top: 20px;
`;

const Content = styled.p`
  color: #888;
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
`;

const Info = styled.div`
  font-size: 12px;
  color: #888;
  margin: 15px 0 0;
  span {
    font-weight: 300;
    color: #888888;

    img {
      display: inline-block;
      margin-right: 3px;
    }
  }
`;

export default CommunityList;
