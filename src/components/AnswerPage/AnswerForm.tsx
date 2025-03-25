import styled from "styled-components";

interface Props {
  answer: string;
  handleAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isOverLimit: boolean;
}

function AnswerForm({ answer, handleAnswerChange, isOverLimit }: Props) {
  return (
    <AnswerFormStyle>
      <textarea
        placeholder="답변을 작성해주세요."
        className="answer-text"
        value={answer}
        onChange={handleAnswerChange}
      ></textarea>
      <p className={`character-count ${isOverLimit ? "over-limit" : ""}`}>
        {answer.length}/500
      </p>
    </AnswerFormStyle>
  );
}

const AnswerFormStyle = styled.form`
  border: 1px solid #eff2f8;
  border-radius: 10px;
  width: 330px;
  height: 315px;
  margin: 10px 0;

  .answer-text {
    -ms-overflow-style: none;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 10px;
    border: none;
    background: none;
    resize: none;
  }

  .answer-text:focus {
    outline: none;
  }

  .answer-text::-webkit-scrollbar {
    display: none;
  }

  .character-count {
    font-size: 14px;
    color: #888;
    text-align: right;
  }

  .character-count.over-limit {
    color: red;
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-3px);
    }
    50% {
      transform: translateX(3px);
    }
    75% {
      transform: translateX(-3px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default AnswerForm;
