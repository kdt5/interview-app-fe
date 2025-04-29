import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAnswer } from "../hooks/UseAnswer";
import QuestionContainer from "../components/AnswerPage/QuestionContainer";
import AnswerForm from "../components/AnswerPage/AnswerForm";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import RadioButtonModal from "../components/RecordAnswerPage/RadioButtonModal";
import { replaceUrlParams } from "../utils/Url";
import { FRONTEND_URLS } from "../constants/Urls";

export type ModalType = "confirm" | "alert";

function RecordAnswerPage() {
  const navigate = useNavigate();
  const { questionId, answerId } = useParams<{
    questionId: string;
    answerId: string;
  }>();

  const parsedQuestionId = parseInt(questionId as string);
  const parsedAnswerId = parseInt(answerId as string);
  const { question, answer, setAnswer } = useAnswer(
    parsedQuestionId,
    parsedAnswerId
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState<boolean | null>(null);

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

  const isSubmitDisabled =
    answer.trim() === "" || answer.length < 0 || isPublic === null;

  const handleSubmitSuccess = () => {
    navigate(
      replaceUrlParams(FRONTEND_URLS.ANSWER_DETAIL, {
        questionId: parsedQuestionId.toString(),
        answerId: parsedAnswerId.toString(),
      })
    );
  };

  return (
    <>
      <QuestionContainer title={question?.title || "질문이 없습니다."} />
      <ToggleVisibilityButton onClick={() => setIsModalOpen(true)}>
        <Label>
          답변 공개 설정
          {isPublic !== null && `: ${isPublic ? "공개" : "비공개"}`}
        </Label>
        <SlArrowRight />
      </ToggleVisibilityButton>
      <AnswerForm
        answer={answer}
        handleAnswerChange={handleAnswerChange}
        isOverLimit={isOverLimit}
        isPublic={isPublic}
        onSubmitSuccess={handleSubmitSuccess}
        buttonText="완료"
        isSubmitDisabled={isSubmitDisabled}
      />
      {isModalOpen && (
        <RadioButtonModal
          visibility={isPublic === null ? null : isPublic ? "공개" : "비공개"}
          onClose={() => setIsModalOpen(false)}
          onChange={(value) => {
            setIsPublic(value === "공개");
          }}
        />
      )}
    </>
  );
}

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
