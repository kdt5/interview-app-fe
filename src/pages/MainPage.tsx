import styled from "styled-components";
import { useFetchWeeklyQuestion } from "../hooks/UseFetchWeeklyQuestion";
import SectionTitle from "../components/common/SectionTitle";
import EssentialQuestionListGroup from "../components/MainPage/EssentialQuestionListSection";
import MainPageIconNavigation from "../components/MainPage/MainPageIconNavigation";
import MainSlideBanner from "../components/MainPage/MainSlideBanner";
import QuestionIcon from "../assets/Navigation/Qeustion-Active.png";
import RankingIcon from "../assets/Navigation/Ranking-Active.png";
import AnswerIcon from "../assets/Navigation/MyAnswer-Active.png";
import CommunityIcon from "../assets/Navigation/Community-Active.png";
import WeeklyQuestionCard from "../components/common/Card/WeeklyQuestionCard";
import RecruitmentNotice from "../components/MainPage/RecruitmentNotice";
import { useCategory } from "../hooks/UseCategory";
import { formatToWeeklyLabel } from "../utils/Date";

function MainPage() {
  const { weeklyQuestion } = useFetchWeeklyQuestion();
  const { getCategoryName } = useCategory();

  const categoryName = getCategoryName(
    weeklyQuestion?.question?.categories[0]?.category?.id ?? 0
  );
  const isComplete = weeklyQuestion?.question?.isAnswered;

  return (
    <>
      <MainPageStyle>
        {weeklyQuestion ? (
          <WeeklyQuestionCard
            category={categoryName}
            title={weeklyQuestion.question?.title}
            date={formatToWeeklyLabel(weeklyQuestion.startDate)}
            answerCount={123}
            isComplete={isComplete}
          ></WeeklyQuestionCard>
        ) : (
          <>
            <WeeklyQuestionCard
              category="-"
              title="이번주 위클리 질문을 불러올 수 없습니다"
              date=""
              answerCount={0}
              isComplete={true}
            ></WeeklyQuestionCard>
          </>
        )}
        <MainPageNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource={QuestionIcon}
            menu="필수질문"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource={RankingIcon}
            menu="뷰잇랭킹"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource={AnswerIcon}
            menu="내 답변"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource={CommunityIcon}
            menu="커뮤니티"
          ></MainPageIconNavigation>
        </MainPageNavigation>
        <MainPageSectionStyle>
          <SectionTitle to="/question-list/frontend">
            면접 필수 질문
          </SectionTitle>
          <EssentialQuestionListGroup></EssentialQuestionListGroup>
        </MainPageSectionStyle>
        <MainSlideBanner></MainSlideBanner>
        <MainPageSectionStyle>
          <SectionTitle to="/mypage">실전 면접, 채용 공고</SectionTitle>
          <RecruitmentNotice></RecruitmentNotice>
        </MainPageSectionStyle>
      </MainPageStyle>
    </>
  );
}

const MainPageStyle = styled.main`
  width: 100%;
  height: fit-content;
  padding: 20px 0;
`;

const MainPageSectionStyle = styled.div``;
const MainPageNavigation = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 380px;
  border-bottom: solid 5px #fbfbfb;
  margin-bottom: 10px;
`;

export default MainPage;
