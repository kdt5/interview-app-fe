import styled from "styled-components";
import { useQuestion } from "../../hooks/UseQuestions";
import { Link, useParams } from "react-router-dom";
import { useFetchAnswers } from "../../hooks/UseFetchAnswers";
import { FRONTEND_URLS } from "../../constants/Urls";
import CommunityList from "../../components/common/List/CommunityList";

function CommunityAnswerDetail() {
  const { questionId } = useParams() as { questionId: string };
  const { question } = useQuestion(parseInt(questionId));
  const { answers } = useFetchAnswers(parseInt(questionId));

  if (!question || !answers) return null;
  
  return (
    <>
      <QuestionBox>
        <QuestionText>Q. </QuestionText>{question.title}
      </QuestionBox>

      <AnswerListStyle>
        {answers.map((item) => (
          <Link key={item.id} to={`${FRONTEND_URLS.COMMUNITY.ANSWER_DETAIL.replace(":questionId", questionId).replace(":answerId", item.id.toString())}}`}>
            <CommunityList {...item} />
          </Link>
        ))}
      </AnswerListStyle>
    </>
  );
}

export const QuestionBox = styled.div`
  background-color: #f5f6f8;
  padding: 20px 16px;
  border-radius: 12px;
  margin: 0 16px 24px 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  white-space: pre-line;
`;

export const QuestionText = styled.span`
  color: #2563eb;
  font-weight: 700;
  margin-right: 6px;
`;

export const AnswerListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 16px;
`;


export default CommunityAnswerDetail;
