import styled from "styled-components";
import ButtonWhite from "../components/common/ButtonWhite";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/UseUser";
import { FRONTEND_URLS } from "../constants/Urls";

function MyPage() {
  const { me } = useUser();

  return (
    <>
      <MyPageStyle>
        <div className="profile-wrap">
          <div className="profile-icon"></div>
          <div>
            <h1>{me?.nickname}</h1>
            <span>Ranking</span>
          </div>
        </div>
      </MyPageStyle>

      <MyPageStyle>
        <p className="menu-title">모아보기</p>
        <Link className="link" to={FRONTEND_URLS.MY_PAGE.ANSWERS}>
          <ButtonWhite>내 답변 모아보기</ButtonWhite>
        </Link>
        <Link className="link" to={FRONTEND_URLS.MY_PAGE.FAVORITES.QUESTIONS}>
          <ButtonWhite>즐겨찾기 질문 모아보기</ButtonWhite>
        </Link>
      </MyPageStyle>

      <MyPageStyle>
        <p className="menu-title">랭킹</p>
        <ButtonWhite>내 랭킹 보러가기</ButtonWhite>
      </MyPageStyle>

      <UserMenuStyle>
        <Link to={FRONTEND_URLS.SETTINGS.PROFILE}>회원 정보 수정</Link>
        <button>로그아웃</button>
      </UserMenuStyle>
    </>
  );
}

const UserMenuStyle = styled.div`
  padding: 25px 30px;
  a,
  button {
    width: 100%;
    text-align: center;
  }

  a {
    display: block;
    background: #6ea1ff;
    color: #fff;
    border-radius: 10px;
    border: solid 1px #fff;
    padding: 15px 20px;
    line-height: 1;
    margin-bottom: 10px;
  }

  button {
    background: #fff;
    color: #6ea1ff;
    border-radius: 10px;
    border: solid 1px #6ea1ff;
    cursor: pointer;
    width: 100%;
    padding: 15px 20px;
    line-height: 1;
    font-size: 16px;
  }
`;

const MyPageStyle = styled.div`
  width: 100%;
  border-bottom: 5px solid #fafafa;
  padding: 25px 30px;

  .profile-wrap {
    display: flex;
    align-items: center;
    justify-content: left;

    .profile-icon {
      width: 60px;
      height: 60px;
      border-radius: 50px;
      background-color: #ccc;
      margin-right: 15px;
    }

    div {
      span {
        color: #fff;
        background-color: #6ea1ff;
        padding: 5px 10px;
        border-radius: 15px;
      }
    }
  }

  .menu-title {
    margin-bottom: 10px;
  }
`;

export default MyPage;
