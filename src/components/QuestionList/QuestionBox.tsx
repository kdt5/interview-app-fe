import styled from "styled-components";
import CommonCategory from "../common/List/CommonCategory";
import QuestionListItem from "../common/List/QuestionListItem";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/UseCategory";
import { Question } from "../../models/Question.model";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
import WeeklyQuestionListItem from "./WeeklyQuestionListItem";

interface Props {
  questions: Question[];
  isWeekly?: boolean;
}

function QuestionBox({ questions, isWeekly = true }: Props) {
  const navigate = useNavigate();
  const { getCategoryName } = useCategory();
  const [selectedCatId, setSelectedCatId] = useState(0);

  if (isWeekly) {
    return (
      <CommonQuestionSection>
        <WeeklyAnswerPageLinkStyle to="/">
          <h1>
            <span>이번 주 위클리 질문</span>에 답변하지 않았어요
          </h1>
          <SlArrowRight />
        </WeeklyAnswerPageLinkStyle>
        {questions.length === 0 ? null : (
          <div onClick={() => navigate(`/questions/${questions[0].id}/answer`)}>
            <WeeklyQuestionListItem
              questionId={questions[0].id}
              category={
                getCategoryName(
                  questions[0].categories[0]?.category?.id ?? 0
                ) || "기타"
              }
              questionTitle={questions[0].title}
              complete={questions[0].isAnswered ? "작성 완료" : "답변 미작성"}
              comments={questions[0].answerCount ?? 0}
              likes={questions[0].favoriteCount}
              isFavorite={questions[0].isFavorite ?? false}
            />
          </div>
        )}
      </CommonQuestionSection>
    );
  }

  return (
    <CommonQuestionSection>
      <CommonCategory
        selectedCatId={selectedCatId}
        setSelectedCatId={setSelectedCatId}
      />
      {questions.length === 0
        ? null
        : questions.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/questions/${item.id}/answer`)}
            >
              <QuestionListItem
                questionId={item.id}
                category={
                  getCategoryName(item.categories[0]?.category?.id ?? 0) ||
                  "기타"
                }
                questionTitle={item.title}
                complete={item.isAnswered ? "작성 완료" : "답변 미작성"}
                comments={item.answerCount ?? 0}
                likes={item.favoriteCount}
                isFavorite={item.isFavorite ?? false}
              />
            </div>
          ))}
    </CommonQuestionSection>
  );
}

const WeeklyAnswerPageLinkStyle = styled(Link)`
  position: relative;
  margin: 0 30px;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background: #fbfbfb;
  border-radius: 10px;
  padding: 0 18px;

  h1 {
    font-size: 16px;
    font-weight: 600;
  }

  span {
    font-size: 16px;
    font-weight: 600;
    color: #6ea1ff;
  }

  svg {
    stroke-width: 60px;
    color: #000;
    font-size: 14px;
  }
`;

const CommonQuestionSection = styled.div`
  margin-bottom: 50px;
`;
export default QuestionBox;
