import styled from "styled-components";
import { useState } from "react";
import InputField from "../components/common/Input/Input";
import { useNavigate } from "react-router-dom";
import { RegisterOptions, useForm } from "react-hook-form";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../constants/Auth";

export interface FindInputs {
  email: string;
  password: string;
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FindInputs>();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;

  const PASSWORD_REGEX = new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`
  );

  const checkEmail: RegisterOptions<FindInputs, "email"> = {
    required: { value: true, message: "이메일을 확인하세요" },
    pattern: {
      value: EMAIL_REGEX,
      message: "이메일을 확인하세요",
    },
    maxLength: {
      value: EMAIL_MAX_LENGTH,
      message: "이메일을 확인하세요",
    },
  };

  const checkPassword: RegisterOptions<FindInputs, "password"> = {
    required: {
      value: true,
      message: "비밀번호를 확인하세요",
    },
    pattern: {
      value: PASSWORD_REGEX,
      message: "비밀번호를 확인하세요",
    },
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);
  const isValidPassword = (password: string): boolean =>
    PASSWORD_REGEX.test(password);

  const onSubmit = () => {
    setSubmitted(true);
    console.log("submitted : " + submitted);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>이메일</Label>
        <InputRow>
          <InputField
            autoComplete="off"
            placeholder="이메일을 입력하세요"
            type="email"
            maxLength={30}
            {...register("email", checkEmail)}
          />
          <CheckButton type="submit">이메일 확인</CheckButton>
        </InputRow>

        <FeedbackWrapper>
          {errors.email ? (
            <ErrorText>{errors.email.message}</ErrorText>
          ) : submitted ? (
            <SuccessText>비밀번호 재설정 이메일을 보냈습니다</SuccessText>
          ) : emailValue && isValidEmail(emailValue) ? (
            <SuccessText>사용가능한 비밀번호 입니다.</SuccessText>
          ) : null}
        </FeedbackWrapper>

        <Label>비밀번호 재입력</Label>
        <InputField
          autoComplete="off"
          placeholder="비밀번호를 입력하세요"
          type="password"
          maxLength={30}
          {...register("password", checkPassword)}
        />
        {errors.password ? (
          <ErrorText>{errors.password.message}</ErrorText>
        ) : submitted ? (
          <SuccessText>비밀번호 재설정 이메일을 보냈습니다</SuccessText>
        ) : passwordValue && isValidPassword(passwordValue) ? (
          <SuccessText>이메일이 확인되었습니다</SuccessText>
        ) : (
          <div style={{ height: "18px" }}>&nbsp;</div>
        )}
      </Form>

      <BottomFixed>
        <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
      </BottomFixed>
    </Wrapper>
  );
}

export default ResetPasswordPage;

const Wrapper = styled.div`
  padding: 0px 30px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
`;

const Form = styled.form`
  margin-top: 32px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #888888;
  margin-bottom: 8px;
  display: block;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: end;
  & > div:first-child {
    flex: 1;
  }
`;

const CheckButton = styled.button`
  height: 60px;
  padding: 0 16px;
  background-color: #6ca9ff;
  color: white;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
`;

const BottomFixed = styled.div`
  position: absolute;
  bottom: 150px;
  left: 20px;
  right: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #6ca9ff;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ErrorText = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
  font-size: 13px;
  color: #f2624f;
  display: flex;
`;

const SuccessText = styled.div`
  margin-top: 15px;
  font-size: 13px;
  color: #6ca9ff;
  display: flex;
`;

const FeedbackWrapper = styled.div`
  height: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 13px;
  display: flex;
  align-items: center;
`;
