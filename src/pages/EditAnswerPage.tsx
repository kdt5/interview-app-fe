import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { ModalType } from "./AnswerPage";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
import { deleteAnswer, editAnswer } from "../api/Answer.api";
import { addFavorite, removeFavorite } from "../api/Favorite.api";
import { useNavigate, useParams } from "react-router-dom";
import { useAnswer } from "../hooks/UseAnswer";

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
  } = useAnswer(parsedQuestionId, parsedAnswerId);
  const [currentAnswer, setCurrentAnswer] = useState(previousAnswer);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalsVisible, setIsModalsVisible] = useState({
    confirm: false,
    alert: false,
  });

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

  return (
    <EditAnswerPageStyle $isSubmitDisabled={isSubmitDisabled}>
      <div className="question-box">
        <div className="question-numbering">
          <p className="numbering-title">
            {question && String(question.id).padStart(2, "0")} |
          </p>
          <FavoriteIconStyle
            onClick={toggleFavorite}
            $isFavorite={isFavorite}
          />
        </div>
        <h2 className="question-title">{question && question.title}</h2>
        <span className="category-name">
          {question && question.categories[0]}
        </span>
      </div>
      <form action="/" className="answer-box">
        <textarea
          placeholder="답변을 작성해주세요."
          className="answer-text"
          value={currentAnswer}
          onChange={handleAnswerChange}
        ></textarea>
        <p className={`character-count ${isOverLimit ? "over-limit" : ""}`}>
          {currentAnswer.length}/500
        </p>
      </form>
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
          onClose={() => toggleModal("alert", false)}
          message={alertMessage}
        />
      )}
    </EditAnswerPageStyle>
  );
}

const FavoriteIconStyle = styled(FaStar)<{ $isFavorite: boolean }>`
  fill: ${({ $isFavorite: isFavorite }) =>
    isFavorite ? "#FFD600" : "#DFDFDF"};
  cursor: pointer;
  font-size: 24px;
`;

const EditAnswerPageStyle = styled.div<{ $isSubmitDisabled: boolean }>`
  width: 100%;
  max-width: 380px;
  box-sizing: border-box;
  padding: 25px 30px;

  .question-box {
    padding: 15px;
    box-sizing: border-box;
    width: 330px;
    height: fit-content;
    border: 1px solid #eff2f8;
    border-radius: 10px;
    background: #fbfbfb;

    .category-name {
      margin-top: 40px;
      background-color: #bbd3ff;
      color: #fff;
      font-size: 12px;
      font-weight: 300;
      border-radius: 15px;
      display: inline-block;
      padding: 3px 10px;
    }
  }

  .question-numbering {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .numbering-title {
      color: #888888;
    }

    svg {
      font-size: 24px;
      cursor: pointer;
    }
  }

  .question-title {
    font-weight: 600;
  }

  .answer-box {
    border: 1px solid #eff2f8;
    border-radius: 10px;
    width: 330px;
    height: 315px;
    margin: 10px 0;

    .answer-text {
      -ms-overflow-style: none;
      width: 100%;
      height: 100%;
      padding: 15px;
      border-radius: 10px;
      border: none;
      background: none;
      resize: none;
    }

    .answer-text:focus {
      outline: none;
    }

    .answer-text::-webkit-scrollbar {
      display: none;
    }

    .character-count {
      font-size: 14px;
      color: #888;
      text-align: right;
    }

    .character-count.over-limit {
      color: red;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-3px);
      }
      50% {
        transform: translateX(3px);
      }
      75% {
        transform: translateX(-3px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: start;
    margin-bottom: 100px;
  }

  .edit-button,
  .delete-button {
    height: 60px;
    font-size: 20px;
    margin-top: 30px;
  }

  .edit-button {
    flex-grow: 1;
    opacity: ${(props) => (props.$isSubmitDisabled ? 0.5 : 1)};
    cursor: ${(props) => (props.$isSubmitDisabled ? "not-allowed" : "pointer")};
  }

  .delete-button {
    background: #d32121;
  }
`;

export default EditAnswerPage;
