import styled from "styled-components";
import { GlobalStyle } from "../../styles/global";
import Header from "../common/PageHeader";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

function HeaderLayout({ children }: HeaderLayoutProps) {
  return (
    <>
      <GlobalStyle />
      <HeaderLayoutStyle>
        <Header />
        <HeaderLayoutPadding>{children}</HeaderLayoutPadding>
      </HeaderLayoutStyle>
    </>
  );
}

const HeaderLayoutStyle = styled.div`
  width: 100%;
  max-width: 380px;
  height: 100dvh;
  margin: 0 auto;
  background-color: #fff;
`;

const HeaderLayoutPadding = styled.div`
  padding: 100px 0;
  height: 100dvh;
  box-sizing: border-box;
`;

export default HeaderLayout;
