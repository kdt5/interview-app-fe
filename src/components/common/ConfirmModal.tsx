import styled from "styled-components";
import Modal from "./Modal";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm?: () => void;
}

function ConfirmModal({ onClose, onConfirm }: ConfirmModalProps) {
  return (
    <Modal width="300px" height="150px">
      <ConfirmModalStyle>
        <form
          className="confirm-modal"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="confirm-title">
            <p className="confirm-message">
              제출 하시겠습니까?
              <br />
              제출 후, 수정 및 삭제는 불가능합니다.
            </p>
          </div>
          <div className="confirm-buttons">
            <button className="ok-button" type="button" onClick={onConfirm}>
              확인
            </button>
            <span className="middle-line"></span>
            <button className="cancel-button" type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </ConfirmModalStyle>
    </Modal>
  );
}

const ConfirmModalStyle = styled.div`
  .confirm-modal {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: #ffffff;
    position: relative;

    .confirm-title {
      height: 100px;
      border-bottom: 1px solid #d9d9d9;
      box-sizing: border-box;

      .confirm-message {
        padding-top: 29px;
        text-align: center;
      }
    }

    .confirm-buttons {
      display: flex;
      justify-content: center;
      align-items: center;

      .ok-button,
      .cancel-button {
        flex-grow: 1;
        background: none;
        border: none;
        color: #333333;
        height: 50px;
        cursor: pointer;
        font-size: 16px;
      }

      .middle-line {
        width: 1px;
        height: 50px;
        background: #d9d9d9;
      }
    }
  }
`;

export default ConfirmModal;
