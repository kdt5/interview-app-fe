import styled from "styled-components";
import { deleteComment, deletePost, fetchCommentOwnership, fetchPostOwnership } from "../../../api/Post.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../../../constants/Urls";
import { deleteAnswer, fetchAnswerOwnership } from "../../../api/Answer.api";
import ReportModal from "../Modal/ReportModal";

interface Props {
  className?: string;
  questionId?: number;
  onClose?: () => void;
  postId?: number;
  title?: string;
  content?: string;
  postCategoryId?: number;
  message?: string;
  setEditTarget?: (target: { id: number; content: string }) => void
}

function CommunityModal({ className, questionId, onClose, postId, title, content, postCategoryId, setEditTarget }: Props) {
  const navigate = useNavigate();

  const [isMyData, setIsMyData] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const checkOwnership = async () => {
      if (postId !== undefined) {
        try {
          if(className === "interview") {
            const result = await fetchAnswerOwnership(postId);
            setIsMyData(result);
          } else if(className === "comment"){
            const result = await fetchCommentOwnership(postId);
            setIsMyData(result);
          } else {
            const result = await fetchPostOwnership(postId);
            setIsMyData(result);
          }
        } catch {
          setIsMyData(false);
        }
      }
    };
    checkOwnership();
  }, [postId]);

  const handleEdit = () => {
    if(postId){
      if(className === "comment") {
        setEditTarget?.({id: postId, content: content || ""});
        onClose?.();
      } else if(className === "interview") {
        navigate(`${FRONTEND_URLS.ANSWER_EDIT.replace(":questionId", String(questionId)).replace(":answerId", String(postId))}`);
      } else {
        navigate(`${FRONTEND_URLS.COMMUNITY.POST_EDIT.replace(":postId", String(postId))}`, {
          state: {
            postId,
            currentTitle: title,
            currentContent: content,
            currentCategoryId: postCategoryId,
          }
        });
      }
    }
  };

  const handleDelete = async () => {
    if(!postId) return;
    try {
      let result;
      if(className === "interview") {
        result = await deleteAnswer(postId);
      } else if(className === "comment") {
        result = await deleteComment(postId);
      } else {
        result = await deletePost(postId);
      }
      if(result) {
        setSuccessMessage("삭제에 성공했습니다.");
      } else {
        setSuccessMessage("삭제에 실패했습니다.");
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error("삭제 오류:", error);
      setSuccessMessage("삭제에 실패했습니다.");
      setShowSuccessModal(true);
    }
  };

  const onOpenReport = () => {
    setShowReportModal(true);
  };

  const onCloseReport = () => {
    setShowReportModal(false);
  };

  const handleSuccessOk = () => {
    navigate(FRONTEND_URLS.COMMUNITY.MAIN);
  };

  return (
    <>
      {!showSuccessModal && (
        <BackDrop onClick={onClose}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            {isMyData ? (
              <>
                <button className="action-button delete" onClick={handleDelete}>
                  삭제
                </button>
                <button className="action-button edit" onClick={handleEdit}>
                  수정
                </button>
              </>
            ) : (
              <>
                <button
                  className="action-button report"
                  onClick={onOpenReport}
                >
                  신고
                </button>
                <button className="action-button close" onClick={onClose}>
                  닫기
                </button>
              </>
            )}
          </ModalContainer>
        </BackDrop>
      )}

      {showSuccessModal && (
        <CenterModalBackdrop>
          <CenterModalContainer onClick={(e) => e.stopPropagation()}>
            <p style={{ textAlign: "center", marginBottom: "16px" }}>
              {successMessage}
            </p>
            <button className="action-button close" onClick={handleSuccessOk}>
              확인
            </button>
          </CenterModalContainer>
        </CenterModalBackdrop>
      )}
      {showReportModal && <ReportModal onClose={onCloseReport}/>}
    </>
  );
}

export const CenterModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000; // higher than BackDrop
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterModalContainer = styled.div`
  background: #ffffff;
  padding: 30px 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;

  .action-button {
    margin-top: 20px;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: none;
    background-color: #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    color: #555;
  }
`;

const BackDrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  max-width: 380px;
  margin: 0 auto;
`;

const ModalContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px 30px;
  box-sizing: border-box;

  .action-button {
    width: 100%;
    padding: 14px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  .delete,
  .report {
    background-color: #fbfbfb;
    color: #ff7070;
  }

  .edit {
    background-color: #fbfbfb;
    color: #888;
  }

  .close {
    background-color: #fff;
    color: #888;
  }
`;
export default CommunityModal;
