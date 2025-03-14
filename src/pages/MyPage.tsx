import styled from "styled-components";
import ButtonWhite from "../components/common/ButtonWhite";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/MyPageMemberInfo.api";
import { Link } from "react-router-dom";

function MyPage() {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile()
      .then((user) => {
        setNickname(user.nickname);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <>
      <MyPageStyle>
        <div className="profile-wrap">
          <div className="profile-icon"></div>
          <div>
            <h1>{nickname ? nickname : "닉네임을 등록하세용"}</h1>
            <span>Ranking</span>
          </div>
        </div>
      </MyPageStyle>

      <MyPageStyle>
        <p className="menu-title">모아보기</p>
        <ButtonWhite>내 답변 모아보기</ButtonWhite>
        <ButtonWhite>즐겨찾기 질문 모아보기</ButtonWhite>
      </MyPageStyle>

      <MyPageStyle>
        <p className="menu-title">랭킹</p>
        <ButtonWhite>내 랭킹 보러가기</ButtonWhite>
      </MyPageStyle>

      <UserMenuStyle>
        <Link to="">회원 정보 수정</Link>
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
