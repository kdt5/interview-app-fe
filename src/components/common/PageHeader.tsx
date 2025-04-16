import styled from "styled-components";
import logo from "../../assets/logo.png";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { HiArrowSmLeft } from "react-icons/hi";
import { FRONTEND_URLS } from "../../constants/Urls";
import Option from "../../assets/Option.png";
import Like from "../../assets/Like.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const MainPage = location.pathname === "/";

  const isAnswerDetail = location.pathname === "/answerdetail";
  const isPostDetail = location.pathname === "/postdetail";
  const isDetailPage = isAnswerDetail || isPostDetail;

  return (
    <HeaderStyle>
      {MainPage ? (
        <div className="logo">
          <img src={logo} alt="interview it" />
        </div>
      ) : (
        <TitleWrapStyle>
          <BackButton onClick={() => navigate(-1)}>
            <HiArrowSmLeft />
          </BackButton>
          <p>{isDetailPage ? "" : getPageTitle(location.pathname)}</p>
          {isDetailPage && (
            <DetailButton>
              <LikeStyle>
                <img src={Like} alt="" />
              </LikeStyle>
              <OptionStyle>
                <img src={Option} alt="" />
              </OptionStyle>
            </DetailButton>
          )}
        </TitleWrapStyle>
      )}
    </HeaderStyle>
  );
}

const getPageTitle = (pathname: string) => {
  const frontend = FRONTEND_URLS.QUESTION_LIST + "/frontend";
  const backend = FRONTEND_URLS.QUESTION_LIST + "/backend";
  const titles: Record<string, string> = {
    [FRONTEND_URLS.MY_PAGE.HOME]: "마이페이지",
    [frontend]: "프론트엔드 면접 질문",
    [backend]: "백엔드 면접 질문",
    [FRONTEND_URLS.MY_PAGE.ANSWERS]: "내 답변 모아보기",
    [FRONTEND_URLS.MY_PAGE.FAVORITES.QUESTIONS]: "즐겨찾기 질문 모아보기",
    "/community": "커뮤니티",
    "/answerdetail": "답변 상세보기",
  };

  const matchAnswer = matchPath(FRONTEND_URLS.ANSWER, pathname);
  const matchAnswerEdit = matchPath(FRONTEND_URLS.ANSWER_EDIT, pathname);

  if (matchAnswer) {
    return "질문 답변하기";
  }

  if (matchAnswerEdit) {
    return "내 답변 편집하기";
  }

  return titles[pathname] || "페이지";
};

const HeaderStyle = styled.header`
  width: 100%;
  max-width: 380px;
  padding: 50px 30px 10px;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 999;

  .logo {
    img {
      width: 140px;
    }
  }
`;

const TitleWrapStyle = styled.div`
  p {
    text-align: center;
    flex-grow: 1;
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 30px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0;
`;

const DetailButton = styled.div`
  float: right;
`;

const LikeStyle = styled.button`
  background-color: #fff;
  padding: 0 10px;
`;

const OptionStyle = styled.button`
  background-color: #fff;
  padding: 0;
`;
export default Header;
