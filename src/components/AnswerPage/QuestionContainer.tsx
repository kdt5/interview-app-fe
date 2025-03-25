import styled from "styled-components";
import { FaStar } from "react-icons/fa6";

interface Props {
  questionId: string;
  title: string;
  category: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

function QuestionContainer({
  questionId,
  title,
  category,
  isFavorite,
  toggleFavorite,
}: Props) {
  return (
    <QuestionContainerStyle>
      <div className="question-numbering">
        <p className="numbering-title">
          {String(questionId).padStart(2, "0")} |
        </p>
        <FavoriteIcon onClick={toggleFavorite} $isFavorite={isFavorite} />
      </div>
      <h2 className="question-title">{title}</h2>
      <span className="category-name">{category}</span>
    </QuestionContainerStyle>
  );
}

export const FavoriteIcon = styled(FaStar)<{ $isFavorite: boolean }>`
  fill: ${({ $isFavorite: isFavorite }) =>
    isFavorite ? "#FFD600" : "#DFDFDF"};
  cursor: pointer;
  font-size: 24px;
`;

const QuestionContainerStyle = styled.div`
  padding: 15px;
  box-sizing: border-box;
  width: 330px;
  height: fit-content;
  border: 1px solid #eff2f8;
  border-radius: 10px;
  background: #fbfbfb;

  .question-numbering {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .numbering-title {
      color: #888888;
    }

    .question-title {
      font-weight: 600;
    }

    svg {
      font-size: 24px;
      cursor: pointer;
    }
  }

  .category-name {
    margin-top: 40px;
    background-color: #bbd3ff;
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    border-radius: 15px;
    display: inline-block;
    padding: 3px 10px;
  }
`;

export default QuestionContainer;
