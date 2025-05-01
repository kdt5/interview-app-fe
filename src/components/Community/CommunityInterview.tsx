import styled from "styled-components";
import WeeklyQuestionCard from "../common/Card/WeeklyQuestionCard";
import CommonCategory from "../common/List/CommonCategory";
import QuestionListItem from "../common/List/QuestionListItem";
import SectionTitle from "../common/SectionTitle";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/UseCategory";
import { useFetchWeeklyQuestion } from "../../hooks/UseFetchWeeklyQuestion";
import { useMyUserData } from "../../hooks/UseMyUserData";
import { formatToWeeklyLabel } from "../../utils/Date";
import { useState } from "react";
import { FRONTEND_URLS } from "../../constants/Urls";
import { useFetchQuestions } from "../../hooks/UseFetchQuestions";

function InterviewTab() {
  const navigate = useNavigate();

  const { weeklyQuestion } = useFetchWeeklyQuestion();
  const { data: userData } = useMyUserData();

  const { getCategoryName } = useCategory();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const { questions } = useFetchQuestions(
    undefined,
    selectedCategoryId === 0 ? undefined : selectedCategoryId
  );

  if (!weeklyQuestion || !userData) return null;

  return (
    <>
      <WeeklyQuestionSection>
        <SectionTitle>위클리 답변 토론</SectionTitle>
        {weeklyQuestion && (
          <Link
            to={FRONTEND_URLS.ANSWER.replace(
              ":questionId",
              weeklyQuestion.questionId.toString()
            )}
          >
            <WeeklyQuestionCard
              category={
                getCategoryName(
                  weeklyQuestion.question.categories?.[0]?.category.id ?? 0
                ) || "기타"
              }
              title={weeklyQuestion.question.title}
              date={formatToWeeklyLabel(weeklyQuestion.startDate)}
              answerCount={weeklyQuestion.question.answerCount ?? 0}
              isComplete={weeklyQuestion.question.isAnswered}
            />
          </Link>
        )}
      </WeeklyQuestionSection>

      <CommonQuestionSection>
        <CommonCategory
          className="interview"
          selectedCatId={selectedCategoryId}
          setSelectedCatId={setSelectedCategoryId}
        ></CommonCategory>
        {questions.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              navigate(
                "/" +
                  FRONTEND_URLS.COMMUNITY.ANSWERS.replace(
                    ":questionId",
                    item.id.toString()
                  )
              )
            }
          >
            <QuestionListItem
              questionId={item.id}
              category={getCategoryName(item.categories[0]?.category.id ?? 0)}
              questionTitle={item.title}
              complete={item.isAnswered ? "작성 완료" : "답변 미작성"}
              comments={item.answerCount ?? 0}
              likes={item.favoriteCount}
              isFavorite={item.isFavorite ?? false}
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
