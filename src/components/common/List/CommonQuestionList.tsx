import styled from "styled-components";
import { FavoriteIcon } from "../../AnswerPage/QuestionContainer";

interface Props {
  category: string;
  questiontitle: string;
  complete: string;
  comments: number;
  likes: number;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

function CommonQuestionList({
  category,
  questiontitle,
  comments,
  complete,
  likes,
  isFavorite,
  toggleFavorite,
}: Props) {
  return (
    <>
      <CommonQuestionListStyle>
        <Questionheader>
          <div>
            <QuestionCategory>{category}</QuestionCategory>
            <QuestionTitle>{questiontitle}</QuestionTitle>
          </div>
          <FavoriteIcon
            onClick={toggleFavorite}
            $isFavorite={isFavorite}
          ></FavoriteIcon>
        </Questionheader>
        <QuestionInfo>
          <QuestionComplete>{complete}</QuestionComplete>
          <QuestionLike>
            <span>답변 수 {comments}</span> | <span>좋아요 {likes}</span>
          </QuestionLike>
        </QuestionInfo>
      </CommonQuestionListStyle>
    </>
  );
}

const CommonQuestionListStyle = styled.div`
  border-bottom: 3px solid #f5f5f5;
  padding: 25px 30px;
`;

const Questionheader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
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
  font-weight: 400px;
`;

const QuestionTitle = styled.h3`
  font-size: 14px;
  color: #333;
  font-weight: 600px;
`;

const QuestionComplete = styled.div`
  color: #fff;
  background-color: #6ea1ff;
  padding: 5px 15px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 400px;
`;

const QuestionLike = styled.div`
  color: #888;
  span {
    color: #888;
    font-size: 12px;
    font-weight: 400px;
  }
`;

export default CommonQuestionList;
