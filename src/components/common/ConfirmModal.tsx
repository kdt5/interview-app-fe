import styled from "styled-components";
import Modal from "./Modal";

export interface ModalCommonProps {
  onClose: () => void;
  onConfirm?: () => void;
}

function ConfirmModal({ onClose, onConfirm }: ModalCommonProps) {
  return (
    <Modal width="300px" height="150px">
      <ConfirmModalStyle>
        <form
          className="ConfirmModal"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="ConfirmTitle">
            <p className="ConfirmMessage">
              제출 하시겠습니까?
              <br />
              제출 후, 수정 및 삭제는 불가능합니다.
            </p>
          </div>
          <div className="ConfirmButtons">
            <button className="OkButton" type="button" onClick={onConfirm}>
              확인
            </button>
            <span className="MiddleLine"></span>
            <button className="CancelButton" type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </ConfirmModalStyle>
    </Modal>
  );
}

const ConfirmModalStyle = styled.div`
  .ConfirmModal {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: #fff;
    position: relative;

    .ConfirmTitle {
      height: 100px;
      border-bottom: 1px solid #d9d9d9;
      box-sizing: border-box;

      .ConfirmMessage {
        padding-top: 29px;
        text-align: center;
      }
    }

    .ConfirmButtons {
      display: flex;
      justify-content: center;
      align-items: center;

      .OkButton,
      .CancelButton {
        flex-grow: 1;
        background: none;
        border: none;
        color: #333333;
        height: 50px;
        cursor: pointer;
        font-size: 16px;
      }

      .MiddleLine {
        width: 1px;
        height: 50px;
        background: #d9d9d9;
      }
    }
  }
`;

export default ConfirmModal;
