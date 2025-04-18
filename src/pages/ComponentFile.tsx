import styled from "styled-components";
import CommunityList from "../components/common/List/CommunityList";
import CommonQuestionList from "../components/common/List/CommonQuestionList";
import CommonProfile from "../components/common/Profile/CommonProfile";
import RankingProfile from "../components/common/Profile/RankingProfile";
import CommunitySmallBtn from "../components/common/Button/CommunitySmallButton";
import WeeklyQuestionCard from "../components/common/Card/WeeklyQuestionCard";
import QuestionCard from "../components/common/Card/QuestionCard";
import InputField from "../components/common/Input/Input";
import BaseButton from "../components/common/Button/BaseButton";
import LightGrayButton from "../components/common/Button/LightGrayButton";
import GrayButton from "../components/common/Button/GrayButton";
const mockData = [
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가말하고있잖아",
    comments: 25,
    level: 5,
    title: "오늘 면접 보고 왔는데요",
    content:
      "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각...",
    views: 315,
    likes: 42,
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

const ProfileData = [
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가말하고있잖아",
    comments: 25,
    level: 5,
  },
];

const RankData = [
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가말하고있잖아",
    comments: 345,
    level: 25,
    like: 225,
  },
];

const WeeklyQuestionData = [
  {
    category: "Javascript",
    title:
      "Javascript에서 var, let, const의 역할과 각각의 차이점은 무엇일까요?",
    date: "3d 2h 30m",
  },
];

const QuestionData = [
  {
    category: "Javascript",
    title:
      "Javascript에서 var, let, const의 역할과 각각의 차이점은 무엇일까요?",
  },
];
function Component() {
  return (
    <>
      <CommunityStyle>
        <BaseButton>파란색 테두리</BaseButton>
        <BaseButton width="100%">파란색 테두리</BaseButton>
        <LightGrayButton>라이트 그레이</LightGrayButton>
        <LightGrayButton width="100%" className="check">
          라이트 그레이
        </LightGrayButton>
        <GrayButton width="100%">그레이버튼</GrayButton>
        <GrayButton className="check">그레이버튼</GrayButton>
        {mockData.map((item, index) => (
          <CommunityList key={index} {...item} />
        ))}

        {questionData.map((item, index) => (
          <CommonQuestionList key={index} {...item} />
        ))}

        {ProfileData.map((item, index) => (
          <CommonProfile key={index} {...item} />
        ))}

        {RankData.map((item, index) => (
          <RankingProfile key={index} {...item} />
        ))}

        <CommunitySmallBtn>답변 더 보기+</CommunitySmallBtn>
        <CommunitySmallBtn>글쓰기+</CommunitySmallBtn>

        {WeeklyQuestionData.map((item, index) => (
          <WeeklyQuestionCard key={index} {...item} />
        ))}

        {QuestionData.map((item, index) => (
          <QuestionCard key={index} {...item} />
        ))}

        <InputField
          onChange={(e) => setText(e.target.value)}
          placeholder="아이디를 입력하세요"
          type="text"
        ></InputField>
      </CommunityStyle>
    </>
  );
}

const CommunityStyle = styled.main`
  width: 100%;
  padding-bottom: 10dvh;
  background-color: #fff;
`;

export default Component;
