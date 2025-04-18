import { RegisterOptions, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/Auth.api";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../constants/Auth";
import InputText from "../components/common/Input";

export default LoginPage;

export interface LoginInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit = (data: LoginInputs) => {
    login(data).then(() => {
      navigate("/");
    });
  };

  const checkEmail: RegisterOptions<LoginInputs, "email"> = {
    required: { value: true, message: "이메일을 입력해주세요." },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
      message: "유효한 이메일 형식이 아닙니다.",
    },
    maxLength: {
      value: EMAIL_MAX_LENGTH,
      message: `이메일은 ${EMAIL_MAX_LENGTH}자 이하로 입력해주세요.`,
    },
  };

  const checkPassword: RegisterOptions<LoginInputs, "email"> = {
    required: {
      value: true,
      message: "비밀번호를 입력해주세요.",
    },
    pattern: {
      value: new RegExp(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`
      ),
      message: `영문 대소문자, 숫자, 특수문자 포함 ${PASSWORD_MIN_LENGTH} - ${PASSWORD_MAX_LENGTH}자`,
    },
  };

  return (
    <Wrapper>
      <Content>
        <Title className="main-title">로그인</Title>
        <Subtitle className="sub-title">
          서비스 이용을 위해 로그인 해주세요.
        </Subtitle>

        <LoginForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <InputWrapper>
              <InputText
                autoComplete="off"
                placeholder="이메일 입력"
                type="email"
                {...register("email", checkEmail)}
              />
            </InputWrapper>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <ErrorText>{message}</ErrorText>}
            />
          </FormGroup>

          <FormGroup>
            <InputWrapper>
              <InputText
                autoComplete="off"
                placeholder="비밀번호 입력"
                type="password"
                {...register("password", checkPassword)}
              />
            </InputWrapper>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <ErrorText>{message}</ErrorText>}
            />
          </FormGroup>
          <LoginButton>로그인</LoginButton>
        </LoginForm>

        <LinkGroup>
          <StyledLink to="/forgot-password">비밀번호 찾기</StyledLink>
          <Divider>|</Divider>
          <StyledLink to="/signup">회원가입</StyledLink>
        </LinkGroup>

        <OrDivider>또는</OrDivider>

        <SocialButtonGroup>
          <KakaoButton></KakaoButton>
          <NaverButton></NaverButton>
        </SocialButtonGroup>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  padding: 32px 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
`;

const Content = styled.div`
  margin-top: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #888888;
  margin-top: 8px;
  margin-bottom: 40px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #e74c3c;
  padding-left: 4px;
`;
const LoginButton = styled.button`
  padding: 14px 0;
  height: 55px;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #ccc;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #eee;
  margin-top: 40px;
`;

const LinkGroup = styled.div`
  font-size: 13px;
  color: #444;
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  font-size: 13px;
  color: #444;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: #aaa;
`;

const OrDivider = styled.div`
  margin: 30px 0 16px;
  font-size: 14px;
  color: #888;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const SocialButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const NaverButton = styled.button`
  background-color: #03c75a;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  font-size: 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
