import styled from "styled-components";
import { deletePost, fetchPostOwnership } from "../../../api/Post.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../../../constants/Urls";

interface Props {
  onClose?: () => void;
  postId?: number;
  title?: string;
  content?: string;
  postCategoryId?: number;
  message?: string;
}

function CommunityModal({ onClose, postId, title, content, postCategoryId }: Props) {
  const navigate = useNavigate();

  const [isMyData, setIsMyData] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    const checkOwnership = async () => {
      if (postId !== undefined) {
        try {
          const result = await fetchPostOwnership(postId);
          setIsMyData(result);
        } catch {
          setIsMyData(false);
        }
      }
    };
    checkOwnership();
  }, [postId]);

  const handleEdit = () => {
    if (postId) {
      navigate(`${FRONTEND_URLS.COMMUNITY.POST_EDIT.replace(":postId", String(postId))}`, {
        state: {
          postId,
          currentTitle: title,
          currentContent: content,
          currentCategoryId: postCategoryId,
        }
      });
    }
  };

  const handleDelete = async () => {
    if(!postId) return;
    try {
      const result = await deletePost(postId);
      if(result) {
        setShowSuccessModal(true);
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleSuccessOk = () => {
    navigate(FRONTEND_URLS.COMMUNITY.POST);
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
                  onClick={() => alert("신고했습니다.")}
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
              성공적으로 삭제되었습니다.
            </p>
            <button className="action-button close" onClick={handleSuccessOk}>
              확인
            </button>
          </CenterModalContainer>
        </CenterModalBackdrop>
      )}
    </>
  );
}

const CenterModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000; // higher than BackDrop
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterModalContainer = styled.div`
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
  padding: 20px 16px;
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
