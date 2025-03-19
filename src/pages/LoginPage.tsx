import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/Auth.api";

export interface LoginProps {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    login(data).then(() => {
      navigate("/");
    });
  };

  return (
    <LayoutStyle>
      <p className="main-title">
        함께하는 면접, <br />
        합격까지 한걸음 더!
      </p>
      <span className="sub-title">
        인터뷰잇 서비스 이용을 위해 로그인 해주세요.
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form">
          <input
            placeholder="아이디 입력"
            type="text"
            className="login-form__input"
            {...register("email", { required: true })}
          ></input>
          <input
            placeholder="비밀번호 입력"
            type="password"
            className="login-form__input"
            {...register("password", { required: true })}
          ></input>
          <div className="login-form__column">
            <span>아이디 찾기</span>
            <span>비밀번호 찾기</span>
            <span>회원가입</span>
          </div>
        </div>
        <button type="submit" className="login-form__btn">
          로그인
        </button>
      </form>
    </LayoutStyle>
  );
}

export default LoginPage;

const LayoutStyle = styled.div`
  width: 100%;
  max-width: 380px;
  height: 100dvh;
  margin: 0 auto;
  padding: 200px 30px;
  background-color: #6ea1ff;

  .main-title {
    color: #ffffff;
    font-weight: 600;
    font-size: 25px;
  }

  .sub-title {
    color: #ffffff;
    font-size: 15px;
  }
  .login-form {
    margin-top: 100px;
  }

  .login-form__input {
    border: none;
    padding: 15px;
    font-size: 13px;
    border-bottom: 1px solid #ffffff;
    margin-bottom: 15px;
    background-color: #6ea1ff;
    color: #ffffff;
    opcity: 0.6;
    width: 100%;
    fouce {
    }
  }

  .login-form__input:focus {
    outline: none;
    border-bottom: 2px solid #ffffff;
  }

  .login-form__column {
    display: flex;
    font-size: 10px;
    color: #ffffff;
    opcity: 0.6;
    justify-content: flex-end;
  }

  .login-form__column span {
    border-right: 1px solid #ffffff;

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
