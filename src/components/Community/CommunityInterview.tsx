import WeeklyQuestionCard from "../common/Card/WeeklyQuestionCard";
import CommonQuestionList from "../common/List/CommonQuestionList";
import SectionTitle from "../common/SectionTitle";

const WeeklyQuestionData = [
  {
    category: "Javascript",
    title:
      "Javascript에서 var, let, const의 역할과 각각의 차이점은 무엇일까요?",
    date: "3d 2h 30m",
  },
];

const questionData = [
  {
    category: "React",
    questiontitle: "useEffect 훅은 언제 사용하는가?",
    complete: "작성 완료",
    comments: 23,
    likes: 53,
  },
];

function InterviewTab() {
  return (
    <>
      <SectionTitle>위클리 답변 토론</SectionTitle>
      {WeeklyQuestionData.map((item, index) => (
        <WeeklyQuestionCard key={index} {...item} />
      ))}

      {questionData.map((item, index) => (
        <CommonQuestionList key={index} {...item} />
      ))}
    </>
  );
}

export default InterviewTab;
