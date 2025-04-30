import styled from "styled-components";
import CommunityAnswer from "../../components/Community/CommunityAnswer";
import ReplyInfo from "../../components/common/Community/ReplyInfo";
import { useParams } from "react-router-dom";
import { useFetchAnswer } from "../../hooks/UseFetchAnswers";

function AnswerDetail() {
  const { answerId } = useParams() as { answerId: string };
  const { answer } = useFetchAnswer(parseInt(answerId));

  if (!answer) return null;

  return (
    <>
      <AnswerDetailStyle>
        <CommunityAnswer
          key={answer.id}
          className="interview"
          title={answer.question.title}
          questionId={answer.question.id}
          postCategoryId={answer.question.categories[0].category.id}
          {...answer}
        />
      </AnswerDetailStyle>
      <ReplyInfo totalComments={0} />
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

export default AnswerDetail;
