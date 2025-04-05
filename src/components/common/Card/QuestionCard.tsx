import styled from "styled-components";

interface Props {
  category: string;
  title: string;
}

function QuestionCard({ category, title }: Props) {
  return (
    <>
      <QuestionCardStyle>
        <QuestionCardHead>
          <h2>면접 필수 질문</h2>
          <QuestionLink>전체보기</QuestionLink>
        </QuestionCardHead>
        <ul>
          <QuestionList>
            <QuestionIcon></QuestionIcon>
            <QuestionContents>
              <span>{category}</span>
              <p>{title}</p>
            </QuestionContents>
          </QuestionList>
        </ul>
      </QuestionCardStyle>
    </>
  );
}

const QuestionCardStyle = styled.div`
  width: auto;
  height: fit-content;
  padding: 15px 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 20px #a8a8a866;
  box-sizing: border-box;
  margin: 0 30px;
`;

const QuestionCardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const QuestionLink = styled.a`
  background-color: #f4f4f4;
  color: #333;
  padding: 5px 10px;
  border-radius: 30px;
  display: block;
`;

const QuestionList = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionIcon = styled.img`
  display: block;
  width: 45px;
  height: 45px;
  background-color: #ccc;
  border-radius: 35px;
`;

const QuestionContents = styled.div`
  width: 80%;
  span {
    color: #888;
    font-weight: 300 !important;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export default QuestionCard;
