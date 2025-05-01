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
import ReplySmall from "../../assets/Reply_Small.png";
import { countAllReplies } from "../../utils/commentCount";
import { useEffect, useState } from "react";
import CommunityModal, {
  CenterModalBackdrop,
  CenterModalContainer,
} from "../../components/common/Community/CommunityModal";
import { LikeIcon } from "../../components/common/LikeIcon";

function CommunityReply() {
  const { postId, commentId } = useParams();
  if (postId === undefined || commentId === undefined) {
    throw new Error("postId or commentId is undefined");
  }

  const parsedPostId = parseInt(postId);
  const parsedCommentId = parseInt(commentId);

  const { communityPostComments, refetchComments } = useCommunityPostComments(
    parsedPostId,
    "post"
  );
  const subComment = communityPostComments?.find(
    (comment) => comment.id === parsedCommentId
  );
  const subCommentTopLevelComments =
    communityPostComments?.filter(
      (comment) => comment.parentId === parsedCommentId
    ) || [];
  const getReplies = (parentId: number) =>
    communityPostComments?.filter((comment) => comment.parentId === parentId) ||
    [];
  const [editTarget, setEditTarget] = useState<{
    id: number;
    content: string;
  } | null>(null);
  const [currFavoriteCount, setFavoriteCount] = useState(
    subComment?.favoriteCount || 0
  );

  useEffect(() => {
    if (subComment) {
      setFavoriteCount(subComment?.favoriteCount);
    }
  }, [subComment, subComment?.id, subComment?.favoriteCount]);

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

  const handleToggleLike = (isFavorite: boolean) => {
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
            <LikeIcon
              likeId={parseInt(commentId)}
              targetType="comment"
              alt=""
              handleToggleLike={handleToggleLike}
            />
            좋아요 {currFavoriteCount === 0 ? "" : currFavoriteCount}
          </span>{" "}
          <span>
            <img src={ReplySmall} alt="" />
            답글 {countAllReplies(communityPostComments, parsedCommentId)}
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
                    postId={parsedPostId}
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
          targetId={postId ? parsedPostId : -1}
          categoryName="post"
          parentId={commentId ? parsedCommentId : undefined}
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
