import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
import { useQuestion } from "../hooks/UseQuestion";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../api/Favorite.api";
import { useNavigate, useParams } from "react-router-dom";
import { recordAnswer } from "../api/Answer.api";
import { fetchQuestion } from "../api/Question.api";
import { Question } from "../models/Question.model";

type ModalType = "confirm" | "alert";

function AnswerPage() {
  const questionId = Number(useParams<{ questionId: string }>().questionId);
  const { getCategoryName } = useQuestion();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [answer, setAnswer] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalsVisible, setIsModalsVisible] = useState({
    confirm: false,
    alert: false,
  });

  useEffect(() => {
    fetchQuestion(questionId).then((question) => {
      setQuestion(question);
    });
  }, [questionId]);

  const handleSubmit = () => {
    toggleModal("confirm", true);
  };

  const handleConfirmSubmit = async () => {
    try {
      recordAnswer(answer, questionId);
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

    try {
      if (isFavorite) {
        setIsFavorite(false);
        removeFavorite(questionId);
      } else {
        setIsFavorite(true);
        addFavorite(questionId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isSubmitDisabled = answer.trim() === "" || answer.length <= 20;
  const isOverLimit = answer.length >= 500;

  return (
    <AnswerPageStyle isSubmitDisabled={isSubmitDisabled}>
      <div className="question-box">
        <div className="question-numbering">
          <p className="numbering-title">
            {String(questionId).padStart(2, "0")} |
          </p>
          <FavoriteIcon onClick={toggleFavorite} isFavorite={isFavorite} />
        </div>
        <h2 className="question-title">{question?.title}</h2>
        <span className="category-name">
          {question && getCategoryName(question?.categories[0])}
        </span>
      </div>
      <form action="/" className="answer-box">
        <textarea
          placeholder="답변을 작성해주세요."
          className="answer-text"
          value={answer}
          onChange={handleAnswerChange}
        ></textarea>
        <p className={`character-count ${isOverLimit ? "over-limit" : ""}`}>
          {answer.length}/500
        </p>
      </form>
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
          message="제출 하시겠습니까?\n제출 후, 수정 및 삭제는 불가능합니다."
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

const FavoriteIcon = styled(FaStar)<{ isFavorite: boolean }>`
  fill: ${({ isFavorite }) => (isFavorite ? "#FFD600" : "#DFDFDF")};
  cursor: pointer;
  font-size: 24px;
`;

const AnswerPageStyle = styled.div<{ isSubmitDisabled: boolean }>`
  width: 100%;
  max-width: 380px;
  box-sizing: border-box;
  padding: 25px 30px;

  .question-box {
    padding: 10px 15px;
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

  .submit-button {
    width: 330px;
    height: 60px;
    font-size: 20px;
    margin-top: 30px;
    opacity: ${(props) => (props.isSubmitDisabled ? 0.5 : 1)};
    cursor: ${(props) => (props.isSubmitDisabled ? "not-allowed" : "pointer")};
    margin-bottom: 100px;
  }
`;

export default AnswerPage;
