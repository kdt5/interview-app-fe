import styled from "styled-components";
import CommunityAnswer from "../../components/Community/CommunityAnswer";
import CommentContents from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import ReplyInfo from "../../components/common/Community/ReplyInfo";
import { useParams } from "react-router-dom";
import { useCommunityPostDetail } from "../../hooks/UsePost";

const CommentData = [
  {
    profileImg: "프로필이미지",
    username: "정호붕",
    contents: "답변 챗지피티가 달아준거 티나염",
    comments: 24,
    likes: 52,
    reply: 12,
    totalcomments: 24,
  },
];

const relpyinfo = [
  {
    totalcomments: 24,
  },
];

function PostDetail() {
  const { postId } = useParams();
  const { communityPostDetail } = useCommunityPostDetail(Number(postId));

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
      {relpyinfo.map((item, index) => (
        <ReplyInfo key={index} {...item} />
      ))}
      <CommentStyle>
        {CommentData.map((item, index) => (
          <CommentContents key={index} {...item} />
        ))}
      </CommentStyle>
      <TextArea></TextArea>
    </>
  );
}

const AnswerDetailStyle = styled.div`
  padding: 0 30px 20px;
  border-bottom: 5px solid #f5f5f5;
`;

const CommentStyle = styled.div`
  margin-top: 30px;
  padding: 0 30px;
`;

export default PostDetail;
