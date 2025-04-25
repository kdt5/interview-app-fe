import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { FRONTEND_URLS } from "../../constants/Urls";
import { replaceUrlParams } from "../../utils/Url";
import { useFetchWeeklyQuestion } from "../../hooks/UseFetchWeeklyQuestion";
import HomeImage from "../../assets/Navigation/Home.png";
import HomeImageActive from "../../assets/Navigation/Home-Active.png";
import QuestionImage from "../../assets/Navigation/Question.png";
import QuestionImageActive from "../../assets/Navigation/Qeustion-Active.png";
import RankingImage from "../../assets/Navigation/Ranking.png";
import RankingImageActive from "../../assets/Navigation/Ranking-Active.png";
import CommunityImage from "../../assets/Navigation/Community.png";
import CommunityImageActive from "../../assets/Navigation/Community-Active.png";
import MyPageImage from "../../assets/Navigation/MyPage.png";
import MyPageImageActive from "../../assets/Navigation/MyPage-Active.png";

function Nav() {
  const { pathname } = useLocation();
  const { weeklyQuestion } = useFetchWeeklyQuestion();
  return (
    <>
      <NavStyle>
        <ul className="category">
          <li>
            <Link to={FRONTEND_URLS.HOME}>
              <span>
                <img
                  src={
                    pathname === FRONTEND_URLS.HOME
                      ? HomeImageActive
                      : HomeImage
                  }
                  alt="홈"
                />
                <span
                  className={pathname === FRONTEND_URLS.HOME ? "active" : ""}
                >
                  홈
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={
                weeklyQuestion
                  ? replaceUrlParams(FRONTEND_URLS.ANSWER, {
                      questionId: weeklyQuestion.question?.id?.toString(),
                    })
                  : ""
              }
            >
              <span>
                <img
                  src={
                    pathname.includes("answer")
                      ? QuestionImageActive
                      : QuestionImage
                  }
                  alt="면접질문"
                />
                <span className={pathname.includes("answer") ? "active" : ""}>
                  면접질문
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link to={FRONTEND_URLS.RANKINGS.MAIN}>
              <span>
                <img
                  src={
                    pathname.startsWith("/rankings")
                      ? RankingImageActive
                      : RankingImage
                  }
                  alt="랭킹"
                />
                <span
                  className={pathname.startsWith("/rankings") ? "active" : ""}
                >
                  랭킹
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link to={FRONTEND_URLS.COMMUNITY.HOME}>
              <span>
                <img
                  src={
                    pathname.startsWith("/community")
                      ? CommunityImageActive
                      : CommunityImage
                  }
                  alt="커뮤니티"
                />
                <span
                  className={pathname.startsWith("/community") ? "active" : ""}
                >
                  커뮤니티
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link to={FRONTEND_URLS.MY_PAGE.HOME}>
              <span>
                <img
                  src={
                    pathname.startsWith("/my-page")
                      ? MyPageImageActive
                      : MyPageImage
                  }
                  alt="마이뷰잇"
                />
                <span
                  className={pathname.startsWith("/my-page") ? "active" : ""}
                >
                  마이뷰잇
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </NavStyle>
    </>
  );
}

const NavStyle = styled.nav`
  width: 100%;
  height: 80px;
  max-width: 380px;
  background-color: #fafafa;
  border-top: solid 1px #ededed;
  color: #ccc;
  position: fixed;
  bottom: 0;
  text-align: center;
  display: grid;
  box-shadow: 0 -1px 16px #a7a7a752;

  .category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    li {
      list-style: none;
      width: calc(100% / 5);
      text-align: center;

      .active {
        color: #6ea1ff;
        font-weight: 600;
      }

      span {
        font-weight: 300;
        color: #ccc;
        display: block;
        font-size: 14px;
        margin-top: 3px;

        svg {
          font-size: 20px;
          margin-bottom: 5px;
          path {
            color: #ccc;
          }
        }
      }
    }
  }
`;

export default Nav;
