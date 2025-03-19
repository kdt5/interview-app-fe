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
    formState: { isValid, errors },
  } = useForm<SignUpInputs>();
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  const onClickEmailCheck = (email: string) => {
    if (!isValid) {
      return;
    }

    checkEmailExists(email).then((exists) => {
      if (exists) {
        setIsEmailAvailable(true);
      }
    });
  };

  const onClickNicknameCheck = (nickname: string) => {
    if (!isValid) {
      return;
    }

    checkNicknameExists(nickname).then((exists) => {
      if (exists) {
        setIsNicknameAvailable(true);
      }
    });
  };

  const onChangeEmail = () => {
    if (isEmailAvailable) {
      setIsEmailAvailable(false);
    }
  };

  const onChangeNickname = () => {
    if (isNicknameAvailable) {
      setIsNicknameAvailable(false);
    }
  };

  const onSubmit = (data: SignUpInputs) => {
    signUp(data).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <GlobalStyle />
      <SignUpPageStyle>
        <p className="main-title">
          함께하는 면접, <br />
          합격까지 한걸음 더!
        </p>

        <span className="sub-title">인터뷰잇 회원이 아니시라면?</span>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="join-form__container">
            <input
              placeholder="이메일 입력"
              type="email"
              className={
                errors.email === undefined
                  ? "join-form__input"
                  : "join-form__error-input"
              }
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
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
            {isEmailAvailable && (
              <span className="valid-message">사용 가능한 이메일입니다.</span>
            )}
            <div className="join-form__container-btn">
              <button
                className="join-form__btn-chk"
                onClick={() => onClickEmailCheck(getValues("email"))}
              >
                중복 확인
              </button>
            </div>
          </div>
          <div className="join-form__container">
            <input
              placeholder="비밀번호 입력"
              type="password"
              className={
                errors.password === undefined
                  ? "join-form__input"
                  : "join-form__error-input"
              }
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
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
          </div>
          <div className="join-form__container">
            <input
              placeholder="닉네임 입력"
              type="text"
              className={
                errors.nickname === undefined
                  ? "join-form__input"
                  : "join-form__error-input"
              }
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
            <ErrorMessage
              errors={errors}
              name="nickname"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
            {isNicknameAvailable && (
              <span className="valid-message">사용 가능한 닉네임입니다.</span>
            )}
            <div className="join-form__container-btn">
              <button
                className="join-form__btn-chk"
                onClick={() => onClickNicknameCheck(getValues("nickname"))}
              >
                중복 확인
              </button>
            </div>
          </div>
          <button type="submit" className="join-form__btn">
            회원가입
          </button>
        </form>
      </SignUpPageStyle>
    </>
  );
}

const SignUpPageStyle = styled.div`
  width: 100%;
  max-width: 380px;
  height: 100dvh;
  margin: 0 auto;
  padding: 200px 30px;
  background-color: #6ea1ff;

  .main-title {
    color: #ffffff;
    font-weight: 600;
    font-size: 30px;
  }

  .sub-title {
    color: #ffffff;
    font-size: 16px;
  }

  .join-form {
    margin-top: 100px;
  }

  .join-form__container {
    display: flex;
    position: relative;

    .error-message {
      color: red;
      font-size: 12px;
      position: absolute;
      bottom: 0px;
      left: 10px;
    }

    .valid-message {
      color: green;
      font-size: 12px;
      position: absolute;
      bottom: 0px;
      left: 10px;
    }
  }

  .join-form__input {
    border: none;
    padding: 15px;
    font-size: 16px;
    border-bottom: 1px solid #ffffff;
    margin-bottom: 20px;
    background-color: #6ea1ff;
    color: #ffffff;
    width: 100%;
    height: 60px;
  }

  .join-form__input:focus {
    outline: none;
    border-bottom: 2px solid #ffffff;
  }

  .join-form__error-input {
    border: none;
    padding: 15px;
    font-size: 16px;
    border-bottom: 1px solid red;
    margin-bottom: 20px;
    background-color: #6ea1ff;
    color: #ffffff;
    width: 100%;
  }

  .join-form__error-input:focus {
    outline: none;
    border-bottom: 2px solid red;
  }

  .join-form__btn {
    margin-top: 120px;
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
    cursor: pointer;
    font-weight: 600;
  }

  .join-form__container-btn {
    position: absolute;
    top: 5px;
    bottom: 5px;
    right: 5px;
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
