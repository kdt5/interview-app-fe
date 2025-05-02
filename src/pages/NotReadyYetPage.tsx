import { VscCode } from "react-icons/vsc";
import styled from "styled-components";

function NotReadyYetPage() {
  return (
    <NotReadyYetPageStyle>
      <VscCode />
      <p>
        코드가 아직 덜 익었어요... <br />
        열심히 굽는 중입니다 🍪
      </p>
    </NotReadyYetPageStyle>
  );
}

const NotReadyYetPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 165px);

  svg {
    fill: #6ea1ff;
    font-size: 50px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    text-align: center;
    line-height: 1.6;
  }
`;

export default NotReadyYetPage;
