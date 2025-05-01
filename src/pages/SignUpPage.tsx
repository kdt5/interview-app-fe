import { RegisterOptions, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { checkEmailExists, checkNicknameExists, signUp } from "../api/Auth.api";
import { GlobalStyle } from "../styles/global";
import { ErrorMessage } from "@hookform/error-message";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  NICKNAME_MAX_LENGTH,
  NICKNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../constants/Auth";
import { useState } from "react";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
import { AxiosError, HttpStatusCode } from "axios";
import InputField from "../components/common/Input/Input";
import GrayButton from "../components/common/Button/GrayButton";
import LightGrayButton from "../components/common/Button/LightGrayButton";
import InputWithCheckButton from "../components/SignUpPage/InputWithCheckButton";
import { SignUpInputs } from "../models/User.model";

export default SignUpPage;

function SignUpPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignUpInputs>({ mode: "onChange" });
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [isNicknameUnique, setIsNicknameUnique] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    confirm: false,
    alert: false,
  });
  const [selectedPosition, setSelectedPostion] = useState<number | null>(null);

  const canSubmit =
    isValid && isEmailUnique && isNicknameUnique && selectedPosition !== null;

  const positions = [
    { id: 1, value: "front-end", label: "Front-End" },
    { id: 2, value: "back-end", label: "Back-End" },
    { id: 3, value: "full-stack-developer", label: "Full-Stack-Developer" },
    { id: 4, value: "designer", label: "UI/UX Designer" },
  ];

  const onClickEmailCheck = async (email: string) => {
    await trigger("email");

    if (errors.email !== undefined) {
      return;
    }

    checkEmailExists(email)
      .then((isExists) => {
        if (isExists) {
          return;
        }

        setIsEmailUnique(true);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === HttpStatusCode.Conflict) {
            setError("email", {
              type: "manual",
              message: "중복된 이메일입니다.",
            });

            return;
          }
        }
        console.error(error);
        setError("email", {
          type: "manual",
          message: "오류가 발생했습니다.",
        });
      });
  };

  const onClickNicknameCheck = async (nickname: string) => {
    await trigger("nickname");

    if (errors.nickname !== undefined) {
      return;
    }

    checkNicknameExists(nickname)
      .then((isExists) => {
        if (isExists) {
          return;
        }

        setIsNicknameUnique(true);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === HttpStatusCode.Conflict) {
            setError("nickname", {
              type: "manual",
              message: "중복된 닉네임입니다.",
            });

            return;
          }
        }
        console.error(error);
        setError("nickname", {
          type: "manual",
          message: "오류가 발생했습니다.",
        });
      });
  };

  const onChangeEmail = async () => {
    if (isEmailUnique) {
      setIsEmailUnique(false);
      clearErrors("email");
    } else {
      await trigger("email");

      if (errors.email !== undefined) return;

      setError("email", {
        type: "manual",
        message: "이메일 중복 검사를 해주세요.",
      });
    }
  };

  const onChangePassword = async () => {
    const result = await trigger("password");
    setIsPasswordValid(result);
  };

  const onChangeNickname = async () => {
    if (isNicknameUnique) {
      setIsNicknameUnique(false);
      clearErrors("nickname");
    } else {
      await trigger("email");

      if (errors.nickname !== undefined) return;

      setError("nickname", {
        type: "manual",
        message: "닉네임 중복 검사를 해주세요.",
      });
    }
  };

  const onSubmit = (data: SignUpInputs) => {
    if (!canSubmit) {
      return;
    }

    const signUpData = {
      ...data,
      positionId: selectedPosition as number,
    };

    signUp(signUpData).then(() => {
      setIsModalVisible({ confirm: false, alert: true });
    });
  };

  const checkEmail: RegisterOptions<SignUpInputs, "email"> = {
    required: { value: true, message: "이메일을 입력해주세요." },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
      message: "유효한 이메일 형식이 아닙니다.",
    },
    maxLength: {
      value: EMAIL_MAX_LENGTH,
      message: `이메일은 ${EMAIL_MAX_LENGTH}자 이하로 입력해주세요.`,
    },
    onChange: onChangeEmail,
  };

  const checkPassword: RegisterOptions<SignUpInputs, "password"> = {
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
    onChange: onChangePassword,
  };

  const checkNickname: RegisterOptions<SignUpInputs, "nickname"> = {
    required: {
      value: true,
      message: "닉네임을 입력해주세요.",
    },
    pattern: {
      value: new RegExp(
        `^[가-힣a-zA-Z0-9]{${NICKNAME_MIN_LENGTH},${NICKNAME_MAX_LENGTH}}$`
      ),
      message: `한글, 영문, 숫자 ${NICKNAME_MIN_LENGTH} - ${NICKNAME_MAX_LENGTH}자`,
    },
    onChange: onChangeNickname,
  };

  return (
    <>
      <GlobalStyle />
      <SignUpPageStyle $canSubmit={canSubmit}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="join-form"
        >
          <InputWithCheckButton
            label="이메일"
            name="email"
            placeholder="이메일을 입력하세요"
            isUnique={isEmailUnique}
            onCheck={() => onClickEmailCheck(getValues("email"))}
            register={register("email", checkEmail)}
            error={errors.email}
            onChange={onChangeEmail}
            successMessage="사용 가능한 이메일입니다."
          />
          <div className="join-form-container">
            <p className="title">비밀번호</p>
            <InputField
              className="password-input"
              autoComplete="off"
              placeholder="비밀번호를 입력하세요"
              type="password"
              maxLength={30}
              {...register("password", checkPassword)}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
            {isPasswordValid && (
              <span className="duplication-message">
                사용 가능한 비밀번호입니다.
              </span>
            )}
          </div>
          <InputWithCheckButton
            label="닉네임"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            isUnique={isNicknameUnique}
            onCheck={() => onClickNicknameCheck(getValues("nickname"))}
            register={register("nickname", checkNickname)}
            error={errors.nickname}
            onChange={onChangeNickname}
            successMessage="사용 가능한 닉네임입니다."
          />
          <div className="join-form-container position">
            <p className="title">포지션</p>
            <div className="position-button-wrap">
              {positions.map((pos) => (
                <LightGrayButton
                  key={pos.id}
                  className={selectedPosition === pos.id ? "check" : ""}
                  type="button"
                  onClick={() => setSelectedPostion(pos.id)}
                >
                  {pos.label}
                </LightGrayButton>
              ))}
            </div>
          </div>
          <GrayButton
            width="100%"
            className="join-button"
            type="button"
            disabled={!canSubmit}
            onClick={() =>
              setIsModalVisible((prev) => ({ ...prev, confirm: true }))
            }
          >
            회원가입
          </GrayButton>
          {isModalVisible.confirm && (
            <ConfirmModal
              onClose={() => {
                setIsModalVisible((prev) => ({ ...prev, confirm: false }));
              }}
              onConfirm={handleSubmit(onSubmit)}
              message="회원가입 하시겠습니까?"
            />
          )}
          {isModalVisible.alert && (
            <AlertModal
              onClose={() => {
                setIsModalVisible({ confirm: false, alert: false });
                navigate("/login");
              }}
              message="회원가입이 완료되었습니다."
            />
          )}
        </form>
      </SignUpPageStyle>
    </>
  );
}

