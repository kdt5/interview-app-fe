import { useEffect, useState } from "react";
import EssentialQuestionList from "./EssentialQuestionList";
import { fetchQuestions } from "../../api/Question.api";
import { Question } from "../../models/Question.model";
import { getPositionKeyById } from "../../utils/Positions";
import { useMyUserData } from "../../hooks/UseMyUserData";
import { useCategory } from "../../hooks/UseCategory";

function EssentialQuestionListGroup() {
  const [questionsList, setQuestionList] = useState<Question[]>([]);
  const { data: userData } = useMyUserData();
  const { getCategoryName } = useCategory();
  const [selectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
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
      } catch (error) {
        console.error("질문 불러오기 실패", error);
      }
    };

    loadQuestion();
  }, [userData?.positionId, selectedCategoryId]);

  if (!userData) return null;

  return (
    <div>
      {questionsList.slice(0, 3).map((item) => (
        <EssentialQuestionList
          key={item.id}
          category={
            getCategoryName(item.categories[0]?.category?.id ?? 0) || "기타"
          }
          questiontitle={item.title}
        />
      ))}
    </div>
  );
}

export default EssentialQuestionListGroup;
