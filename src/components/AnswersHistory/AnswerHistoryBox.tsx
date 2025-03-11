import { Link } from "react-router-dom";
import styled from "styled-components";

export default AnswerHistoryBox;

interface Props {
  question: string;
  questionId: number;
  categoryImagePath: string;
  categoryName: string;
}

function AnswerHistoryBox({
  question,
  questionId,
  categoryImagePath,
  categoryName,
}: Props) {
  return (
    <HistoryBoxStyle>
      <Link className="answer-history" to={`/question/${questionId}`}>
        <div className="question-container">
          <img src={categoryImagePath} alt={categoryName} />
          <p>{question}</p>
        </div>
      </Link>
    </HistoryBoxStyle>
  );
}

const HistoryBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;

  background-color: #fbfbfb;
  border: solid 1px #eff2f8;
  border-radius: 10px;

  .answer-history {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 1.225rem 1.5rem;

    color: inherit;
  }

  .question-container {
    display: flex;

    gap: 1rem;

    text-decoration: none;

    img {
      width: 20px;
      height: 20px;
    }

    p {
      font-weight: 400;
    }
  }
`;
