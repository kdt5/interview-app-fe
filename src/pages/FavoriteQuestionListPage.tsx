import Tabs from "../components/common/Tabs";
import { useState } from "react";
import QuestionBox from "../components/QuestionList/QuestionBox";
import { QuestionListPageStyle } from "./QuestionListPage";
import { useFetchWeeklyQuestions } from "../hooks/UseFetchWeeklyQuestions";
import { useFetchQuestions } from "../hooks/UseFetchQuestions";
import { useParams } from "react-router-dom";
import { Position } from "../constants/Question";

export default FavoriteQuestionListPage;

function FavoriteQuestionListPage() {
  const { position } = useParams<{ position: Position }>();
  const [currentTab, setCurrentTab] = useState("위클리");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const tabs = [{ title: "위클리" }, { title: "필수 질문" }];
  const { weeklyQuestions, isLoading: isLoadingWeeklyQuestions } =
    useFetchWeeklyQuestions();
  const { questions: basicQuestions, isLoading: isLoadingBasicQuestions } =
    useFetchQuestions(
      position,
      selectedCategoryId === 0 ? undefined : selectedCategoryId
    );

  const handleClickTab = (title: string) => {
    setCurrentTab(title);
  };

  const favoriteWeeklyQuestions = (weeklyQuestions ?? []).filter(
    (q) => q.isFavorite
  );
  const favoriteBasicQuestions = (basicQuestions ?? []).filter(
    (q) => q.isFavorite
  );

  const isWeekly = currentTab === "위클리";

  return (
    <>
      <Tabs
        tabs={tabs}
        onClickTab={handleClickTab}
        currentTab={currentTab}
      ></Tabs>
      <QuestionListPageStyle $isWeekly={isWeekly}>
        {isWeekly
          ? !isLoadingWeeklyQuestions && (
              <QuestionBox
                questions={favoriteWeeklyQuestions}
                isWeekly={true}
              />
            )
          : !isLoadingBasicQuestions && (
              <QuestionBox
                questions={favoriteBasicQuestions}
                isWeekly={false}
                position={position}
                selectedCatId={selectedCategoryId}
                setSelectedCatId={setSelectedCategoryId}
              />
            )}
      </QuestionListPageStyle>
    </>
  );
}
