import styled from "styled-components";

interface Props {
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  message?: string;
}

function CommunityModal({ onClose, onEdit, onDelete }: Props) {
  const isMyData = true;

  return (
    <>
      <BackDrop onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          {isMyData ? (
            <>
              <button className="action-button delete" onClick={onDelete}>
                삭제
              </button>
              <button className="action-button edit" onClick={onEdit}>
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
    </>
  );
}

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

  .report {
    background-color: #fbfbfb;
    color: #888;
  }

  .close {
    background-color: #fff;
    color: #888;
  }
`;
export default CommunityModal;
