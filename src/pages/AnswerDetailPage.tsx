import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAnswer } from "../hooks/UseAnswer";
import QuestionContainer from "../components/AnswerPage/QuestionContainer";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import EditDeletePopUp from "../components/AnswerDetailPage/EditDeletePopUp";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
import { FRONTEND_URLS } from "../constants/Urls";
import { Link } from "react-router-dom";
import { replaceUrlParams } from "../utils/Url";

function AnswerDetailPage() {
  const { questionId, answerId } = useParams<{
    questionId: string;
    answerId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<"edit" | "delete" | null>(
    null
  );
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const parsedQuestionId = parseInt(questionId as string);
  const parsedAnswerId = parseInt(answerId as string);
  const { question, answer } = useAnswer(parsedQuestionId, parsedAnswerId);

  const queryParams = new URLSearchParams(location.search);
  const isPublicParam = queryParams.get("isPublic");
  const isPublic = isPublicParam === "true";

  if (questionId === undefined) {
    console.error("questionId 가 유효하지 않습니다.");
    navigate(FRONTEND_URLS.QUESTION_LIST);
    return null;
  }

  const handleEditClick = () => {
    setIsModalOpen(false);
    setActiveAction("edit");
  };

  const handleDeleteClick = () => {
    setIsModalOpen(false);
    setActiveAction("delete");
  };

  const handleConfirmAction = () => {
    if (activeAction === "edit") {
      navigate(
        replaceUrlParams(FRONTEND_URLS.ANSWER_EDIT, {
          questionId: parsedQuestionId.toString(),
          answerId: parsedAnswerId.toString(),
        })
      );
    } else if (activeAction === "delete") {
      setIsAlertVisible(true);
    }
    setActiveAction(null);
  };

  return (
    <AnswerDetailPageStyle>
      <QuestionContainer
        title={question?.title || "질문이 없습니다."}
        categoryId={question?.categories[0].category.id || 0}
      ></QuestionContainer>
      <VisibilityLabel>
        <p>
          답변 공개 설정
          {isPublic !== null && `: ${isPublic ? "공개" : "비공개"}`}
        </p>
      </VisibilityLabel>
      <AnswerContainer>
        <textarea readOnly className="answer-text" value={answer}></textarea>
        <MoreAnswerLink to="/community">답변 더 보기+</MoreAnswerLink>
      </AnswerContainer>
      <OptionButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <EditDeletePopUp
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {activeAction && (
        <ConfirmModal
          onClose={() => setActiveAction(null)}
          onConfirm={handleConfirmAction}
          message={
            activeAction === "edit" ? "수정하시겠습니까?" : "삭제하시겠습니까?"
          }
        />
      )}
      {isAlertVisible && (
        <AlertModal
          onClose={() => {
            setIsAlertVisible(false);
            navigate("/question-list/frontend");
          }}
          message="삭제되었습니다."
        />
      )}
    </AnswerDetailPageStyle>
  );
}

const AnswerDetailPageStyle = styled.div`
  position: relative;
`;

const VisibilityLabel = styled.div`
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

  p {
    font-size: 14px;
    font-weight: 400;
    color: #888888;
  }
`;

const AnswerContainer = styled.div`
  background: #fbfbfb;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 485px;
  justify-content: space-between;

  textarea {
    font-size: 14px;
    font-weight: 400;
    color: #888888;
    width: 100%;
    border: none;
    background: none;
    resize: none;
    -ms-overflow-style: none;
    height: 320px;
  }

  textarea:focus {
    outline: none;
  }
`;

const MoreAnswerLink = styled(Link)`
  font-size: 14px;
  border-radius: 25px;
  padding: 10px 15px;
  border: none;
  background: #6ea1ff;
  color: #ffffff;
`;

const OptionButton = styled(SlOptionsVertical)`
  position: absolute;
  top: -33px;
  right: 30px;
  z-index: 1000;
  font-size: 20px;
`;

export default AnswerDetailPage;
