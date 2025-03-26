import styled from "styled-components";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../api/Favorite.api";
import { useNavigate, useParams } from "react-router-dom";
import { recordAnswer } from "../api/Answer.api";
import { useAnswer } from "../hooks/UseAnswer";
import QuestionContainer from "../components/AnswerPage/QuestionContainer";
import AnswerForm from "../components/AnswerPage/AnswerForm";

export type ModalType = "confirm" | "alert";

function AnswerPage() {
  const navigate = useNavigate();
  const { questionId } = useParams<{
    questionId: string;
  }>();

  if (questionId === undefined) {
    console.error("questionId 또는 answerId 가 유효하지 않습니다.");
    navigate(-1);
  }

  const parsedQuestionId = parseInt(questionId as string);
  const { question, answer, isFavorite, setAnswer, setIsFavorite } =
    useAnswer(parsedQuestionId);
  const [isModalsVisible, setIsModalsVisible] = useState({
    confirm: false,
    alert: false,
  });

  const handleSubmit = () => {
    toggleModal("confirm", true);
  };

  const handleConfirmSubmit = async () => {
    if (typeof question?.id === "undefined") {
      console.error("question 가 유효하지 않습니다.");
      return;
    }

    try {
      await recordAnswer(answer, question.id);
      toggleModal("confirm", false);
      toggleModal("alert", true);
    } catch (error) {
      console.log("제출에 실패하였습니다.", error);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const answerCount = e.target.value;

    if (answerCount.length <= 500) {
      setAnswer(answerCount);
    }
  };

  const toggleModal = (type: ModalType, state: boolean) => {
    setIsModalsVisible((prev) => ({
      ...prev,
      [type]: state,
    }));
  };

  const toggleFavorite = async () => {
    if (question === undefined) return;

    setIsFavorite(!isFavorite);

    try {
      if (isFavorite) {
        removeFavorite(question?.id);
      } else {
        addFavorite(question?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isSubmitDisabled = answer.trim() === "" || answer.length < 0;
  const isOverLimit = answer.length >= 500;

  return (
    <AnswerPageStyle $isSubmitDisabled={isSubmitDisabled}>
      <QuestionContainer
        questionId={String(question?.id)}
        title={question?.title || "질문이 없습니다."}
        category={question?.categories[0] || "카테고리가"}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <AnswerForm
        answer={answer}
        handleAnswerChange={handleAnswerChange}
        isOverLimit={isOverLimit}
      />
      <button
        className="submit-button"
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        제출
      </button>
      {isModalsVisible.confirm && (
        <ConfirmModal
          onClose={() => toggleModal("confirm", false)}
          onConfirm={handleConfirmSubmit}
          message="답변을 제출하시겠습니까?"
        />
      )}
      {isModalsVisible.alert && (
        <AlertModal
          onClose={() => {
            toggleModal("alert", false);
            navigate(-1);
          }}
          message="제출되었습니다."
        />
      )}
    </AnswerPageStyle>
  );
}

export const AnswerPageStyle = styled.div<{ $isSubmitDisabled: boolean }>`
  width: 100%;
  max-width: 380px;
  box-sizing: border-box;
  padding: 25px 30px;

  .submit-button {
    width: 330px;
    height: 60px;
    font-size: 20px;
    margin-top: 30px;
    opacity: ${(props) => (props.$isSubmitDisabled ? 0.5 : 1)};
    cursor: ${(props) => (props.$isSubmitDisabled ? "not-allowed" : "pointer")};
    margin-bottom: 100px;
  }
`;

export default AnswerPage;
