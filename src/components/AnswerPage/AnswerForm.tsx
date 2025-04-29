import styled from "styled-components";
import ConfirmModal from "../common/ConfirmModal";
import AlertModal from "../common/AlertModal";
import { useState } from "react";
import { ModalType } from "../../pages/RecordAnswerPage";
import { useAnswer } from "../../hooks/UseAnswer";
import { useParams } from "react-router-dom";
import { recordAnswer } from "../../api/Answer.api";
import GrayButton from "../common/Button/GrayButton";

interface Props {
  answer: string;
  handleAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isOverLimit: boolean;
  isPublic?: boolean | null;
  onSubmitSuccess: () => void;
  buttonText: string;
  isSubmitDisabled: boolean;
}

function AnswerForm({
  answer,
  handleAnswerChange,
  isOverLimit,
  onSubmitSuccess,
  buttonText,
  isSubmitDisabled,
}: Props) {
  const [isModalsVisible, setIsModalsVisible] = useState({
    confirm: false,
    alert: false,
  });

  const { questionId } = useParams<{
    questionId: string;
  }>();

  const parsedQuestionId = parseInt(questionId as string);
  const { question } = useAnswer(parsedQuestionId);

  const toggleModal = (type: ModalType, state: boolean) => {
    setIsModalsVisible((prev) => ({
      ...prev,
      [type]: state,
    }));
  };

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

  return (
    <AnswerFormStyle $isSubmitDisabled={isSubmitDisabled}>
      <textarea
        placeholder="질문에 답변해주세요."
        className="answer-text"
        value={answer}
        onChange={handleAnswerChange}
      ></textarea>
      <div className="bottom-container">
        <p className={`character-count ${isOverLimit ? "over-limit" : ""}`}>
          {answer.length} / 500
        </p>
        <GrayButton
          className="submit-button"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          {buttonText}
        </GrayButton>
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
              onSubmitSuccess();
            }}
            message="제출되었습니다."
          />
        )}
      </div>
    </AnswerFormStyle>
  );
}

const AnswerFormStyle = styled.form<{ $isSubmitDisabled: boolean }>`
  .answer-text {
    -ms-overflow-style: none;
    width: 100%;
    height: 320px;
    padding: 20px 30px;
    border-radius: 0;
    border: none;
    background: none;
    resize: none;
    font-size: 14px;
    font-weight: 400;
    color: #888888;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5f5;
  }

  .answer-text:focus {
    outline: none;
  }

  .answer-text::-webkit-scrollbar {
    display: none;
  }

  .character-count {
    font-size: 16px;
    color: #333333;
    text-align: left;
  }

  .character-count.over-limit {
    color: red;
  }

  .bottom-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px auto;
    padding: 0 30px;
  }

  .submit-button {
    width: 105px;
    height: 60px;
    font-size: 16px;
    color: ${(props) => (props.$isSubmitDisabled ? "#aaaaaa" : "#ffffff")};
    border-radius: 5px;
    opacity: ${(props) => (props.$isSubmitDisabled ? 0.5 : 1)};
    cursor: ${(props) => (props.$isSubmitDisabled ? "not-allowed" : "pointer")};
    background: ${(props) => (props.$isSubmitDisabled ? "#fbfbfb" : "#6ea1ff")};
  }
`;

export default AnswerForm;
