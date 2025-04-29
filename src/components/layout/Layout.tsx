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

  const hiddenHeaderAndNavPaths = [FRONTEND_URLS.SIGNUP, FRONTEND_URLS.LOGIN];

  const isHidden = hiddenHeaderAndNavPaths.includes(location.pathname);

  return (
    <>
      <GlobalStyle />
      <LayoutStyle>
        <Header />
        <LayoutPadding>{children}</LayoutPadding>
        {!isHidden && <Nav />}
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

const LayoutPadding = styled.div`
  padding: 85px 0 80px;
  height: fit-content;
  box-sizing: border-box;
`;

export default Layout;
