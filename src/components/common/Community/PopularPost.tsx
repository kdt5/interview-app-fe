import styled from "styled-components";
import LikesIcon from "../../../assets/Popular_Like.png";

interface Props {
  title: string;
  content: string;
  favoriteCount: number;
}

function PopularPost({ title, content, favoriteCount }: Props) {
  return (
    <>
      <PopularPostStyle>
        <span>인기글</span>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <Info>
          <CountInfo>
            <img src={LikesIcon} alt="" />
            <span> {favoriteCount}</span>
          </CountInfo>
        </Info>
      </PopularPostStyle>
    </>
  );
}

const PopularPostStyle = styled.div`
  background-color: #f8f8f8;
  width: 100%;
  max-width: 380px;
  height: 160px;
  border-radius: 10px;
  padding: 15px 25px;

  span {
    font-size: 12px;
    color: #888;
    font-weight: 200;
  }
`;
const Title = styled.h3`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-top: 3px;
`;

const Content = styled.p`
  color: #888;
  font-size: 14px;
  font-weight: 300;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const Info = styled.div`
  font-size: 12px;
  color: #afafaf;
  margin: 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;

const CountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-right: 10px;
  span {
    font-weight: 200;
    color: #afafaf;
    font-size: 14px;
    margin: 3px 0 0 3px;
  }
`;

export default PopularPost;
