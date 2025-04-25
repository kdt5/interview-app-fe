import styled from "styled-components";
import CommentContents, { CommentInfo, Comments, CommonProfileStyle, Contents, FlexWrap, OptionButton, ProfileSection, UserInfo, Username } from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import { useCommunityPostComments } from "../../hooks/UsePost";
import { useParams } from "react-router-dom";
import LikeSmall from "../../assets/Link_Small.png";
import ReplySmall from "../../assets/Reply_Small.png";
import { countAllReplies } from "../../utils/commentCount";

function CommunityReply() {
  const { postId, commentId } = useParams();
  const { communityPostComments, refetchComments } = useCommunityPostComments(Number(postId), "post");
  const subComment = communityPostComments?.find((comment) => comment.id === Number(commentId));
  const subCommentTopLevelComments = communityPostComments?.filter((comment) => comment.parentId === Number(commentId)) || [];
  const getReplies = (parentId: number) => (communityPostComments?.filter((comment) => comment.parentId === parentId) || []);

  return (
    <>
      <ProfileSection>
        <FlexWrap>
            <UserInfo>
              <CommonProfileStyle src={subComment?.user.profileImageUrl} alt={`${subComment?.user.nickname}의 프로필`} />
              <Username>
                <p>{subComment?.user.nickname}</p>
                <Comments>누적 답변{subComment?.user.answerCount}개</Comments>
              </Username>
            </UserInfo>
            <OptionButton></OptionButton>
        </FlexWrap>
        <Contents>{subComment?.content}</Contents>
        <CommentInfo>
          <span>
            <img src={LikeSmall} alt="" />
            좋아요 {subComment?.favoriteCount}
          </span>{" "}
          <span>
            <img src={ReplySmall} alt="" />
            답글 {countAllReplies(communityPostComments, Number(commentId))}
          </span>
        </CommentInfo>
        {
          subCommentTopLevelComments ? (
            (subCommentTopLevelComments.length > 0) ? (
              <>
              <CommunityReplyStyle>
                {subCommentTopLevelComments.map((item) => (
                  <CommentContents key={item.id} {...item} replies={getReplies(item.id)} depth={0} postId={Number(postId)} allComments={communityPostComments}/>
                ))}
              </CommunityReplyStyle>
            </>
            ) : (
              <div></div>
            )
            
          ) : (
            <div>로딩중...</div>
          )
        }
        <TextArea targetId={postId ? Number(postId) : -1} categoryName="post" parentId={commentId ? Number(commentId) : undefined} refetchComments={refetchComments}></TextArea>
      </ProfileSection>
    </>
  );
}

const CommunityReplyStyle = styled.div`
  padding: 0 30px;
`;

export default CommunityReply;
