import { RegisterOptions, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/Auth.api";
import { Link } from "react-router-dom";
import { FRONTEND_URLS } from "../constants/Urls";
import { GlobalStyle } from "../styles/global";
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

  const checkPassword: RegisterOptions<LoginInputs, "password"> = {
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
          <div className="login-form__container">
            <div className="login-form__input-container">
              <InputText
                autoComplete="off"
                placeholder="이메일 입력"
                type="email"
                {...register("email", checkEmail)}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <span className="error-message">{message}</span>
              )}
            />
          </div>
          <div className="login-form__container">
            <div className="login-form__input-container">
              <InputText
                autoComplete="off"
                placeholder="비밀번호 입력"
                type="password"
                {...register("password", checkPassword)}
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
          <div className="login-form__column">
            <span className="id-find-btn">아이디 찾기</span>
            <div className="mid-line"></div>
            <span className="pass-find-btn">비밀번호 찾기</span>
            <div className="mid-line"></div>
            <Link to={FRONTEND_URLS.SIGNUP}>
              <span className="join-btn">회원가입</span>
            </Link>
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
  padding: 180px 30px 120px 30px;
  background-color: #6ea1ff;

  form {
    margin-top: 130px;
  }

  .main-title {
    color: #ffffff;
    font-weight: 600;
    font-size: 30px;
    line-height: 1.3;
    margin-bottom: 15px;
  }

  .sub-title {
    color: #ffffff;
    font-size: 15px;
    font-weight: 200;
  }

  .login-form {
    margin-top: 60px;
  }

  .login-form__container {
    height: 85px;

    .login-form__input-container {
      border-bottom: 1px solid #fff;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin: 5px 0 0 5px;
    }
  }

  .login-form__column {
    display: flex;
    font-size: 10px;
    color: #ffffff;
    justify-content: flex-end;
    margin-top: 15px;

    .mid-line {
      width: 1px;
      height: 16px;
      background-color: #fff;
    }

    .id-find-btn,
    .pass-find-btn,
    .join-btn {
      font-weight: 300;
      color: #ffffff;
      padding: 0 10px;
    }

    .join-btn {
      padding-right: 0;
    }
  }

  .login-form__btn {
    margin-top: 130px;
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
