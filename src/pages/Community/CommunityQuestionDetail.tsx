import styled from "styled-components";
import CommunityList from "../../components/common/List/CommunityList";
import { Link } from "react-router-dom";

const mockData = [
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가말하고있잖아",
    comments: 25,
    level: 5,
    title: "오늘 면접 보고 왔는데요",
    content:
      "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각...",
    views: 315,
    likes: 42,
  },
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가",
    comments: 25,
    level: 5,
    title: "오늘 면접 보고dad 왔는데요",
    content:
      "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각...",
    views: 315,
    likes: 42,
  },
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가말하고있잖아",
    comments: 25,
    level: 5,
    title: "오늘 면접 보고 왔dasdad는데요",
    content:
      "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각...",
    views: 315,
    likes: 42,
  },
];
function CommunityQuestionDetail() {
  return (
    <>
      <QuestionName>
        <h3>
          <span>Q</span> Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Rem quae eveniet commodi, doloremque,
        </h3>
      </QuestionName>
      {mockData.map((item, index) => (
        <Link key={index} to="/answerdetail">
          <CommunityList key={index} {...item} />
        </Link>
      ))}
    </>
  );
}

const QuestionName = styled.div`
  padding: 0 30px;

  h3 {
    background-color: #fbfbfb;
    font-size: 16px;
    font-weight: 400;
    padding: 20px;

    span {
      background-color: #6ea1ff;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      border-radius: 30px;
      display: inline-block;
    }
  }
`;
export default CommunityQuestionDetail;
