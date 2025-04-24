import styled from "styled-components";
import CommunityAnswer from "../../components/Community/CommunityAnswer";
import CommentContents from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import Comment from "../../components/common/Community/ReplyInfo";

const post = {
  id: 1,
  category: "취업",
  title: "오늘 면접 보고 왔는데요",
  content:
    "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각해요. 솔직히 회사 다니면서 귀여운거 봐야 스트레스 덜 받죠. 그러니깐 책꾸 같은거 하는거잖아요? ㅎㅎ 면접관님들도 다 귀여운거 보듯이 웃어줬어요. 출근 준비 할게요 ^^",
  viewCount: 213,
  favoriteCount: 26,
};

const comment = [
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
  return (
    <>
      <AnswerDetailStyle>
        <CommunityAnswer
          key={post.id}
          questiontitle={post.title}
          category="React"
          answer={post.content}
          likescount={post.favoriteCount}
          viewscount={post.viewCount}
        />
      </AnswerDetailStyle>
      {relpyinfo.map((item, index) => (
        <Comment key={index} {...item} />
      ))}
      <CommentStyle>
        {comment.map((item, index) => (
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
