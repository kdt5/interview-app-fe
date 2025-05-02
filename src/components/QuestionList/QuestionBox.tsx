import styled from "styled-components";
import CommonCategory from "../common/List/CommonCategory";
import QuestionListItem from "../common/List/QuestionListItem";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/UseCategory";
import { Question } from "../../models/Question.model";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import WeeklyQuestionListItem from "./WeeklyQuestionListItem";
import { Position } from "../../constants/Question";
import { getAnsweredQuestionUrl } from "../../utils/Question";
import { FRONTEND_URLS } from "../../constants/Urls";
import { replaceUrlParams } from "../../utils/Url";

interface Props {
  questions: Question[];
  isWeekly?: boolean;
  position?: Position;
  selectedCatId?: number;
  setSelectedCatId?: (id: number) => void;
}

function QuestionBox({
  questions,
  isWeekly = true,
  selectedCatId,
  setSelectedCatId,
}: Props) {
  const navigate = useNavigate();
  const { getCategoryName } = useCategory();

  if (isWeekly) {
    const mainWeeklyQuestion = questions[0];

    return (
      <CommonQuestionSection>
        {mainWeeklyQuestion && !mainWeeklyQuestion.isAnswered ? (
          <WeeklyAnswerPageLinkStyle
            to={replaceUrlParams(FRONTEND_URLS.ANSWER, {
              questionId: String(mainWeeklyQuestion.id),
            })}
          >
            <h1>
              <span>이번 주 위클리 질문</span>에 답변하지 않았어요
            </h1>
            <SlArrowRight />
          </WeeklyAnswerPageLinkStyle>
        ) : (
          <WeeklyAnswerSpacer $isAnswered={!!mainWeeklyQuestion?.isAnswered} />
        )}
        {questions.length === 0
          ? null
          : questions.map((item) => {
              const url = getAnsweredQuestionUrl(item.id, item.answerId);

              return (
                <WeeklyQuestionWrapper key={item.id}>
                  <div key={item.id} onClick={() => navigate(url)}>
                    <WeeklyQuestionListItem
                      questionId={item.id}
                      category={
                        getCategoryName(
                          item.categories[0]?.category?.id ?? 0
                        ) || "기타"
                      }
                      questionTitle={item.title}
                      complete={item.isAnswered ? "작성 완료" : "답변 미작성"}
                      comments={item.answerCount ?? 0}
                      likes={item.favoriteCount}
                      isFavorite={item.isFavorite ?? false}
                    />
                  </div>
                </WeeklyQuestionWrapper>
              );
            })}
      </CommonQuestionSection>
    );
  }

  if (selectedCatId === undefined || setSelectedCatId === undefined) {
    throw new Error("selectedCatId and setSelectedCatId are required props");
  }

  return (
    <CommonQuestionSection>
      <CommonCategory
        className="interview"
        selectedCatId={selectedCatId}
        setSelectedCatId={setSelectedCatId}
      />
      {questions.length === 0
        ? null
        : questions.map((item) => {
            const url = getAnsweredQuestionUrl(item.id, item.answerId);

            return (
              <div key={item.id} onClick={() => navigate(url)}>
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
            );
          })}
    </CommonQuestionSection>
  );
}

const WeeklyAnswerPageLinkStyle = styled(Link)`
  position: relative;
  margin: 0 30px;
  margin-top: 80px;
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

const WeeklyAnswerSpacer = styled.div<{ $isAnswered: boolean }>`
  height: ${({ $isAnswered }) => ($isAnswered ? "30px" : "0px")};
`;

const WeeklyQuestionWrapper = styled.div`
  cursor: pointer;
`;

const CommonQuestionSection = styled.div`
  margin-bottom: 50px;

  .interview {
    margin-top: 20px;
  }
`;

export default QuestionBox;
