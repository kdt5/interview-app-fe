import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnswerPageStyle, ModalType } from "./AnswerPage";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
import { deleteAnswer, editAnswer } from "../api/Answer.api";
import { addFavorite, removeFavorite } from "../api/Favorite.api";
import { useNavigate, useParams } from "react-router-dom";
import { useAnswer } from "../hooks/UseAnswer";
import QuestionContainer from "../components/AnswerPage/QuestionContainer";
import AnswerForm from "../components/AnswerPage/AnswerForm";
import { useCategory } from "../hooks/UseCategory";

function EditAnswerPage() {
  const navigate = useNavigate();
  const { questionId, answerId } = useParams<{
    questionId: string;
    answerId: string;
  }>();

  if (questionId === undefined || answerId === undefined) {
    console.error("questionId 또는 answerId 가 유효하지 않습니다.");
    navigate(-1);
  }

  const parsedQuestionId = parseInt(questionId as string);
  const parsedAnswerId = parseInt(answerId as string);
  const {
    question,
    answer: previousAnswer,
    isFavorite,
    setIsFavorite,
  } = useAnswer(parsedQuestionId, parsedAnswerId);
  const [currentAnswer, setCurrentAnswer] = useState(previousAnswer);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalsVisible, setIsModalsVisible] = useState({
    confirm: false,
    alert: false,
  });

  const { getCategoryName } = useCategory();

  useEffect(() => {
    setCurrentAnswer(previousAnswer);
  }, [previousAnswer]);

  const isSubmitDisabled =
    currentAnswer.trim() === "" ||
    currentAnswer.length < 0 ||
    previousAnswer === currentAnswer;
  const isOverLimit = currentAnswer.length >= 500;

  const handleEditClick = () => {
    setConfirmMessage("답변을 수정하시겠습니까?");
    toggleModal("confirm", true);
  };

  const handleDeleteClick = () => {
    setConfirmMessage("답변을 삭제하시겠습니까?");
    toggleModal("confirm", true);
  };

  const handleConfirmSubmit = async () => {
    if (typeof question?.id === "undefined") {
      console.error("question 가 유효하지 않습니다.");
      return;
    }

    if (confirmMessage === "답변을 수정하시겠습니까?") {
      try {
        await editAnswer(parsedAnswerId, currentAnswer);
        setAlertMessage("수정되었습니다.");
        toggleModal("confirm", false);
        toggleModal("alert", true);
      } catch (error) {
        console.log("수정에 실패하였습니다.", error);
      }
    } else {
      try {
        await deleteAnswer(parsedAnswerId);
        setAlertMessage("삭제되었습니다.");
        toggleModal("confirm", false);
        toggleModal("alert", true);
      } catch (error) {
        console.log("삭제에 실패하였습니다.", error);
      }
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextAnswer = e.target.value;

    if (nextAnswer.length <= 500) {
      setCurrentAnswer(nextAnswer);
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

  const category = question?.categories[0]
    ? getCategoryName(question?.categories[0]?.id)
    : "카테고리가 없습니다.";

  return (
    <EditAnswerPageStyle $isSubmitDisabled={isSubmitDisabled}>
      <QuestionContainer
        questionId={String(question?.id)}
        title={question?.title || "질문이 없습니다."}
        category={category}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <AnswerForm
        answer={currentAnswer}
        handleAnswerChange={handleAnswerChange}
        isOverLimit={isOverLimit}
      />
      <div className="buttons">
        <button
          className="edit-button"
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleEditClick}
        >
          수정
        </button>
        <button
          className="delete-button"
          type="submit"
          onClick={handleDeleteClick}
        >
          삭제
        </button>
      </div>
      {isModalsVisible.confirm && (
        <ConfirmModal
          onClose={() => toggleModal("confirm", false)}
          onConfirm={handleConfirmSubmit}
          message={confirmMessage}
        />
      )}
      {isModalsVisible.alert && (
        <AlertModal
          onClose={() => {
            toggleModal("alert", false);
            navigate(-1);
          }}
          message={alertMessage}
        />
      )}
    </EditAnswerPageStyle>
  );
}

const EditAnswerPageStyle = styled(AnswerPageStyle)<{
  $isSubmitDisabled: boolean;
}>`
  .buttons {
    display: flex;
    justify-content: start;
    margin-bottom: 100px;

    .edit-button,
    .delete-button {
      height: 60px;
      font-size: 20px;
      margin-top: 30px;
    }

    .edit-button {
      flex-grow: 1;
      opacity: ${(props) => (props.$isSubmitDisabled ? 0.5 : 1)};
      cursor: ${(props) =>
        props.$isSubmitDisabled ? "not-allowed" : "pointer"};
    }

    .delete-button {
      background: #d32121;
    }
  }
`;

export default EditAnswerPage;
