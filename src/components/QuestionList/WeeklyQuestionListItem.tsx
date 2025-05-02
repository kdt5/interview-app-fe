import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import { useFavorite } from "../../hooks/UseFavorite";
import { useState } from "react";

interface Props {
  questionId: number;
  category: string;
  questionTitle: string;
  complete: string;
  comments: number;
  likes: number;
  isFavorite: boolean;
}

function WeeklyQuestionListItem({
  questionId,
  category,
  questionTitle,
  comments,
  complete,
  likes,
  isFavorite: initIsFavorite,
}: Props) {
  const { addFavorite, removeFavorite } = useFavorite(questionId, "question");
  const [isFavorite, setIsFavorite] = useState(initIsFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
    setIsFavorite(!isFavorite);
  };

  const isComplete = complete === "작성 완료";

  return (
    <>
      <WeeklyQuestionListItemStyle>
        <QuestionHeader>
          <div>
            <QuestionCategory>{category}</QuestionCategory>
            <QuestionTitle>{questionTitle}</QuestionTitle>
          </div>
          <FavoriteIcon
            onClick={handleFavoriteClick}
            $isFavorite={isFavorite}
          ></FavoriteIcon>
        </QuestionHeader>
        <QuestionInfo>
          <QuestionComplete $isComplete={isComplete}>
            {complete}
          </QuestionComplete>
          <QuestionLike>
            <span>답변 수 {comments}</span> | <span>좋아요 {likes}</span>
          </QuestionLike>
        </QuestionInfo>
      </WeeklyQuestionListItemStyle>
    </>
  );
}

const WeeklyQuestionListItemStyle = styled.div`
  border-bottom: 3px solid #f5f5f5;
  padding: 25px 30px;
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const FavoriteIcon = styled(FaStar)<{ $isFavorite: boolean }>`
  fill: ${({ $isFavorite: isFavorite }) =>
    isFavorite ? "#FFD600" : "#DFDFDF"};
  cursor: pointer;
  font-size: 24px;
`;

const QuestionInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

const QuestionCategory = styled.p`
  font-size: 12px;
  color: #888;
  font-weight: 400;
`;

const QuestionTitle = styled.h3`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  width: 270px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const QuestionComplete = styled.div<{ $isComplete?: boolean }>`
  color: ${({ $isComplete }) => ($isComplete ? "#fff" : "#ccc")};
  background-color: ${({ $isComplete }) =>
    $isComplete ? "#6ea1ff" : "#f5f5f5"};
  padding: 5px 15px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 400;
`;

const QuestionLike = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;

  span {
    color: #888;
    font-size: 12px;
    font-weight: 400;
  }

  span:first-child {
    margin-right: 5px;
  }

  span:last-child {
    margin-left: 5px;
  }
`;

export default WeeklyQuestionListItem;
