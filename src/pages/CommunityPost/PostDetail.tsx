import styled from "styled-components";
import CommunityAnswer from "../../components/Community/CommunityAnswer";
import CommentContents from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import ReplyInfo from "../../components/common/Community/ReplyInfo";
import { useParams } from "react-router-dom";
import { useCommunityPostComments, useCommunityPostDetail } from "../../hooks/UsePost";

function PostDetail() {
  const { postId } = useParams();
  const { communityPostDetail } = useCommunityPostDetail(Number(postId));
  const { communityPostComments } = useCommunityPostComments(Number(postId), "post");

  const topLevelComments = communityPostComments?.filter((comment) => comment.parentId === null) || [];
  const getReplies = (parentId: number) => (communityPostComments?.filter((comment) => comment.parentId === parentId) || []);

  return (
    <>
      {
        communityPostDetail ? (
        <AnswerDetailStyle>
          <CommunityAnswer key={communityPostDetail.id} {...communityPostDetail}/>
        </AnswerDetailStyle>
        ) : (
          <div>로딩중...</div>
        )
      }
      {
        topLevelComments ? (
          (topLevelComments.length > 0) ? (
            <>
            <ReplyInfo totalComments={communityPostComments.length} />
            <CommentStyle>
              {topLevelComments.map((item) => (
                <CommentContents key={item.id} {...item} replies={getReplies(item.id)} depth={0} postId={Number(postId)} allComments={communityPostComments}/>
              ))}
            </CommentStyle>
          </>
          ) : (
            <ReplyInfo totalComments={0} />
          )
          
        ) : (
          <div>로딩중...</div>
        )
      }
      <TextArea></TextArea>
    </>
  );
}

const AnswerDetailStyle = styled.div`
  padding: 0 30px 20px;
  border-bottom: 5px solid #f5f5f5;
`;

export const CommentStyle = styled.div`
  margin-top: 30px;
  padding: 0 30px;
`;

export default PostDetail;
