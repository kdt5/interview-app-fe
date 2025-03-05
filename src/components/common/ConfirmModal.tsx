import { createPortal } from "react-dom";
import styled from "styled-components";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmModal({ onClose, onConfirm }: ConfirmModalProps) {
  return createPortal(
    <ConfirmModalStyle>
      <div className="ConfirmModalBackground">
        <form
          className="ConfirmModal"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="ConfirmTitle">
            <p>
              제출 하시겠습니까?
              <br />
              제출 후, 수정 및 삭제는 불가능합니다.
            </p>
          </div>
          <div className="ConfirmButton">
            <button className="btn1" type="button" onClick={onConfirm}>
              확인
            </button>
            <div></div>
            <button className="btn1" type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </ConfirmModalStyle>,
    document.body
  );
}

const ConfirmModalStyle = styled.div`
  width: 100%;
  max-width: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  .ConfirmModalBackground {
    width: 380px;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.5);
    padding: 0;

    .ConfirmModal {
      width: 300px;
      height: 150px;
      border-radius: 10px;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .ConfirmTitle {
        height: 100px;
        border-bottom: 1px solid #d9d9d9;
        box-sizing: border-box;
        p {
          padding-top: 29px;
          text-align: center;
        }
      }

      .ConfirmButton {
        display: flex;
        justify-content: center;
        align-items: center;

        .btn1 {
          flex-grow: 1;
          background: none;
          border: none;
          color: #333333;
          height: 50px;
          cursor: pointer;
          font-size: 16px;
        }

        div {
          width: 1px;
          height: 50px;
          background: #d9d9d9;
        }
      }
    }
  }
`;

export default ConfirmModal;
