import styled from "styled-components";
import CommentContents, {
  CommentInfo,
  Comments,
  CommonProfileStyle,
  Contents,
  FlexWrap,
  OptionButton,
  ProfileSection,
  UserInfo,
  Username,
} from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import { useCommunityPostComments } from "../../hooks/UsePost";
import { useParams } from "react-router-dom";
import LikeSmall from "../../assets/Link_Small.png";
import ActiveLikeSmall from "../../assets/Link_Small_active.png";
import ReplySmall from "../../assets/Reply_Small.png";
import { countAllReplies } from "../../utils/commentCount";
import { useEffect, useState } from "react";
import CommunityModal, {
  CenterModalBackdrop,
  CenterModalContainer,
} from "../../components/common/Community/CommunityModal";
import { addFavorite, removeFavorite } from "../../api/Favorite.api";
import { fetchFavoriteStatus } from "../../hooks/UseFavorite";

function CommunityReply() {
  const { postId, commentId } = useParams();
  const { communityPostComments, refetchComments } = useCommunityPostComments(
    Number(postId),
    "post"
  );
  const subComment = communityPostComments?.find(
    (comment) => comment.id === Number(commentId)
  );
  const subCommentTopLevelComments =
    communityPostComments?.filter(
      (comment) => comment.parentId === Number(commentId)
    ) || [];
  const getReplies = (parentId: number) =>
    communityPostComments?.filter((comment) => comment.parentId === parentId) ||
    [];
  const [isFavorite, setIsFavorite] = useState(false);
  const [currFavoriteCount, setFavoriteCount] = useState(subComment?.favoriteCount || 0);

  useEffect(() => {
    if (subComment) {
      fetchFavoriteStatus(subComment.id, "comment").then(setIsFavorite);
      setFavoriteCount(subComment?.favoriteCount);
    }
  }, [subComment, subComment?.id, subComment?.favoriteCount]);

  const [editTarget, setEditTarget] = useState<{
    id: number;
    content: string;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleOptionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSuccessOk = () => {
    refetchComments?.();
    setShowSuccessModal(false);
  };

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

  if (!subComment || !subCommentTopLevelComments) return null;

  return (
    <>
      <ProfileSection>
        <FlexWrap>
          <UserInfo>
            <CommonProfileStyle
              src={subComment?.user.profileImageUrl}
              alt={`${subComment?.user.nickname}의 프로필`}
            />
            <Username>
              <p>{subComment?.user.nickname}</p>
              <Comments>누적 답변{subComment?.user.answerCount}개</Comments>
            </Username>
          </UserInfo>
          <OptionButton onClick={handleOptionClick}></OptionButton>
        </FlexWrap>
        <Contents>{subComment?.content}</Contents>
        <CommentInfo>
          <span>
            <img src={isFavorite ? ActiveLikeSmall : LikeSmall} alt="" onClick={() => handleToggleFavorite(subComment.id)} style={{ cursor: "pointer" }}/>
            좋아요 {currFavoriteCount === 0 ? "" : currFavoriteCount}
          </span>{" "}
          <span>
            <img src={ReplySmall} alt="" />
            답글 {countAllReplies(communityPostComments, Number(commentId))}
          </span>
        </CommentInfo>
        {subCommentTopLevelComments ? (
          subCommentTopLevelComments.length > 0 ? (
            <>
              <CommunityReplyStyle>
                {subCommentTopLevelComments.map((item) => (
                  <CommentContents
                    key={item.id}
                    {...item}
                    replies={getReplies(item.id)}
                    depth={0}
                    postId={Number(postId)}
                    allComments={communityPostComments}
                    setEditTarget={setEditTarget}
                  />
                ))}
              </CommunityReplyStyle>
            </>
          ) : (
            <div></div>
          )
        ) : (
          <div>로딩중...</div>
        )}
        <TextArea
          targetId={postId ? Number(postId) : -1}
          categoryName="post"
          parentId={commentId ? Number(commentId) : undefined}
          editTarget={editTarget}
          setEditTarget={setEditTarget}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessMessage={setSuccessMessage}
        />
      </ProfileSection>
      {isModalOpen && (
        <CommunityModal
          className="comment"
          onClose={handleOptionClick}
          postId={subComment.id}
          content={subComment.content}
          setEditTarget={setEditTarget}
        />
      )}
      {showSuccessModal && (
        <CenterModalBackdrop>
          <CenterModalContainer onClick={(e) => e.stopPropagation()}>
            <p style={{ textAlign: "center", marginBottom: "16px" }}>
              {successMessage}
            </p>
            <button className="action-button close" onClick={handleSuccessOk}>
              확인
            </button>
          </CenterModalContainer>
        </CenterModalBackdrop>
      )}
    </>
  );
}

const CommunityReplyStyle = styled.div`
  padding: 0 30px;
`;

export default CommunityReply;
