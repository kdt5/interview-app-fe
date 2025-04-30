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
        <QuestionTextWrap>
          <QuestionTextIcon>Q. </QuestionTextIcon>
          <QuestionText>{question.title}</QuestionText>
        </QuestionTextWrap>
      </QuestionBox>

      <AnswerListStyle>
        {answers.map((item) => (
          <Link
            key={item.id}
            to={`${FRONTEND_URLS.COMMUNITY.ANSWER_DETAIL.replace(":questionId", questionId).replace(":answerId", item.id.toString())}}`}
          >
            <CommunityList {...item} />
          </Link>
        ))}
      </AnswerListStyle>
    </>
  );
}

export const QuestionBox = styled.div`
  background-color: #f9f9f9;
  padding: 20px 16px;
  border-radius: 12px;
  margin: 24px 30px 16px 30px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  white-space: pre-line;
`;

export const QuestionTextWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const QuestionTextIcon = styled.p`
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  width: 24px;
  height: 24px;
  background: #6ea1ff;
  border-radius: 50%;
  margin-right: 10px;
`;

export const QuestionText = styled.p`
  font-weight: 600;
  font-size: 16px;
  width: 250px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export const AnswerListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 16px;
`;

export default CommunityAnswerDetail;
