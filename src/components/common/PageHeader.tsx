import styled from "styled-components";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { HiArrowSmLeft } from "react-icons/hi";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const MainPage = location.pathname === "/";

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
          <p>{getPageTitle(location.pathname)}</p>
        </TitleWrapStyle>
      )}
    </HeaderStyle>
  );
}

const getPageTitle = (pathname: string) => {
  const titles: Record<string, string> = {
    "/mypage": "마이페이지",
    "/question-list/frontend": "프론트엔드 면접 질문",
    "/question-list/backend": "백엔드 면접 질문",
    "/mypage/answers/history": "내 답변 모아보기",
  };

  return titles[pathname] || "페이지";
};

const HeaderStyle = styled.header`
  width: 100%;
  max-width: 380px;
  padding: 50px 30px 10px;
  position: fixed;
  top: 0;
  background-color: #fff;

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
`;

export default Header;
