import { Link } from "react-router-dom";
import styled from "styled-components";
import LikeSmall from "../../assets/Link_Small.png";
import ActiveLikeSmall from "../../assets/Link_Small_active.png";
import ReplySmall from "../../assets/Reply_Small.png";
import OptionSmall from "../../assets/Option.png";
import { Comment } from "../../models/Comment.model";
import { CommentStyle } from "../../pages/CommunityPost/PostDetail";
import { FRONTEND_URLS } from "../../constants/Urls";
import { MAX_COMMENT_DEPTH } from "../../constants/Post";
import { countAllReplies } from "../../utils/commentCount";
import { useEffect, useState } from "react";
import CommunityModal from "./Community/CommunityModal";
import { fetchFavoriteStatus } from "../../hooks/UseFavorite";
import { addFavorite, removeFavorite } from "../../api/Favorite.api";

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
  favoriteCount: number;
  replies?: Comment[];
  depth: number;
  postId?: number;
  allComments?: Comment[];
  setEditTarget?: (target: { id: number; content: string }) => void
  questionId?  : number;
}

function CommentContents({
  id,
  content,
  user,
  favoriteCount,
  replies,
  depth,
  postId,
  allComments,
  setEditTarget,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getReplies = (parentId: number) => (allComments?.filter((comment) => comment.parentId === parentId) || []);
  
  const handleOptionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [currFavoriteCount, setFavoriteCount] = useState(favoriteCount);

  useEffect(() => {
    fetchFavoriteStatus(id, "comment").then(setIsFavorite);
    setFavoriteCount(favoriteCount);
  }, [id, favoriteCount]);

  const handleToggleFavorite = async (commentId: number) => {
    try {
      if(!isFavorite) {
        await addFavorite(commentId, "comment");
      } else {
        await removeFavorite(commentId, "comment");
      }
    } catch (error) {
      console.error("좋아요 토글 실패", error);
    }

    setIsFavorite((prev: boolean) => !prev);
    setFavoriteCount((prev) => (isFavorite ? prev - 1 : prev + 1));
  };

  return (
    <>
      <ProfileSection>
        <FlexWrap>
          <UserInfo>
            <CommonProfileStyle src={user.profileImageUrl} alt={`${user.nickname}의 프로필`} />
            <Username>
              <p>{user.nickname}</p>
              <Comments>누적 답변 {user.answerCount}개</Comments>
            </Username>
          </UserInfo>
          <OptionButton onClick={handleOptionClick}></OptionButton>
        </FlexWrap>
        <Contents>{content}</Contents>
        <CommentInfo>
          <span>
            <img src={isFavorite ? ActiveLikeSmall : LikeSmall} alt="" onClick={() => handleToggleFavorite(id)} style={{ cursor: "pointer" }} />
            좋아요 {currFavoriteCount === 0 ? "" : currFavoriteCount}
          </span>{" "}
          <Link to={`${FRONTEND_URLS.COMMUNITY.POST_DETAIL.replace(":postId", String(postId))}${FRONTEND_URLS.COMMUNITY.REPLIES.replace(":commentId", String(id))}`}>
            <span>
              <img src={ReplySmall} alt="" />
              답글 {countAllReplies(allComments || [], id) === 0 ? "쓰기" : countAllReplies(allComments || [], id)}
            </span>
          </Link>
        </CommentInfo>
        {
          depth < MAX_COMMENT_DEPTH && replies && replies.length > 0 ? (
            <CommentStyle>
              {replies.map((reply) => (
                <CommentContents key={reply.id} {...reply} replies={getReplies(reply.id)} depth={depth + 1} postId={postId} allComments={allComments} setEditTarget={setEditTarget}/>
              ))}
            </CommentStyle>
          ) : (
            <div></div>
          )
        }
      </ProfileSection>
      {isModalOpen && (
        <CommunityModal
          className="comment"
          setEditTarget={setEditTarget}
          onClose={handleOptionClick}
          postId={id}
          content={content}
        />
      )}
    </>
  );
}

export const OptionButton = styled.button`
  width: 10px;
  height: 30px;
  background-color: transparent;
  background-image: url(${OptionSmall});
  background-repeat: no-repeat;
  padding: 0;
  border-radius: 0;
`;
export const CommentInfo = styled.p`
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
export const CommonProfileStyle = styled.img`
  width: 35px;
  height: 35px;
  background-color: #ccc;
  border-radius: 30px;
  display: block;
`;

export const ProfileSection = styled.div`
  margin-top: 15px;
`;

export const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

export const Username = styled.div`
  margin-left: 10px;
  p {
    font-weight: 600;
    font-size: 14px;
    color: #333;
  }
`;

export const Comments = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #888888;
`;

export const Contents = styled.div`
  font-size: 14px;
  color: #333;
  border-radius: 20px;
  font-weight: 300;
  padding: 10px 10px 10px 45px;
`;

export default CommentContents;
