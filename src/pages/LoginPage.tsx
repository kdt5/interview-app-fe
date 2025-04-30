import { RegisterOptions, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/Auth.api";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import InputField from "../components/common/Input/Input";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../constants/Auth";

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
    required: { value: true, message: "이메일 또는 비밀번호를 확인하세요." },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
      message: "이메일 또는 비밀번호를 확인하세요.",
    },
    maxLength: {
      value: EMAIL_MAX_LENGTH,
      message: "이메일 또는 비밀번호를 확인하세요.",
    },
  };

  const checkPassword: RegisterOptions<LoginInputs, "email"> = {
    required: {
      value: true,
      message: "이메일 또는 비밀번호를 확인하세요.",
    },
    pattern: {
      value: new RegExp(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`
      ),
      message: "이메일 또는 비밀번호를 확인하세요.",
    },
  };
  const firstErrorField = errors.email
    ? "email"
    : errors.password
      ? "password"
      : null;

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
              <InputField
                type="email"
                autoComplete="off"
                placeholder="이메일 입력"
                {...register("email", checkEmail)}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <InputWrapper>
              <InputField
                autoComplete="off"
                placeholder="비밀번호 입력"
                type="password"
                {...register("password", checkPassword)}
              />
            </InputWrapper>
          </FormGroup>
          <ErrorText>
            {firstErrorField ? (
              <ErrorMessage
                errors={errors}
                name={firstErrorField}
                render={({ message }) => message}
              />
            ) : (
              " "
            )}
          </ErrorText>

          <LoginButton>로그인</LoginButton>
        </LoginForm>

        <LinkGroup>
          <StyledLink to="/forgot-password">비밀번호 찾기</StyledLink>
          <Divider>|</Divider>
          <StyledLink to="/signup">회원가입</StyledLink>
        </LinkGroup>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
`;

const Content = styled.div`
  margin-top: 32px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888888;
  margin-top: 8px;
  margin-bottom: 40px;
  font-weight: 400;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  gap: 8px;
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
  min-height: 18px;
  display: block;
  text-align: right;
`;
const LoginButton = styled.button`
  padding: 14px 0;
  height: 55px;
  border-radius: 8px;
  background-color: #6ea1ff;
  color: white;
  font-weight: 600;
  font-size: 18px;
  border: 1px solid #eee;
  margin-top: 40px;
`;

const LinkGroup = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  font-weight: 500;
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
