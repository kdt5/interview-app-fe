import styled from "styled-components";
import { useEffect, useState } from "react";
import { ModalType } from "./RecordAnswerPage";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
import { editAnswer } from "../api/Answer.api";
import { useNavigate, useParams } from "react-router-dom";
import { useAnswer } from "../hooks/UseAnswer";
import QuestionContainer from "../components/AnswerPage/QuestionContainer";
import { replaceUrlParams } from "../utils/Url";
import { FRONTEND_URLS } from "../constants/Urls";
import EditAnswerForm from "../components/AnswerPage/EditAnswerForm";

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
  const { question, answer: previousAnswer } = useAnswer(
    parsedQuestionId,
    parsedAnswerId
  );
  const [currentAnswer, setCurrentAnswer] = useState(previousAnswer);
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

  const handleConfirmSubmit = async () => {
    if (typeof question?.id === "undefined") {
      console.error("question 가 유효하지 않습니다.");
      return;
    }
    console.log("submit");

    try {
      await editAnswer(parsedAnswerId, currentAnswer);
      setAlertMessage("수정되었습니다.");
      toggleModal("confirm", false);
      toggleModal("alert", true);
    } catch (error) {
      console.log("수정에 실패하였습니다.", error);
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

  const handleSubmitSuccess = () => {
    navigate(
      replaceUrlParams(FRONTEND_URLS.ANSWER_DETAIL, {
        questionId: parsedQuestionId.toString(),
        answerId: parsedAnswerId.toString(),
      })
    );
  };

  return (
    <EditAnswerPageStyle $isSubmitDisabled={isSubmitDisabled}>
      <QuestionContainer title={question?.title || "질문이 없습니다."} categoryId={question?.categories[0].category.id || 0}/>
      <EditAnswerForm
        answer={currentAnswer}
        handleAnswerChange={handleAnswerChange}
        isOverLimit={isOverLimit}
        onSubmitSuccess={() => toggleModal("confirm", true)}
        buttonText="수정"
        isSubmitDisabled={isSubmitDisabled}
      />
      {isModalsVisible.confirm && (
        <ConfirmModal
          onClose={() => toggleModal("confirm", false)}
          onConfirm={handleConfirmSubmit}
          message="답변을 수정하시겠습니까?"
        />
      )}
      {isModalsVisible.alert && (
        <AlertModal
          onClose={() => {
            toggleModal("alert", false);
            handleSubmitSuccess();
          }}
          message={alertMessage}
        />
      )}
    </EditAnswerPageStyle>
  );
}

const EditAnswerPageStyle = styled.div<{ $isSubmitDisabled: boolean }>`
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
