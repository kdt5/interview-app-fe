import styled from "styled-components";
import Nav from "../common/nav";
import { GlobalStyle } from "../../styles/global";
import Header from "../common/header";

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
  height: 100dvh;
  margin: 0 auto;
  background-color: #fff;
`;

const LayoutPadding = styled.div`
  padding: 100px 0;
`;

export default Layout;
