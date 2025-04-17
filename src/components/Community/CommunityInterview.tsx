import styled from "styled-components";
import WeeklyQuestionCard from "../common/Card/WeeklyQuestionCard";
import CommonCategory from "../common/List/CommonCategory";
import CommonQuestionList from "../common/List/CommonQuestionList";
import SectionTitle from "../common/SectionTitle";
import { Link } from "react-router-dom";

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

  {
    category: "React22",
    questiontitle: "useEffect 훅은 언제 사용하는가?",
    complete: "작성 완료",
    comments: 23,
    likes: 53,
  },

  {
    category: "React33",
    questiontitle: "useEffect 훅은 언제 사용하는가?",
    complete: "작성 완료",
    comments: 23,
    likes: 53,
  },
];

function InterviewTab() {
  return (
    <>
      <WeeklyQuestionSection>
        <SectionTitle>위클리 답변 토론</SectionTitle>
        <Link to="/weeklypost">
          {WeeklyQuestionData.map((item, index) => (
            <WeeklyQuestionCard key={index} {...item} />
          ))}
        </Link>
      </WeeklyQuestionSection>

      <CommonQuestionSection>
        <CommonCategory></CommonCategory>
        {questionData.map((item, index) => (
          <Link key={index} to="/questiondetail">
            <CommonQuestionList {...item} />
          </Link>
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
