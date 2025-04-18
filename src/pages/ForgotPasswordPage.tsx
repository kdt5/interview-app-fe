import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputText from "../components/common/Input";
import { RegisterOptions, useForm } from "react-hook-form";
import { EMAIL_MAX_LENGTH } from "../constants/Auth";
import { ErrorMessage } from "@hookform/error-message";

function ForgotPasswordPage() {
  const navigate = useNavigate();

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

  const onSubmit = (data: ForgotInputs) => {};

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>이메일</Label>
        <InputRow>
          <InputText
            type="email"
            placeholder="이메일 입력"
            {...register("email", checkEmail)}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <ErrorText>{message}</ErrorText>}
          />
          <CheckButton>이메일 확인</CheckButton>
        </InputRow>
        <InfoText>비밀번호 재설정 이메일을 보냈습니다</InfoText>
      </Form>

      <BottomFixed>
        <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
      </BottomFixed>
    </Wrapper>
  );
}
export default ForgotPasswordPage;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Form = styled.div`
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
  gap: 12px;
  align-items: center;
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

const InfoText = styled.p`
  margin-top: 12px;
  font-size: 13px;
  color: #6ca9ff;
`;

const BottomFixed = styled.div`
  position: absolute;
  bottom: 20px;
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
const ErrorText = styled.span`
  font-size: 12px;
  color: #e74c3c;
  padding-left: 4px;
`;
