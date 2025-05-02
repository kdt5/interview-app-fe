import styled from "styled-components";
import logo from "../../assets/logo.png";
import Notice from "../../assets/Notice.png";
import NoticeActive from "../../assets/Notice_Active.png";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { HiArrowSmLeft } from "react-icons/hi";
import { FRONTEND_URLS } from "../../constants/Urls";
import Option from "../../assets/Option.png";
import Like from "../../assets/Like.png";
import { useState } from "react";
import CommunityModal from "./Community/CommunityModal";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const MainPage = location.pathname === "/";

  const isAnswerDetail = location.pathname === "/answerdetail";
  const isPostDetail = location.pathname === "/postdetail";
  const isDetailPage = isAnswerDetail || isPostDetail;

  const [isModal, setIsModal] = useState(false);

  const getBackgroundColorByPath = (pathname: string) => {
    if (pathname === FRONTEND_URLS.MY_PAGE.HOME) return "#fbfbfb";
    if (pathname === FRONTEND_URLS.MY_PAGE.EDIT.PROFILE) return "#fbfbfb";
    return "#fff";
  };

  const [hasNotice] = useState(true);

  return (
    <HeaderStyle $bgColor={getBackgroundColorByPath(location.pathname)}>
      {MainPage ? (
        <div className="logo">
          <span>
            <img src={logo} alt="interview it" />
          </span>
          <span className="notice">
            <img src={hasNotice ? Notice : NoticeActive} alt="" />
          </span>
        </div>
      ) : (
        <TitleWrapStyle>
          <BackButton onClick={() => navigate(-1)}>
            <HiArrowSmLeft />
          </BackButton>
          <p>{isDetailPage ? "" : getPageTitle(location.pathname)}</p>
          {isDetailPage && (
            <DetailButton>
              <LikeStyle></LikeStyle>
              <OptionStyle onClick={() => setIsModal(true)}></OptionStyle>
            </DetailButton>
          )}
        </TitleWrapStyle>
      )}
      {isModal && <CommunityModal onClose={() => setIsModal(false)} />}
    </HeaderStyle>
  );
}
const frontend = FRONTEND_URLS.QUESTION_LIST + "/frontend";
const backend = FRONTEND_URLS.QUESTION_LIST + "/backend";

const getPageTitle = (pathname: string) => {
  const titles: Record<string, string> = {
    [frontend]: "프론트엔드 면접 질문",
    [backend]: "백엔드 면접 질문",
    [FRONTEND_URLS.MY_PAGE.HOME]: "마이페이지",
    [FRONTEND_URLS.MY_PAGE.EDIT.PROFILE]: "내 정보 수정",
    [FRONTEND_URLS.MY_PAGE.ANSWERS]: "내 답변 모아보기",
    [FRONTEND_URLS.MY_PAGE.POSTS]: "내가 쓴 게시글",
    [FRONTEND_URLS.MY_PAGE.FAVORITES.POSTS]: "좋아요한 게시글",
    [FRONTEND_URLS.MY_PAGE.FAVORITES.QUESTIONS]: "질문 즐겨찾기",
    [FRONTEND_URLS.FORGOT_PASSWORD]: "비밀번호 찾기",
    [FRONTEND_URLS.RESET_PASSWORD]: "비밀번호 재설정",
    [FRONTEND_URLS.RANKINGS.MAIN]: "랭킹",
    [FRONTEND_URLS.RANKINGS.MORE]: "랭킹 더보기",

    [FRONTEND_URLS.COMMUNITY.MAIN]: "커뮤니티",
    [FRONTEND_URLS.ANSWER]: "답변 보기",
    [FRONTEND_URLS.SIGNUP]: "회원가입",
    [FRONTEND_URLS.LOGIN]: " ",

    [FRONTEND_URLS.NOT_READY]: "준비중인 페이지",
  };

  const matchAnswer = matchPath(FRONTEND_URLS.ANSWER, pathname);
  const matchAnswerEdit = matchPath(FRONTEND_URLS.ANSWER_EDIT, pathname);
  const matchAnswerDetail = matchPath(FRONTEND_URLS.ANSWER_DETAIL, pathname);
  const matchInterview = matchPath("/question-list/:position/*", pathname);

  if (matchInterview) return "면접 질문";

  if (matchAnswer) {
    return "답변 작성";
  }

  if (matchAnswerEdit) {
    return "답변 수정";
  }

  if (matchAnswerDetail) {
    return "답변 상세보기";
  }

  return titles[pathname] || "페이지";
};

const HeaderStyle = styled.header<{ $bgColor: string }>`
  width: 100%;
  max-width: 380px;
  padding: 50px 30px 10px;
  position: fixed;
  top: 0;
  background-color: ${({ $bgColor }) => $bgColor};
  z-index: 999;
  height: 85px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .notice img {
      width: 32px;
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
  display: flex;
  align-items: center;
  justify-content: right;
`;

const LikeStyle = styled.button`
  background-color: transparent;
  padding: 0;
  background-image: url(${Like});
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 5px;
`;

const OptionStyle = styled.button`
  background-color: transparent;
  padding: 0;
  width: 10px;
  height: 20px;
  background-image: url(${Option});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;
export default Header;
