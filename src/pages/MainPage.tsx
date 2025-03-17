import styled from "styled-components";
import HomeImg from "../assets/MainPageIcon.png";
import { SlArrowRight } from "react-icons/sl";
import { JSX, useEffect, useState } from "react";
import { WeeklyQuestion } from "../models/WeeklyQuestion.model";
import { fetchWeeklyQuestion } from "../api/WeeklyQuestion.api";

function Home(): JSX.Element {
  const [weeklyQuestion, setWeeklyQuestion] = useState<WeeklyQuestion | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeeklyQuestion = async () => {
      setLoading(true);
      try {
        const question = await fetchWeeklyQuestion();
        setWeeklyQuestion(question);
      } catch (err) {
        setError("이번 주의 질문을 불러오는 중 오류가 발생했습니다.");
        console.error("에러 발생:", err);
      } finally {
        setLoading(false);
      }
    };

    getWeeklyQuestion();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <HomeStyle>
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
          <div className="weekly-question">
            <p>{weeklyQuestion.title}</p>
            <div>
              <span>{weeklyQuestion.categories.join(",")}</span>
            </div>
          </div>
        ) : (
          <div className="weekly-question">
            <p>이번 주 질문이 없습니다.</p>
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
                지금 답변하기 <SlArrowRight />
              </span>
            </div>
            <div className="essential-question-box">
              <p>
                백엔드 개발자
                <br />
                필수 질문 리스트
              </p>
              <span>
                지금 답변하기 <SlArrowRight />
              </span>
            </div>
          </div>
        </div>
      </HomeStyle>
    </>
  );
}

const HomeStyle = styled.main`
  width: 100%;
  padding: 0 30px;

  .main-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .weekly-question {
    background-color: #6ea1ff;
    padding: 20px;
    border-radius: 10px;

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
        font-weight: 400;
      }
    }

    .interview-essential {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      .essential-question-box {
        width: 50%;
        padding: 15px;
        background-color: #fbfbfb;
        border: solid 1px #eff2f8;
        border-radius: 10px;

        p {
          margin-bottom: 30px;
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

export default Home;
