import styled from "styled-components";

interface Props {
  title: string;
  contents: string;
  likes: number;
  comments: number;
}

function PopularPost({ title, contents, comments, likes }: Props) {
  return (
    <>
      <PopularPostStyle>
        <span>인기글</span>
        <Title>{title}</Title>
        <Content>{contents}</Content>
        <Info>
          <span>{likes}</span> | <span>{comments}</span>
        </Info>
      </PopularPostStyle>
    </>
  );
}

const PopularPostStyle = styled.div`
  background-color: #f8f8f8;
  width: 100%;
  max-width: 380px;
  height: 150px;
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
  span {
    font-weight: 200;
    color: #afafaf;
  }
`;
export default PopularPost;
