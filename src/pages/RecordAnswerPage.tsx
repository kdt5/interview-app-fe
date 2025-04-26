import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAnswer } from "../hooks/UseAnswer";
import QuestionContainer from "../components/AnswerPage/QuestionContainer";
import AnswerForm from "../components/AnswerPage/AnswerForm";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import RadioButtonModal from "../components/RecordAnswerPage/RadioButtonModal";

export type ModalType = "confirm" | "alert";

function RecordAnswerPage() {
  const navigate = useNavigate();
  const { questionId } = useParams<{
    questionId: string;
  }>();

  const parsedQuestionId = parseInt(questionId as string);
  const { question, answer, setAnswer } = useAnswer(parsedQuestionId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibility, setVisibility] = useState<"공개" | "비공개" | null>(null);

  if (questionId === undefined) {
    console.error("questionId 또는 answerId 가 유효하지 않습니다.");
    navigate(-1);
    return null;
  }

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const answerCount = e.target.value;

    if (answerCount.length <= 500) {
      setAnswer(answerCount);
    }
  };

  const isOverLimit = answer.length >= 500;

  return (
    <RecordAnswerPageStyle>
      <QuestionContainer title={question?.title || "질문이 없습니다."} />
      <ToggleVisibilityButton onClick={() => setIsModalOpen(true)}>
        <Label>답변 공개 설정{visibility ? `: ${visibility}` : ""}</Label>
        <SlArrowRight />
      </ToggleVisibilityButton>
      <AnswerForm
        answer={answer}
        handleAnswerChange={handleAnswerChange}
        isOverLimit={isOverLimit}
      />
      {isModalOpen && (
        <RadioButtonModal
          visibility={visibility}
          onClose={() => setIsModalOpen(false)}
          onChange={(value) => {
            setVisibility(value);
          }}
        />
      )}
    </RecordAnswerPageStyle>
  );
}

export const RecordAnswerPageStyle = styled.div``;

const ToggleVisibilityButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  border-radius: 0;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  padding: 18px 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

export default RecordAnswerPage;
