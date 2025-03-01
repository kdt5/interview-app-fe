import styled from "styled-components";
import HomeImg from '../assets/home-img.png'
import { SlArrowRight } from "react-icons/sl";

function Home() {
    return (
        <>
            <HomeStyle>
                <div className="main-title">
                    <h1>이번주 새로운<br />면접질문이 도착했어요</h1>
                    <div>
                        <img src={HomeImg} alt="" />
                    </div>
                </div>
                <div className="weekly-q">
                    <p>Javascript에서 var, let, const의 역할과<br />각각의 차이점은 무엇일까요?</p>
                    <div>
                        <span>Front-end</span>
                        <span>Javascript</span>
                    </div>
                </div>

                <div className="interview-essential-wrap">
                    <div className="contents-title">
                        <span>추천 질문</span>
                        <p>면접 필수 질문</p>
                    </div>      
                    <div className="interview-essential">
                        <div className="box">
                            <p>프론트엔드 개발자<br />필수 질문 리스트</p>
                            <span>지금 답변하기 <SlArrowRight /></span>
                        </div>
                        <div className="box">
                            <p>백엔드 개발자<br />필수 질문 리스트</p>
                            <span>지금 답변하기 <SlArrowRight /></span>
                        </div>
                    </div>
                </div>
            </HomeStyle>

        </>
    )
}

const HomeStyle = styled.main`
    width: 100%;
    padding: 0 30px;

    .main-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .weekly-q{
        background-color: #6EA1FF;
        padding: 20px;
        border-radius: 10px;

        p{
            color: #FFF;
            width: 100%;
            margin-bottom: 30px;
        }

        span{
            background-color: #BBD3FF;
            color: #FFF;

            font-size: 12px;
            font-weight: 300;

            border-radius: 15px;

            display: inline-block;
            margin: 0 5px 0 0;
            padding: 3px 10px;        
        }
    }

    .interview-essential-wrap{
        margin-top: 50px;

        .contents-title{
            margin-bottom: 10px;

            span{
                color: #6EA1FF;
                font-weight: 400;
            }
        }

        .interview-essential{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            div{
                width: 50%;
                padding: 15px;

                p{
                    margin-bottom: 30px;
                }

                span{
                    font-weight: 400;
                    color: #6EA1FF;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    svg{
                        path{
                            color: #6EA1FF;
                        }
                    }
                }
            }
        }
    }
`;

export default Home;