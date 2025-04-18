import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function OnBoardingPage() {
  const navigate = useNavigate();

  function handleClickLogin() {
    navigate("/login");
  }

  function handleClickSignUp() {
    navigate("/signup");
  }

  return (
    <Wrapper>
      <Content>
        <Title>
          함께하는 면접,
          <br />
          <SubTitle>합격까지 한걸음 더!</SubTitle>
        </Title>
        <SubText>
          인터뷰잇에서 다양한 면접 질문을
          <br />
          답변하고, 학습해보세요
        </SubText>

        <ButtonGroup>
          <LoginButton onClick={handleClickLogin}>로그인</LoginButton>
          <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
        </ButtonGroup>
      </Content>
    </Wrapper>
  );
}

export default OnBoardingPage;

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, #eef4ff 0%, white 100%);
  display: flex;
  justify-content: center;
  padding: 357px 25px 0px 25px;
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 100%;
  max-width: 360px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  line-height: 1.4;
  margin-bottom: 16px;
`;

const SubTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #4f7fff;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #888;
  line-height: 1.6;
  margin-bottom: 83px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LoginButton = styled.button`
  background-color: #4f7fff;
  color: white;
  font-size: 16px;
  padding: 14px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;

const SignUpButton = styled.button`
  background-color: white;
  color: #4f7fff;
  font-size: 16px;
  padding: 14px;
  border: 1.5px solid #4f7fff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;
