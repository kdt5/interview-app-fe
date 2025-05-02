import styled from "styled-components";
import WeeklyQuestionCard from "../common/Card/WeeklyQuestionCard";
import CommonCategory from "../common/List/CommonCategory";
import QuestionListItem from "../common/List/QuestionListItem";
import SectionTitle from "../common/SectionTitle";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/UseCategory";
import { useFetchWeeklyQuestion } from "../../hooks/UseFetchWeeklyQuestion";
import { useMyUserData } from "../../hooks/UseMyUserData";
import { formatToWeeklyLabel } from "../../utils/Date";
import { useState } from "react";
import { FRONTEND_URLS } from "../../constants/Urls";
import { useFetchQuestions } from "../../hooks/UseFetchQuestions";
import { getAnsweredQuestionUrl } from "../../utils/Question";
import { replaceUrlParams } from "../../utils/Url";

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

  const categoryName = getCategoryName(
    weeklyQuestion?.question?.categories[0]?.category?.id ?? 0
  );

  return (
    <>
      <WeeklyQuestionSection>
        <SectionTitle>위클리 답변 토론</SectionTitle>
        {weeklyQuestion ? (
          <WeeklyQuestionCard
            category={categoryName}
            title={weeklyQuestion.question.title}
            date={formatToWeeklyLabel(weeklyQuestion.startDate)}
            answerCount={weeklyQuestion.question.answerCount}
            isComplete={weeklyQuestion.question.isAnswered}
            linkTo={getAnsweredQuestionUrl(
              weeklyQuestion.question.id,
              weeklyQuestion.question.answerId
            )}
          ></WeeklyQuestionCard>
        ) : (
          <>
            <WeeklyQuestionCard
              category=""
              title="이번주 위클리 질문을 불러올 수 없습니다"
              date=""
              answerCount={0}
              isComplete={true}
              linkTo="/"
            ></WeeklyQuestionCard>
          </>
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
              navigate(replaceUrlParams(FRONTEND_URLS.COMMUNITY.ANSWERS, {questionId: String(item.id)}))
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
