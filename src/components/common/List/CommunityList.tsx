import styled from "styled-components";
import CommonProfile from "../Profile/CommonProfile";
import ViewerImg from "../../../assets/Viewer.png";

interface Props {
  title: string;
  content: string;
  views: number;
  likes: number;
}

const ProfileData = [
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가말하고있잖아",
    comments: 25,
    level: 5,
  },
];

function CommunityList({ title, content, views, likes }: Props) {
  return (
    <>
      <CommunityListStyle>
        {ProfileData.map((item, index) => (
          <CommonProfile key={index} {...item} />
        ))}
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Info>
          <span>
            <img src={ViewerImg} alt="Viewer Icon" />
            {views}명이 봤어요
          </span>{" "}
          | <span>좋아요 {likes}</span>
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
