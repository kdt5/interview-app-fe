import styled from "styled-components";
import Nav from "../common/BottomNavigation";
import { GlobalStyle } from "../../styles/global";
import Header from "../common/PageHeader";
import { useLocation } from "react-router-dom";
import { FRONTEND_URLS } from "../../constants/Urls";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const hiddenHeaderPaths = [FRONTEND_URLS.SIGNUP, FRONTEND_URLS.LOGIN];
  const hiddenNavPaths = [
    FRONTEND_URLS.SIGNUP,
    FRONTEND_URLS.LOGIN,
    "/some-other-path",
  ];

  const isHeaderHidden = hiddenHeaderPaths.includes(location.pathname);
  const isNavHidden = hiddenNavPaths.includes(location.pathname);

  return (
    <>
      <GlobalStyle />
      <LayoutStyle>
        <Header />
        {!isHeaderHidden && <Header />}
        <LayoutPadding isHeaderHidden={isHeaderHidden}>
          {children}
        </LayoutPadding>
        {!isNavHidden && <Nav />}
      </LayoutStyle>
    </>
  );
}

const LayoutStyle = styled.div`
  width: 100%;
  max-width: 380px;
  height: fit-content;
  min-height: 100dvh;
  margin: 0 auto;
  background-color: #fff;
`;

const LayoutPadding = styled.div<{ isHeaderHidden: boolean }>`
  padding: ${({ isHeaderHidden }) =>
    isHeaderHidden ? "0 0 80px" : "85px 0 80px"};
  height: fit-content;
  box-sizing: border-box;
`;

export default Layout;
