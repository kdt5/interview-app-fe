import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "./Modal";

interface Props {
  onClose: () => void;
}

function AlertModal({ onClose }: Props) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    onClose();
    navigate(-1);
  };

  return (
    <Modal width="300px" height="150px">
      <AlertModalStyle>
        <div className="alert-modal">
          <p className="alert-message">제출되었습니다.</p>
          <button className="ok-button" type="button" onClick={handleGoBack}>
            확인
          </button>
        </div>
      </AlertModalStyle>
    </Modal>
  );
}

const AlertModalStyle = styled.div`
  .alert-modal {
    width: 300px;
    height: 150px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
    position: relative;

    .alert-message {
      padding: 37px 0;
      border-bottom: 1px solid #d9d9d9;
    }

    .ok-button {
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
