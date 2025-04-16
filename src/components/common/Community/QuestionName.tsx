import styled from "styled-components";

function QuestionName() {
  return (
    <>
      <QuestionNameStyle>
        <span>Q</span>

        <Question>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quae
          eveniet commodi, doloremque,
        </Question>
      </QuestionNameStyle>
    </>
  );
}

const QuestionNameStyle = styled.div`
  height: fit-content;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;

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
    display: block;
  }
`;

const Question = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  width: calc(100% - 35px);
`;

export default QuestionName;
