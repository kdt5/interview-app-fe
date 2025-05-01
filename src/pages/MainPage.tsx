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
import { FRONTEND_URLS } from "../constants/Urls";
import { replaceUrlParams } from "../utils/Url";
import { getPositionKeyById } from "../utils/Positions";
import { useMyUserData } from "../hooks/UseMyUserData";

function MainPage() {
  const { weeklyQuestion } = useFetchWeeklyQuestion();
  const { getCategoryName } = useCategory();

  const { data: userData } = useMyUserData();

  if (!userData) return null;

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
            linkTo={`/questions/${weeklyQuestion.question?.id}/answer`}
          ></WeeklyQuestionCard>
        ) : (
          <>
            <WeeklyQuestionCard
              category="-"
              title="이번주 위클리 질문을 불러올 수 없습니다"
              date=""
              answerCount={0}
              isComplete={true}
              linkTo="/"
            ></WeeklyQuestionCard>
          </>
        )}
        <MainPageNavigation>
          <MainPageIconNavigation
            to={
              weeklyQuestion
                ? replaceUrlParams(FRONTEND_URLS.QUESTION_LIST, {
                    position: getPositionKeyById(userData.positionId) || "",
                  })
                : ""
            }
            iconSource={QuestionIcon}
            menu="필수질문"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to={FRONTEND_URLS.RANKINGS.MAIN}
            iconSource={RankingIcon}
            menu="뷰잇랭킹"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to={FRONTEND_URLS.MY_PAGE.ANSWERS}
            iconSource={AnswerIcon}
            menu="내 답변"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to={FRONTEND_URLS.COMMUNITY.MAIN}
            iconSource={CommunityIcon}
            menu="커뮤니티"
          ></MainPageIconNavigation>
        </MainPageNavigation>
        <div>
          <SectionTitle
            to={
              weeklyQuestion
                ? replaceUrlParams(FRONTEND_URLS.QUESTION_LIST, {
                    position: getPositionKeyById(userData.positionId) || "",
                  })
                : ""
            }
          >
            면접 필수 질문
          </SectionTitle>
          <EssentialQuestionListGroup></EssentialQuestionListGroup>
        </div>
        <EssentialQuestionListGroup></EssentialQuestionListGroup>
        <MainSlideBanner></MainSlideBanner>
        <div>
          <SectionTitle to="/">실전 면접, 채용 공고</SectionTitle>
          <RecruitmentNotice></RecruitmentNotice>
        </div>
        <RecruitmentNotice></RecruitmentNotice>
      </MainPageStyle>
    </>
  );
}

const MainPageStyle = styled.main`
  width: 100%;
  height: fit-content;
  padding: 20px 0;
`;

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
