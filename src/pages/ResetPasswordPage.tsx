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
        <div className="input-container">
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
          {errors.email ? (
            <ErrorText>{errors.email.message}</ErrorText>
          ) : submitted ? (
            <SuccessText>비밀번호 재설정 이메일을 보냈습니다</SuccessText>
          ) : emailValue && isValidEmail(emailValue) ? (
            <SuccessText>사용가능한 비밀번호 입니다.</SuccessText>
          ) : null}
        </div>
        <div className="input-container">
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
        </div>
      </Form>
      <ResetButton onClick={() => navigate("/login")}>
        비밀번호 재설정
      </ResetButton>
    </Wrapper>
  );
}

export default ResetPasswordPage;

const Wrapper = styled.div`
  padding: 10px 30px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
`;

const Form = styled.form`
  margin-top: 32px;

  .input-container {
    height: 115px;
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: #888888;
  margin-bottom: 8px;
  display: block;
  font-weight: 600;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: end;
  & > div:first-child {
    flex: 1;
  }
`;

const CheckButton = styled.button`
  height: 60px;
  padding: 0 24px;
  background-color: #6ea1ff;
  color: white;
  font-weight: 400;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
`;

const ResetButton = styled.button`
  width: 100%;
  height: 55px;
  background-color: #6ea1ff;
  color: white;
  font-weight: 400;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 330px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #f2624f;
  display: flex;
  margin-top: 10px;
`;

const SuccessText = styled.div`
  margin: 10px 0 30px 0;
  font-size: 12px;
  color: #6ea1ff;
  display: flex;
`;