interface SignUpPageStyleProps {
  $canSubmit: boolean;
}

const SignUpPageStyle = styled.div<SignUpPageStyleProps>`
  max-width: 380px;
  height: 100%;
  padding: 0 30px;
  background-color: #ffffff;

  .join-form {
    margin-top: 20px;

    .join-form-container {
      display: flex;
      flex-direction: column;
      height: 115px;
      margin-bottom: 30px;

      .title {
        color: #888888;
        margin-bottom: 10px;
      }

      .password-input {
        padding-right: 100px;
      }

      .error-message {
        color: red;
        font-size: 12px;
        font-weight: 400;
        margin: 5px 0 0 5px;
      }

      .duplication-message {
        color: ${({ theme }) => theme.color.primary};
        font-size: 12px;
        font-weight: 400;
        margin-top: 5px;
      }
    }

    .join-form-container.position {
      height: fit-content;

      .position-button-wrap {
        display: flex;
        flex-wrap: wrap;

        button {
          height: 60px;
          margin-right: 10px;
          padding: 16px 10px;
          font-size: 16px;
        }

        button:nth-child(-n + 2) {
          padding: 16px 20px;
          margin-bottom: 8px;
        }

        button:last-child {
          margin: 0;
        }
      }
    }

    .join-button {
      margin-top: 10px;
      border: ${({ $canSubmit }) =>
        $canSubmit ? "none" : "1px solid #d4dcea"};
      background: ${({ $canSubmit }) => ($canSubmit ? "#6ea1ff" : "#ffffff")};
      color: ${({ $canSubmit }) => ($canSubmit ? "#ffffff" : "#D4DCEA")};
      font-size: 18px;
      font-weight: 600;
    }
  }
`;
