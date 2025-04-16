import styled from "styled-components";
import CommentContents from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import ReplyInfo from "../../components/common/Community/ReplyInfo";

const CommentData = [
  {
    profileImg: "프로필이미지",
    username: "닉네임",
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
function CommunityReply() {
  return (
    <>
      {relpyinfo.map((item, index) => (
        <ReplyInfo key={index} {...item} />
      ))}
      <CommunityReplyStyle>
        {CommentData.map((item, index) => (
          <CommentContents key={index} {...item} />
        ))}
      </CommunityReplyStyle>
      <TextArea></TextArea>
    </>
  );
}

const CommunityReplyStyle = styled.div`
  padding: 0 30px;
`;

export default CommunityReply;
