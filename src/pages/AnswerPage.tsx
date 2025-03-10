import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import ConfirmModal from "../components/common/ConfirmModal";
import { useState } from "react";
import AlertModal from "../components/common/AlertModal";

function AnswerPage() {
  const [modalState, setModalState] = useState({
    confirm: false,
    alert: false,
  });

  const [answer, setAnswer] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleModal = (type: "confirm" | "alert", state: boolean) => {
    setModalState((prev) => ({ ...prev, [type]: state }));
  };

  const handleSubmit = () => {
    toggleModal("confirm", true);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleFavoriteCheck = () => {
    setIsFavorite(!isFavorite);
  };

  const isSubmitDisabled = answer.trim() === "" || answer.length <= 20;

  return (
    <AnswerPageStyle>
      <div className="QuestionBox">
        <div className="QuestionNumbering">
          <p className="NumberingTitle">01 |</p>
          <FavoriteIcon onClick={handleFavoriteCheck} isFavorite={isFavorite} />
        </div>
        <h2>JSX에 대해 설명해주세요.</h2>
        <span className="CategoryName">Javascript</span>
      </div>
      <form action="/" className="AnswerBox">
        <textarea
          placeholder="답변을 작성해주세요."
          className="AnswerText"
          value={answer}
          onChange={handleAnswerChange}
        ></textarea>
      </form>
      <button
        className="SubmitButton"
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        style={{
          opacity: isSubmitDisabled ? 0.5 : 1,
          cursor: isSubmitDisabled ? "not-allowed" : "pointer",
        }}
      >
        제출
      </button>
      {modalState.confirm && (
        <ConfirmModal
          onClose={() => toggleModal("confirm", false)}
          onConfirm={() => {
            toggleModal("confirm", false);
            toggleModal("alert", true);
          }}
        />
      )}
      {modalState.alert && (
        <AlertModal onClose={() => toggleModal("alert", false)} />
      )}
    </AnswerPageStyle>
  );
}

const FavoriteIcon = styled(FaStar)<{ isFavorite: boolean }>`
  fill: ${({ isFavorite }) => (isFavorite ? "#FFD600" : "#DFDFDF")};
  cursor: pointer;
  font-size: 24px;
`;

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

    .CategoryName {
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

    .NumberingTitle {
      color: #888888;
    }

    svg {
      font-size: 24px;
      cursor: pointer;
    }
  }

  .AnswerBox {
    border: 1px solid #eff2f8;
    border-radius: 10px;
    width: 330px;
    height: 315px;
    margin: 10px 0;

    .AnswerText {
      -ms-overflow-style: none;
      width: 100%;
      height: 100%;
      padding: 15px;
      border-radius: 10px;
      border: none;
      background: none;
      resize: none;
    }

    .AnswerText:focus {
      outline: none;
    }

    .AnswerText::-webkit-scrollbar {
      display: none;
    }
  }

  .SubmitButton {
    width: 330px;
    height: 60px;
    font-size: 20px;
  }
`;

export default AnswerPage;
