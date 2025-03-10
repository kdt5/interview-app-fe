import styled from "styled-components";
import ButtonWhite from "../components/common/ButtonWhite";

function MyPage() {
  return (
    <>
      <MyPageStyle>
        <div className="profile-wrap">
          <div className="profile-icon"></div>
          <div>
            <h1>NickName_Wrap</h1>
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

      <MyPageStyle>
        <button>회원 정보 수정</button>
        <button>로그아웃</button>
      </MyPageStyle>
    </>
  );
}

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

  .btn2 {
    margin-bottom: 10px;
  }
`;

export default MyPage;
