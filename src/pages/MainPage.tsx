import styled from "styled-components";

import { Link } from "react-router-dom";
import { FRONTEND_URLS } from "../constants/Urls";
import { replaceUrlParams } from "../utils/Url";
import { useFetchWeeklyQuestion } from "../hooks/UseFetchWeeklyQuestion";
import SectionTitle from "../components/common/SectionTitle";
import EssentialQuestionListGroup from "../components/MainPage/EssentialQuestionListSection";
import MainPageIconNavigation from "../components/MainPage/MainPageIconNavigation";

function MainPage() {
  const { weeklyQuestion } = useFetchWeeklyQuestion();

  return (
    <>
      <MainPageStyle>
        {weeklyQuestion ? (
          <Link
            to={replaceUrlParams(FRONTEND_URLS.ANSWER, {
              // questionId: weeklyQuestion.question.id?.toString(),
              questionId: weeklyQuestion.question?.id?.toString() ?? "",
            })}
            className="weekly-question"
          >
            <p>{weeklyQuestion.question?.title}</p>
            <div>
              <span>{weeklyQuestion.question?.categories[0]?.category.id}</span>
            </div>
          </Link>
        ) : (
          <div className="weekly-question">
            <p>이번 주 질문을 불러올 수 없습니다.</p>
          </div>
        )}
      </MainPageStyle>

      <MainPageStyleNew>
        <MainPageNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource="/"
            menu="위클리"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource="/"
            menu="필수 질문"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource="/"
            menu="내 답변"
          ></MainPageIconNavigation>
          <MainPageIconNavigation
            to="/"
            iconSource="/"
            menu="커뮤니티"
          ></MainPageIconNavigation>
        </MainPageNavigation>
        <MainPageSectionStyle>
          <SectionTitle to="/question-list/frontend">
            면접 필수 질문
          </SectionTitle>
          <EssentialQuestionListGroup></EssentialQuestionListGroup>
        </MainPageSectionStyle>
        <MainPageSectionStyle>이미지</MainPageSectionStyle>
        <MainPageSectionStyle>
          <SectionTitle to="/mypage">실전 면접, 채용 공고</SectionTitle>
        </MainPageSectionStyle>
      </MainPageStyleNew>
    </>
  );
}

const MainPageStyleNew = styled.main`
  width: 100%;
  height: fit-content;
`;

const MainPageSectionStyle = styled.div``;
const MainPageNavigation = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 380px;
`;
const MainPageStyle = styled.main`
  width: 100%;
  padding: 0 30px;

  .main-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .weekly-question {
    background-color: #6ea1ff;
    margin-top: 10px;
    padding: 20px;
    border-radius: 10px;
    display: block;

    p {
      color: #fff;
      width: 100%;
      margin-bottom: 30px;
    }

    span {
      background-color: #bbd3ff;
      color: #fff;

      font-size: 12px;
      font-weight: 300;

      border-radius: 15px;

      display: inline-block;
      margin: 0 5px 0 0;
      padding: 3px 10px;
    }
  }

  .interview-essential-wrap {
    margin-top: 50px;

    .contents-title {
      margin-bottom: 10px;

      span {
        color: #6ea1ff;
      }
    }

    .interview-essential {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      .essential-question-box {
        min-width: 160px;
        height: 130px;
        padding: 15px;
        background-color: #fbfbfb;
        border: solid 1px #eff2f8;
        border-radius: 10px;

        p {
          margin-bottom: 30px;
          font-size: 14px;
        }

        span {
          font-weight: 400;
          color: #6ea1ff;

          display: flex;
          align-items: center;
          justify-content: space-between;

          svg {
            path {
              color: #6ea1ff;
            }
          }
        }
      }
    }
  }
`;

export default MainPage;
