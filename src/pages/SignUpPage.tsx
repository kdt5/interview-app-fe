import { useForm } from "react-hook-form";
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
} from "../constants/Auth";
import { useState } from "react";
import ConfirmModal from "../components/common/ConfirmModal";
import AlertModal from "../components/common/AlertModal";
export default SignUpPage;

export interface SignUpInputs {
  email: string;
  password: string;
  nickname: string;
}

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
  const [isModalVisible, setIsModalVisible] = useState({
    confirm: false,
    alert: false,
  });
  const canSubmit = isValid && isEmailUnique && isNicknameUnique;

  const onClickEmailCheck = async (email: string) => {
    await trigger("email");

    if (errors.email !== undefined) {
      return;
    }

    checkEmailExists(email)
      .then((exists) => {
        if (!exists) {
          setIsEmailUnique(true);
        } else {
          setError("email", {
            type: "manual",
            message: "중복된 이메일입니다.",
          });
        }
      })
      .catch((error) => {
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
      .then((exists) => {
        if (!exists) {
          setIsNicknameUnique(true);
        } else {
          setError("nickname", {
            type: "manual",
            message: "중복된 닉네임입니다.",
          });
        }
      })
      .catch((error) => {
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

    signUp(data)
      .then(() => {
        navigate("/login");
      })
      .then(() => {
        setIsModalVisible({ confirm: false, alert: true });
      });
  };

  return (
    <>
      <GlobalStyle />
      <SignUpPageStyle $canSubmit={canSubmit}>
        <p className="main-title">
          함께하는 면접, <br />
          합격까지 한걸음 더!
        </p>
        <span className="sub-title">인터뷰잇 회원이 아니시라면?</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="join-form"
        >
          <div className="join-form__container">
            <div className="join-form__input-container">
              <input
                placeholder="이메일 입력"
                type="email"
                className="join-form__input"
                {...register("email", {
                  required: { value: true, message: "이메일을 입력해주세요." },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "유효한 이메일 형식이 아닙니다.",
                  },
                  maxLength: {
                    value: EMAIL_MAX_LENGTH,
                    message: `이메일은 ${EMAIL_MAX_LENGTH}자 이하로 입력해주세요.`,
                  },
                  onChange: onChangeEmail,
                })}
              />
              <div className="join-form__container-btn">
                <button
                  className="join-form__btn-chk"
                  onClick={() => onClickEmailCheck(getValues("email"))}
                  type="button"
                >
                  중복 확인
                </button>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
            {isEmailUnique && (
              <span className="duplication-message">
                사용 가능한 이메일입니다.
              </span>
            )}
          </div>
          <div className="join-form__container">
            <div className="join-form__input-container">
              <input
                placeholder="비밀번호 입력"
                type="password"
                className="join-form__input"
                {...register("password", {
                  required: {
                    value: true,
                    message: "비밀번호를 입력해주세요.",
                  },
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상입니다.`,
                  },
                })}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
          </div>
          <div className="join-form__container">
            <div className="join-form__input-container">
              <input
                placeholder="닉네임 입력"
                type="text"
                className="join-form__input"
                {...register("nickname", {
                  required: {
                    value: true,
                    message: "닉네임을 입력해주세요.",
                  },
                  minLength: {
                    value: NICKNAME_MIN_LENGTH,
                    message: `닉네임은 ${NICKNAME_MIN_LENGTH}자 이상 ${NICKNAME_MAX_LENGTH}자 이하입니다`,
                  },
                  maxLength: {
                    value: NICKNAME_MAX_LENGTH,
                    message: `닉네임은 ${NICKNAME_MIN_LENGTH}자 이상 ${NICKNAME_MAX_LENGTH}자 이하입니다`,
                  },
                  onChange: onChangeNickname,
                })}
              />
              <div className="join-form__container-btn">
                <button
                  className="join-form__btn-chk"
                  type="button"
                  onClick={() => onClickNicknameCheck(getValues("nickname"))}
                >
                  중복 확인
                </button>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="nickname"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
            {isNicknameUnique && (
              <span className="duplication-message">
                사용 가능한 닉네임입니다.
              </span>
            )}
          </div>
          <button
            type="button"
            className="join-form__btn"
            disabled={!canSubmit}
            onClick={() =>
              setIsModalVisible((prev) => ({ ...prev, confirm: true }))
            }
          >
            회원가입
          </button>
          {isModalVisible.confirm && (
            <ConfirmModal
              onClose={() => {
                setIsModalVisible((prev) => ({ ...prev, alert: false }));
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
  width: 100%;
  max-width: 380px;
  height: 100dvh;
  margin: 0 auto;
  padding: 180px 30px 120px 30px;
  background-color: #6ea1ff;

  .main-title {
    color: #ffffff;
    font-weight: 600;
    font-size: 30px;
    line-height: 1.3;
    margin-bottom: 5px;
  }

  .sub-title {
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;
  }

  .join-form {
    margin-top: 60px;
  }

  .join-form__container {
    display: flex;
    flex-direction: column;
    height: 85px;

    .join-form__input-container {
      display: flex;
      border-bottom: 1px solid #ffffff;
    }

    .join-form__input-container.error-email,
    .join-form__input-container.error-nickname {
      border-bottom: 1px solid red;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin: 5px 0 0 5px;
    }

    .duplication-message {
      color: green;
      font-size: 12px;
      margin-top: 5px;
    }
  }

  .join-form__input {
    border: none;
    background: none;
    padding: 15px;
    font-size: 16px;
    color: #ffffff;
    width: 100%;
    height: 60px;
  }

  .join-form__input:focus {
    outline: none;
  }

  .join-form__btn {
    margin-top: 80px;
    width: 330px;
    height: 60px;
    font-size: 20px;
    background: #ffffff;
    color: #6ea1ff;
    border-radius: 10px;
    border: solid 1px #fff;
    padding: 15px 20px;
    text-align: center;
    line-height: 1;
    opacity: ${(props) => (props.$canSubmit ? 1 : 0.5)};
    cursor: ${(props) => (props.$canSubmit ? "pointer" : "not-allowed")};
    font-weight: 600;
  }

  .join-form__btn-chk {
    width: 100px;
    height: 45px;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ffffff;
    background: #ffffff;
    color: #6ea1ff;
    font-size: 16px;
    font-weight: 400;
    padding: 15px 10px;
  }
`;
