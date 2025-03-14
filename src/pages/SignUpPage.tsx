import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../api/User.api";

export interface JoinProps {
  email: string;
  password: string;
  nickName: string;
}

function SignUpPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<JoinProps>();

  const onSubmit = (data: JoinProps) => {
    signup(data).then(() => {
      navigate("/login");
    });
  };

  return (
    <LayoutStyle>
      <p className="main-title">
        함께하는 면접, <br />
        합격까지 한걸음 더!
      </p>

      <span className="sub-title">인터뷰잇 회원이 아니시라면?</span>
      <form className="join-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="join-form__container">
          <input
            placeholder="이메일 입력"
            type="email"
            className="join-form__input"
            {...register("email", { required: true })}
          ></input>

          <div className="join-form__container-btn">
            <button className="join-form__btn-chk">중복 확인</button>
          </div>
        </div>

        <input
          placeholder="비밀번호 입력"
          type="password"
          className="join-form__input"
          {...register("password", { required: true })}
        ></input>

        <div className="join-form__container">
          <input
            placeholder="닉네임 입력"
            type="text"
            className="join-form__input"
            {...register("nickName", { required: true })}
          ></input>
          <div className="join-form__container-btn">
            <button className="join-form__btn-chk">중복 확인</button>
          </div>
        </div>
        <button type="submit" className="join-form__btn">
          회원가입
        </button>
      </form>
    </LayoutStyle>
  );
}

export default SignUpPage;
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
  .join-form {
    margin-top: 100px;
  }

  .join-form__input {
    border: none;
    padding: 15px;
    font-size: 20px;
    border-bottom: 1px solid #ffffff;
    margin-bottom: 15px;
    background-color: #6ea1ff;
    color: #ffffff;
    opacity: 0.6;
    width: 100%;
    height: 60px;
  }

  .join-form__input:focus {
    outline: none;
    border-bottom: 2px solid #ffffff;
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

  .join-form__container {
    display: flex;
    position: relative;
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
    border-radius: 15px;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ffffff;
    background: #ffffff;
    color: #6ea1ff;
    font-size: 14px;
    font-weight: 600;
  }
`;
