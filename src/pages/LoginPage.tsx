import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/Auth.api";
import { Link } from "react-router-dom";
import { FRONTEND_URLS } from "../constants/Urls";
import { GlobalStyle } from "../styles/global";
import { ErrorMessage } from "@hookform/error-message";
import { PASSWORD_MIN_LENGTH } from "../constants/Auth";

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

  return (
    <>
      <GlobalStyle />
      <LoginPageStyle>
        <p className="main-title">
          함께하는 면접, <br />
          합격까지 한걸음 더!
        </p>
        <span className="sub-title">
          인터뷰잇 서비스 이용을 위해 로그인 해주세요.
        </span>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-form">
            <div className="login-form__container">
              <input
                placeholder="이메일 입력"
                type="email"
                className={
                  errors.email === undefined
                    ? "login-form__input"
                    : "login-form__error-input"
                }
                {...register("email", {
                  required: { value: true, message: "이메일을 입력해주세요." },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "유효한 이메일 형식이 아닙니다.",
                  },
                  maxLength: {
                    value: 50,
                    message: "이메일은 50자 이하로 입력해주세요.",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <span className="error-message">{message}</span>
                )}
              />
            </div>
            <div className="login-form__container">
              <input
                placeholder="비밀번호 입력"
                type="password"
                className={
                  errors.password === undefined
                    ? "login-form__input"
                    : "login-form__error-input"
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
            <div className="login-form__column">
              <span>아이디 찾기</span>
              <span>비밀번호 찾기</span>
              <Link to={FRONTEND_URLS.SIGNUP}>
                <span>회원가입</span>
              </Link>
            </div>
          </div>
          <button type="submit" className="login-form__btn">
            로그인
          </button>
        </form>
      </LoginPageStyle>
    </>
  );
}

const LoginPageStyle = styled.div`
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

  .login-form {
    margin-top: 100px;
  }

  .login-form__container {
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

  .login-form__input {
    border: none;
    padding: 15px;
    font-size: 16px;
    border-bottom: 1px solid #ffffff;
    margin-bottom: 20px;
    background-color: #6ea1ff;
    color: #ffffff;
    width: 100%;
  }

  .login-form__input:focus {
    outline: none;
    border-bottom: 2px solid #ffffff;
  }

  .login-form__error-input {
    border: none;
    padding: 15px;
    font-size: 16px;
    border-bottom: 1px solid red;
    margin-bottom: 20px;
    background-color: #6ea1ff;
    color: #ffffff;
    width: 100%;
  }

  .login-form__error-input:focus {
    outline: none;
    border-bottom: 2px solid red;
  }

  .login-form__column {
    display: flex;
    font-size: 10px;
    color: #ffffff;
    justify-content: flex-end;
    margin-top: 5px;
  }

  .login-form__column span {
    border-right: 1px solid #ffffff;
    color: #ffffff;

    padding: 0 10px;
  }

  .login-form__column span:last-child {
    border-right: 0px;
    padding: 0 0 0 10px;
  }

  .login-form__btn {
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
`;
