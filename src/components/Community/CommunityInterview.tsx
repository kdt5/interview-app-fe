import styled from "styled-components";
import WeeklyQuestionCard from "../common/Card/WeeklyQuestionCard";
import CommonCategory from "../common/List/CommonCategory";
import CommonQuestionList from "../common/List/CommonQuestionList";
import SectionTitle from "../common/SectionTitle";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/UseCategory";
import { useFetchWeeklyQuestion } from "../../hooks/UseFetchWeeklyQuestion";
import { useMyUserData } from "../../hooks/UseMyUserData";
import { formatToWeeklyLabel } from "../../utils/Date";
import { useState } from "react";
import { Question } from "../../models/Question.model";
import { addFavorite, removeFavorite } from "../../api/Favorite.api";
import { useQuestions } from "../../hooks/UseQuestions";

function InterviewTab() {
  const navigate = useNavigate();

  const { weeklyQuestion } = useFetchWeeklyQuestion();
  const { data: userData } = useMyUserData();

  const { getCategoryName } = useCategory();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const {questions, setQuestions} = useQuestions(undefined, selectedCategoryId === 0 ? undefined : selectedCategoryId);

  const handleToggleFavorite = async (questionId: number) => {
    setQuestions((prevList: Question[]) => {
      const updatedList = prevList.map((q) =>
        q.id === questionId
          ? {
              ...q,
              isFavorite: !q.isFavorite,
              favoriteCount: q.isFavorite
                ? q.favoriteCount - 1
                : q.favoriteCount + 1,
            }
          : q
      );
      return updatedList;
    });

    try {
      const toggledQuestion = questions.find((q) => q.id === questionId);
      if (!toggledQuestion) return;

      if (toggledQuestion.isFavorite) {
        await removeFavorite(questionId);
      } else {
        await addFavorite(questionId);
      }
    } catch (error) {
      console.error("좋아요 토글 실패", error);
    }
  };

  if (!weeklyQuestion || !userData || !questions) return null;

  return (
    <>
      <WeeklyQuestionSection>
        <SectionTitle>위클리 답변 토론</SectionTitle>
        <Link to="/weeklypost">
          {weeklyQuestion && (
            <WeeklyQuestionCard
              category={
                getCategoryName(
                  weeklyQuestion.question.categories?.[0]?.category.id ?? 0
                ) || "기타"
              }
              title={weeklyQuestion.question.title}
              date={formatToWeeklyLabel(weeklyQuestion.startDate)}
              answercount={weeklyQuestion.question.answerCount ?? 0}
              isComplete={weeklyQuestion.question.isAnswered}
            />
          )}
        </Link>
      </WeeklyQuestionSection>

      <CommonQuestionSection>
        <CommonCategory
          className="interview"
          selectedCatId={selectedCategoryId}
          setSelectedCatId={setSelectedCategoryId}
        ></CommonCategory>
        {questions.map((item) => (
          <div key={item.id} onClick={() => navigate("/questiondetail")}>
            <CommonQuestionList
              category={getCategoryName(item.categories[0]?.category.id ?? 0)}
              questiontitle={item.title}
              complete={item.isAnswered ? "작성 완료" : "답변 미작성"}
              comments={item.answerCount ?? 0}
              likes={item.favoriteCount}
              isFavorite={item.isFavorite ?? false}
              toggleFavorite={() => handleToggleFavorite(item.id)}
            />
          </div>
        ))}
      </CommonQuestionSection>
    </>
  );
}

const WeeklyQuestionSection = styled.div`
  margin-bottom: 50px;
`;

const CommonQuestionSection = styled.div`
  margin-bottom: 50px;
`;
export default InterviewTab;
