import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import ConfirmModal from "../components/common/ConfirmModal";
import { useState } from "react";
import AlertModal from "../components/common/AlertModal";

function AnswerPage() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  const handleOpenAlertModal = () => {
    setOpenAlertModal(true);
  };

  const handlCloseAlertModal = () => {
    setOpenAlertModal(false);
  };

  return (
    <AnswerPageStyle>
      <div className="QuestionBox">
        <div className="QuestionNumbering">
          <p>01 |</p>
          <FaStar />
        </div>
        <h2>JSX에 대해 설명해주세요.</h2>
        <span>Javascript</span>
      </div>
      <form action="/">
        <textarea placeholder="답변을 작성해주세요."></textarea>
      </form>
      <button className="btn2" type="submit" onClick={handleOpenConfirmModal}>
        제출
      </button>
      {openConfirmModal && (
        <ConfirmModal
          onClose={handleCloseConfirmModal}
          onConfirm={() => {
            handleCloseConfirmModal();
            handleOpenAlertModal();
          }}
        />
      )}
      {openAlertModal && <AlertModal onClose={handlCloseAlertModal} />}
    </AnswerPageStyle>
  );
}

const AnswerPageStyle = styled.div`
  width: 100%;
  max-width: 380px;
  box-sizing: border-box;
  padding: 25px 30px;

  .QuestionBox {
    padding: 10px 15px;
    box-sizing: border-box;
    width: 330px;
    height: 155px;
    border: 1px solid #eff2f8;
    border-radius: 10px;
    background: #fbfbfb;
    span {
      margin-top: 40px;
      background-color: #bbd3ff;
      color: #fff;
      font-size: 12px;
      font-weight: 300;
      border-radius: 15px;
      display: inline-block;
      padding: 3px 10px;
    }
  }

  .QuestionNumbering {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    p {
      color: #888888;
    }
    svg {
      font-size: 24px;
      fill: #dfdfdf;
      /* fill: #FFD600; */
      cursor: pointer;
    }
  }

  form {
    border: 1px solid #eff2f8;
    border-radius: 10px;
    width: 330px;
    height: 315px;
    margin: 10px 0;
  }

  textarea {
    -ms-overflow-style: none;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 10px;
    border: none;
    background: none;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  textarea::-webkit-scrollbar {
    display: none;
  }

  .btn2 {
    width: 330px;
    height: 60px;
    font-size: 20px;
  }
`;

export default AnswerPage;
