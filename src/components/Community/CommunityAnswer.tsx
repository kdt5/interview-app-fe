import styled from "styled-components";
import CommonProfile from "../../components/common/Profile/CommonProfile";
import ViewerImg from "../../assets/Viewer.png";

interface Props {
  category: string;
  questiontitle: string;
  answer: string;
  viewscount: number;
  likescount: number;
}

const ProfileData = [
  {
    profileImg: "https://via.placeholder.com/40",
    username: "내가말하고있잖아",
    comments: 25,
    level: 5,
  },
];

function CommunityAnswer({
  category,
  questiontitle,
  answer,
  viewscount,
  likescount,
}: Props) {
  return (
    <>
      <AnswerDetail>
        <AnswerCategory>{category}</AnswerCategory>
        <QuestionTitle>{questiontitle}</QuestionTitle>
        <AnswerContents>{answer}</AnswerContents>
        <QuestionLike>
          <span>
            {" "}
            <img src={ViewerImg} alt="Viewer Icon" />
            {viewscount}명이 봤어요
          </span>{" "}
          | <span>좋아요 {likescount}</span>
        </QuestionLike>
      </AnswerDetail>
      <AnswerDetailProfile>
        {ProfileData.map((item, index) => (
          <CommonProfile key={index} {...item} />
        ))}
      </AnswerDetailProfile>
    </>
  );
}

const AnswerDetail = styled.div`
  margin-bottom: 15px;
`;

const AnswerCategory = styled.div`
  background-color: #6ea1ff;
  color: #fff;
  font-size: 14px;
  font-weight: 200;
  padding: 8px 15px;
  text-align: center;
  border-radius: 10px;
  display: inline-block;
`;

const QuestionTitle = styled.h3`
  font-size: 18px;
  color: #333;
  font-weight: 600px;
  margin-top: 20px;
`;

const AnswerContents = styled.p`
  color: #888;
  font-size: 14px;
  font-weight: 300;
  margin-top: 10px;
  line-height: 1.5;
`;

const QuestionLike = styled.div`
  margin-top: 50px;
  color: #888;
  span {
    color: #888;
    font-size: 12px;
    font-weight: 300px;

    img {
      display: inline-block;
      margin-right: 3px;
    }
  }
`;

const AnswerDetailProfile = styled.div`
  background-color: #fbfbfb;
  padding: 15px;
`;
export default CommunityAnswer;
