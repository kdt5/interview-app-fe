import styled from "styled-components";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

function EditDeletePopUp({ onEdit, onDelete, onClose }: Props) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <BackDrop onClick={handleBackdropClick}>
        <EditDeletePopUpStyle onClick={handlePopupClick}>
          <button className="action-button delete" onClick={onDelete}>
            삭제
          </button>
          <button className="action-button edit" onClick={onEdit}>
            수정
          </button>
        </EditDeletePopUpStyle>
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

const EditDeletePopUpStyle = styled.div`
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

  .delete {
    background-color: #fbfbfb;
    color: #ff7070;
  }

  .edit {
    background-color: #fbfbfb;
    color: #888;
  }
`;

export default EditDeletePopUp;
