import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdHomeFilled } from "react-icons/md";
import { FaMicroblog } from "react-icons/fa6";
import { IoMicSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { MdStars } from "react-icons/md";
import { FRONTEND_URLS } from "../../constants/Urls";
import { replaceUrlParams } from "../../utils/Url";
import { useFetchWeeklyQuestion } from "../../hooks/UseFetchWeeklyQuestion";

function Nav() {
  const { weeklyQuestion } = useFetchWeeklyQuestion();
  return (
    <>
      <NavStyle>
        <ul className="category">
          <li>
            <Link to={FRONTEND_URLS.HOME}>
              <span>
                <MdHomeFilled />
                <span>홈</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={
                weeklyQuestion
                  ? replaceUrlParams(FRONTEND_URLS.ANSWER, {
                      questionId: weeklyQuestion.question.id?.toString(),
                    })
                  : ""
              }
            >
              <span>
                <IoMicSharp />
                <span>위클리</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to={FRONTEND_URLS.MY_PAGE.ANSWERS}>
              <span>
                <MdStars />
                <span>내 인터뷰</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/community">
              <span>
                <FaMicroblog />
                <span>커뮤니티</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to={FRONTEND_URLS.MY_PAGE.HOME}>
              <span>
                <IoIosSettings />
                <span>마이뷰잇</span>
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
  color: #6ea1ff;
  position: fixed;
  bottom: 0;
  text-align: center;
  display: grid;

  .category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    li {
      list-style: none;
      width: calc(100% / 5);
      text-align: center;
      span {
        font-weight: 400;
        color: #6ea1ff;
        display: block;

        svg {
          font-size: 20px;
          margin-bottom: 5px;
          path {
            color: #6ea1ff;
          }
        }
      }
    }
  }
`;

export default Nav;
