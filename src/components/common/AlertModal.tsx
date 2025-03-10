import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "./Modal";
import { ModalCommonProps } from "./ConfirmModal";

function AlertModal({ onClose }: ModalCommonProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    onClose();
    navigate(-1);
  };

  return (
    <Modal width="300px" height="150px">
      <AlertModalStyle>
        <div className="AlertModal">
          <p className="AlertMessage">제출되었습니다.</p>
          <button className="OkButton" type="button" onClick={handleGoBack}>
            확인
          </button>
        </div>
      </AlertModalStyle>
    </Modal>
  );
}

const AlertModalStyle = styled.div`
  .AlertModal {
    width: 300px;
    height: 150px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
    position: relative;

    .AlertMessage {
      padding: 37px 0;
      border-bottom: 1px solid #d9d9d9;
    }

    .OkButton {
      width: 100%;
      height: 50px;
      border: none;
      color: #333333;
      cursor: pointer;
      background: none;
      font-size: 16px;
    }
  }
`;

export default AlertModal;
