import styled from "styled-components";
import CommunityAnswer from "../../components/Community/CommunityAnswer";
import CommentContents from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";
import ReplyInfo from "../../components/common/Community/ReplyInfo";
import { Answer } from "../../models/Answer.model";

const question = {
  id: 1,
  title: "useEffect는 언제 사용하나요?",
  content:
    "React에서 useEffect는 컴포넌트와 함께 사용하는 Hook으로 컴포넌트에서 어떤 역할을 수행하나요?",
  viewCount: 113,
  favoriteCount: 52,
  createdAt: "2023-10-01T12:00:00Z",
};

const answer: Answer = {
  id: 1,
  content:
    "useEffect는 컴포넌트가 마운트될 때 실행해야 하는 코드로 API호출, 이벤트리스너 등록, 타이머 설정등에 사용 됩니다. 또한 state 또는 props 값이 변경될 때 다시 데이터를 불러오는 것 같은 특정 값이 변경 될 때 사용합니다",
  viewCount: 213,
  favoriteCount: 26,
  createdAt: "2023-10-01T12:00:00Z",
  updatedAt: "2023-10-02T12:00:00Z",
  user: {
    nickname: "정호붕",
    profileImageUrl: undefined,
    level: 5,
    answerCount: 10,
    positionId: 1,
    email: "aaa@aaa",
  },
};

const comments = [
  {
    id: 1,
    profileImg: "프로필이미지",
    username: "정호붕",
    contents: "답변 챗지피티가 달아준거 티나염",
    comments: 24,
    likes: 52,
    reply: 12,
    totalComments: 24,
  },
];

function CommunityAnswerDetail() {
  return (
    <>
      <AnswerDetailStyle>
        <CommunityAnswer
          key={answer.id}
          questiontitle={question.title}
          category="React"
          answer={answer.content}
          likescount={answer.favoriteCount}
          viewscount={answer.viewCount}
        />
      </AnswerDetailStyle>
      {comments.map((comment) => (
        <ReplyInfo key={comment.id} totalcomments={3} />
      ))}
      <CommentStyle>
        {comments.map((item, index) => (
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

export default CommunityAnswerDetail;
