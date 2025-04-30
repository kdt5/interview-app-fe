import styled from "styled-components";
import CommonCategory from "../common/List/CommonCategory";
import CommonQuestionList from "../common/List/CommonQuestionList";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/UseCategory";
import { useFetchWeeklyQuestion } from "../../hooks/UseFetchWeeklyQuestion";
import { useMyUserData } from "../../hooks/UseMyUserData";
import { useEffect, useState } from "react";
import { Question } from "../../models/Question.model";
import {
  fetchQuestions,
  fetchWeeklyQuestions,
  WeeklyQuestionResponse,
} from "../../api/Question.api";
import { addFavorite, removeFavorite } from "../../api/Favorite.api";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { getPositionKeyById } from "../../utils/Positions";

interface Props {
  isWeekly?: boolean;
}

function QuestionBox({ isWeekly = true }: Props) {
  const navigate = useNavigate();

  const { weeklyQuestion } = useFetchWeeklyQuestion();
  const { data: userData } = useMyUserData();

  const { getCategoryName } = useCategory();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [questionList, setQuestionList] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (isWeekly) {
          const data: WeeklyQuestionResponse[] = await fetchWeeklyQuestions();
          const questions = data.map((item) => item.question);
          setQuestionList(questions);
        } else {
          const positionString =
            userData?.positionId !== undefined
              ? getPositionKeyById(userData.positionId)
              : undefined;

          if (!positionString) return;

          const data = await fetchQuestions(
            positionString,
            selectedCategoryId ?? undefined
          );
          setQuestionList(data);
        }
      } catch (error) {
        console.error("질문 불러오기 실패", error);
      }
    };

    loadQuestions();
  }, [isWeekly, userData?.positionId, selectedCategoryId]);

  const handleToggleFavorite = async (questionId: number) => {
    setQuestionList((prevList) =>
      prevList.map((q) =>
        q.id === questionId
          ? {
              ...q,
              isFavorite: !q.isFavorite,
              favoriteCount: q.isFavorite
                ? q.favoriteCount - 1
                : q.favoriteCount + 1,
            }
          : q
      )
    );

    try {
      const toggledQuestion = questionList.find((q) => q.id === questionId);
      if (!toggledQuestion) return;

      if (toggledQuestion.isFavorite) {
        await removeFavorite(questionId, "question");
      } else {
        await addFavorite(questionId, "question");
      }
    } catch (error) {
      console.error("좋아요 토글 실패", error);
    }
  };

  if (!weeklyQuestion || !userData) return null;

  return (
    <CommonQuestionSection>
      {isWeekly ? (
        <WeeklyAnswerPageLinkStyle to="/">
          <h1>
            <span>이번 주 위클리 질문</span>에 답변하지 않았어요
          </h1>
          <SlArrowRight />
        </WeeklyAnswerPageLinkStyle>
      ) : (
        <CommonCategory
          selectedCatId={selectedCategoryId ?? 0}
          setSelectedCatId={setSelectedCategoryId}
        ></CommonCategory>
      )}
      {questionList.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(`/questions/${item.id}/answer`)}
        >
          <CommonQuestionList
            category={
              getCategoryName(item.categories[0]?.category?.id ?? 0) || "기타"
            }
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
