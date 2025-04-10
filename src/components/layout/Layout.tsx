import styled from "styled-components";
import Nav from "../common/BottomNavigation";
import { GlobalStyle } from "../../styles/global";
import Header from "../common/PageHeader";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <GlobalStyle />
      <LayoutStyle>
        <Header />
        <LayoutPadding>{children}</LayoutPadding>
        <Nav />
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
  padding: 100px 0;
  height: fit-content;
  box-sizing: border-box;
`;

export default Layout;
