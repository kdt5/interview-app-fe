import styled from "styled-components";
import HomeImg from "../assets/MainPageIcon.png";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FRONTEND_URLS } from "../constants/Urls";
import { replaceUrlParams } from "../utils/Url";
import { useWeeklyQuestion } from "../hooks/UseWeeklyQuestion";

function MainPage() {
  const { weeklyQuestion } = useWeeklyQuestion();

  return (
    <>
      <MainPageStyle>
        <div className="main-title">
          <h1>
            이번주 새로운
            <br />
            면접질문이 도착했어요
          </h1>
          <div>
            <img src={HomeImg} alt="MainPage Image" />
          </div>
        </div>

        {weeklyQuestion ? (
          <Link
            to={replaceUrlParams(FRONTEND_URLS.ANSWER, {
              questionId: weeklyQuestion.id?.toString(),
            })}
            className="weekly-question"
          >
            <p>{weeklyQuestion.title}</p>
            <div>
              <span>{weeklyQuestion.categories[0].id}</span>
            </div>
          </Link>
        ) : (
          <div className="weekly-question">
            <p>이번 주 질문을 불러올 수 없습니다.</p>
          </div>
        )}

        <div className="interview-essential-wrap">
          <div className="contents-title">
            <span>추천 질문</span>
            <p>면접 필수 질문</p>
          </div>
          <div className="interview-essential">
            <div className="essential-question-box">
              <p>
                프론트엔드 개발자
                <br />
                필수 질문 리스트
              </p>
              <span>
                <LinkStyle to="/question-list/frontend">
                  지금 답변하기 <SlArrowRight />
                </LinkStyle>
              </span>
            </div>
            <div className="essential-question-box">
              <p>
                백엔드 개발자
                <br />
                필수 질문 리스트
              </p>
              <span>
                <LinkStyle to="/question-list/backend">
                  지금 답변하기 <SlArrowRight />
                </LinkStyle>
              </span>
            </div>
          </div>
        </div>
      </MainPageStyle>
    </>
  );
}

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

const LinkStyle = styled(Link)`
  color: #6ea1ff;
  font-weight: 400;
`;

export default MainPage;
