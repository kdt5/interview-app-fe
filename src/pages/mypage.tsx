import styled from "styled-components";
import ButtonWhite from "../components/common/button_wh";

function Mypage() {
    return (
        <>
           <MyPageBox>
                <div className="profile-wrap">
                    <div className="profile-icon"></div>
                    <div>
                        <h1>NickName_Wrap</h1>
                        <span>Ranking</span>
                    </div>
                </div>
           </MyPageBox>

           <MyPageBox>
                <p className="menu-title">모아보기</p>
                <ButtonWhite>내 답변 모아보기</ButtonWhite>
                <ButtonWhite>즐겨찾기 질문 모아보기</ButtonWhite>
           </MyPageBox>

           <MyPageBox>
                <p className="menu-title">랭킹</p>
                <ButtonWhite>내 랭킹 보러가기</ButtonWhite>
           </MyPageBox>

           <MyPageBox>
                <div className="btn2">
                    회원 정보 수정
                </div>
                <div className="btn1">
                    로그아웃
                </div>
           </MyPageBox>
      
        </>
    )
}

const MyPageBox = styled.div`
    width: 100%;
    border-bottom: 5px solid #FAFAFA;
    padding: 25px 30px;

    .profile-wrap{
        display: flex;
        align-items: center;
        justify-content: left;

        .profile-icon{
            width: 60px;
            height: 60px;
            border-radius: 50px;
            background-color: #ccc;
            margin-right: 15px;
        }

        div{
            span{
                color: #FFF;
                background-color: #6EA1FF;
                padding: 5px 10px;
                border-radius: 15px;
            }
        }
    }

    .menu-title{
        margin-bottom: 10px;
    }

    .btn2{
        margin-bottom: 10px;
    }


`

export default Mypage;