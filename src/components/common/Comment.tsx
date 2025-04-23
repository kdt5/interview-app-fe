import { Link } from "react-router-dom";
import styled from "styled-components";
import LikeSmall from "../../assets/Link_Small.png";
import ReplySmall from "../../assets/Reply_Small.png";
import OptionSmall from "../../assets/Option.png";

interface Props {
  id: number;
  content: string;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    level: number;
    answerCount: number;
  };
  parentId: number | null;
  favoriteCount: number;
}

function CommentContents({
  content,
  user,
  parentId,
  favoriteCount
}: Props) {
  const reply = 0; // TODO: 댓글 수를 가져오는 로직을 추가해야 합니다.

  return (
    <>
      <ProfileSection>
        <FlexWrap>
          <UserInfo>
            <CommonProfileStyle src={user.profileImageUrl} alt={`${user.nickname}의 프로필`} />
            <Username>
              <p>{user.nickname}</p>
              <Comments>누적 답변{user.answerCount}개</Comments>
            </Username>
          </UserInfo>
          <OptionButton></OptionButton>
        </FlexWrap>
        <Contents>{content}</Contents>
        <CommentInfo>
          <span>
            <img src={LikeSmall} alt="" />
            좋아요 {favoriteCount}
          </span>{" "}
          <Link to="/reply">
            <span>
              <img src={ReplySmall} alt="" />
              답글 {(!parentId) ? reply : 0}
            </span>
          </Link>
        </CommentInfo>
      </ProfileSection>
    </>
  );
}

const OptionButton = styled.button`
  width: 10px;
  height: 30px;
  background-color: transparent;
  background-image: url(${OptionSmall});
  background-repeat: no-repeat;
  padding: 0;
  border-radius: 0;
`;
const CommentInfo = styled.p`
  padding-left: 45px;
  span {
    color: #888;
    font-size: 12px;
    font-weight: 300;
    display: inline-block;
    margin-right: 6px;

    img {
      display: inline-block;
      margin-right: 3px;
    }
  }
`;
const CommonProfileStyle = styled.img`
  width: 35px;
  height: 35px;
  background-color: #ccc;
  border-radius: 30px;
  display: block;
`;

const ProfileSection = styled.div`
  margin-top: 15px;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const Username = styled.div`
  margin-left: 10px;
  p {
    font-weight: 600;
    font-size: 14px;
    color: #333;
  }
`;

const Comments = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #888888;
`;

const Contents = styled.div`
  font-size: 14px;
  color: #333;
  border-radius: 20px;
  font-weight: 300;
  padding: 10px 10px 10px 45px;
`;

export default CommentContents;
