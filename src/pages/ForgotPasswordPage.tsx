import styled from "styled-components";
import { RegisterOptions, useForm } from "react-hook-form";
import { EMAIL_MAX_LENGTH } from "../constants/Auth";
import { ErrorMessage } from "@hookform/error-message";
import InputField from "../components/common/Input/Input";
import { useState } from "react";
import { recoverPassword } from "../api/Auth.api";

function ForgotPasswordPage() {

  interface ForgotInputs {
    email: string;
  }
  const checkEmail: RegisterOptions<ForgotInputs, "email"> = {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInputs>();

  const [submitMessage, setSubmitMessage] = useState("");

  const onSubmit = async (data: ForgotInputs) => {
    try {
      await recoverPassword(data.email);
      setSubmitMessage("비밀번호 재설정 이메일을 보냈습니다.");
    } catch {
      setSubmitMessage("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>이메일</Label>
        <InputRow>
          <InputField
            autoComplete="off"
            type="email"
            placeholder="이메일 입력"
            {...register("email", checkEmail)}
          />
          <CheckButton type="submit">이메일 확인</CheckButton>
        </InputRow>
          <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <ErrorText>{message}</ErrorText>}
            />
          {!errors.email && <InfoText>{submitMessage}</InfoText>}
      </Form>
    </Wrapper>
  );
}
export default ForgotPasswordPage;

const Wrapper = styled.div`
  padding: 10px 30px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
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
  font-weight: 600;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const CheckButton = styled.button`
  height: 60px;
  padding: 0 24px;
  background-color: #6ca9ff;
  color: white;
  font-weight: 400;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
`;

const InfoText = styled.p`
  margin-top: 10px;
  font-size: 12px;
  color: #6ca9ff;
  font-weight: 400;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #e74c3c;
  padding-left: 4px;
`;
