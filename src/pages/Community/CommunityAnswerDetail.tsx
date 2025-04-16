import styled from "styled-components";
import CommunityAnswer from "../../components/Community/CommunityAnswer";
import CommentContents from "../../components/common/Comment";
import TextArea from "../../components/common/Community/Textarea";

const AnswerData = [
  {
    category: "Javascript",
    questiontitle: "useEffect 훅은 언제 사용하는가?",
    answer:
      "useEffect는 컴포넌트가 마운트될 때 실행해야 하는 코드로 API호출, 이벤트리스너 등록, 타이머 설정등에 사용 됩니다. 또한 state 또는 props 값이 변경될 때 다시 데이터를 불러오는 것 같은 특정 값이 변경 될 때 사용합니다",
    views: 213,
    likes: 26,
  },
];

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

function CommunityAnswerDetail() {
  return (
    <>
      <AnswerDetailStyle>
        {AnswerData.map((item, index) => (
          <CommunityAnswer key={index} {...item} />
        ))}
      </AnswerDetailStyle>
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

export default CommunityAnswerDetail;
