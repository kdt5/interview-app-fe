import styled from "styled-components";
import CommunityAnswer from "../../components/Community/CommunityAnswer";
import CommentContents from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import ReplyInfo from "../../components/common/Community/ReplyInfo";
import { useParams } from "react-router-dom";
import {
  useCommunityPostComments,
  useCommunityPostDetail,
} from "../../hooks/UsePost";
import { useState } from "react";
import {
  CenterModalBackdrop,
  CenterModalContainer,
} from "../../components/common/Community/CommunityModal";

function PostDetail() {
  const { postId } = useParams();
  const [sortType, setSortType] = useState<"createdAt" | "favoriteCount">(
    "favoriteCount"
  );
  const { communityPostDetail } = useCommunityPostDetail(Number(postId));
  const { communityPostComments, refetchComments } = useCommunityPostComments(
    Number(postId),
    "post",
    sortType
  );

  const [editTarget, setEditTarget] = useState<{
    id: number;
    content: string;
  } | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const topLevelComments =
    communityPostComments?.filter((comment) => comment.parentId === null) || [];
  const getReplies = (parentId: number) =>
    communityPostComments?.filter((comment) => comment.parentId === parentId) ||
    [];

  const handleSuccessOk = () => {
    refetchComments?.();
    setShowSuccessModal(false);
  };

  return (
    <>
      {communityPostDetail ? (
        <AnswerDetailStyle>
          <CommunityAnswer
            key={communityPostDetail.id}
            {...communityPostDetail}
          />
        </AnswerDetailStyle>
      ) : (
        <div>로딩중...</div>
      )}
      {topLevelComments ? (
        topLevelComments.length > 0 ? (
          <>
            <ReplyInfo
              totalComments={communityPostComments.length}
              sortType={sortType}
              onChangeSort={setSortType}
            />
            <CommentSectionWrapper>
              <CommentStyle>
                {topLevelComments.map((item) => (
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
              </CommentStyle>
            </CommentSectionWrapper>
          </>
        ) : (
          <ReplyInfo
            totalComments={0}
            sortType={sortType}
            onChangeSort={setSortType}
          />
        )
      ) : (
        <div>로딩중...</div>
      )}
      <TextArea
        targetId={postId ? Number(postId) : -1}
        categoryName="post"
        editTarget={editTarget}
        setEditTarget={setEditTarget}
        setShowSuccessModal={setShowSuccessModal}
        setSuccessMessage={setSuccessMessage}
      />
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

const AnswerDetailStyle = styled.div`
  padding: 0 30px 20px;
  border-bottom: 5px solid #f5f5f5;
`;

export const CommentStyle = styled.div`
  margin-top: 30px;
`;
const CommentSectionWrapper = styled.div`
  padding: 0 30px;
`;

export default PostDetail;
