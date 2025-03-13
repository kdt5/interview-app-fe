import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  onClose: () => void;
}

function AlertModal({ onClose }: Props) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    onClose();
    navigate(-1);
  };

  return createPortal(
    <AlertModalStyle>
      <div className="AlertModalBackground">
        <div className="AlertModal">
          <p>제출되었습니다.</p>
          <button type="button" onClick={handleGoBack}>
            확인
          </button>
        </div>
      </div>
    </AlertModalStyle>,
    document.body
  );
}

const AlertModalStyle = styled.div`
  .AlertModalBackground {
    width: 100%;
    height: 100dvh;
    max-width: 380px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .AlertModal {
    width: 300px;
    height: 150px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
  }

  p {
    padding: 37px 0;
    border-bottom: 1px solid #d9d9d9;
  }

  button {
    padding-top: 12px;
    width: 100%;
    border: none;
    color: #333333;
    cursor: pointer;
    background: none;
    font-size: 16px;
  }
`;

export default AlertModal;
