import styled from "styled-components";
import GrayButton from "../common/Button/GrayButton";

interface Props {
  answer: string;
  handleAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isOverLimit: boolean;
  onSubmitSuccess: () => void;
  buttonText: string;
  isSubmitDisabled: boolean;
}

function EditAnswerForm({
  answer,
  handleAnswerChange,
  isOverLimit,
  onSubmitSuccess,
  buttonText,
  isSubmitDisabled,
}: Props) {

  return (
    <AnswerFormStyle $isSubmitDisabled={isSubmitDisabled}>
      <textarea
        placeholder="질문에 답변해주세요."
        className="answer-text"
        value={answer}
        onChange={handleAnswerChange}
      ></textarea>
      <div className="bottom-container">
        <p className={`character-count ${isOverLimit ? "over-limit" : ""}`}>
          {answer.length} / 500
        </p>
        <GrayButton
          className="submit-button"
          type="button"
          onClick={onSubmitSuccess}
          disabled={isSubmitDisabled}
        >
          {buttonText}
        </GrayButton>
      </div>
    </AnswerFormStyle>
  );
}

const AnswerFormStyle = styled.form<{ $isSubmitDisabled: boolean }>`
  .answer-text {
    -ms-overflow-style: none;
    width: 100%;
    height: 320px;
    padding: 20px 30px;
    border-radius: 0;
    border: none;
    background: none;
    resize: none;
    font-size: 14px;
    font-weight: 400;
    color: #888888;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5f5;
  }

  .answer-text:focus {
    outline: none;
  }

  .answer-text::-webkit-scrollbar {
    display: none;
  }

  .character-count {
    font-size: 16px;
    color: #333333;
    text-align: left;
  }

  .character-count.over-limit {
    color: red;
  }

  .bottom-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px auto;
    padding: 0 30px;
  }

  .submit-button {
    width: 105px;
    height: 60px;
    font-size: 16px;
    color: ${(props) => (props.$isSubmitDisabled ? "#aaaaaa" : "#ffffff")};
    border-radius: 5px;
    opacity: ${(props) => (props.$isSubmitDisabled ? 0.5 : 1)};
    cursor: ${(props) => (props.$isSubmitDisabled ? "not-allowed" : "pointer")};
    background: ${(props) => (props.$isSubmitDisabled ? "#fbfbfb" : "#6ea1ff")};
  }
`;

export default EditAnswerForm;
