import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { Question } from "../../models/Question.model";

export default QuestionBox;

interface Props {
  question: Question;
}

function QuestionBox({ question }: Props) {
  return (
    <ContentBoxStyle>
      <a href={`/question/${question.id}`}>
        <div className="content">
          <img src={`./assets/categories/${question.categoryId}.img`} />
          <span>{question.title}</span>
        </div>
        <SlArrowRight />
      </a>
    </ContentBoxStyle>
  );
}

const ContentBoxStyle = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 60px;
  background-color: #fbfbfb;
  border: solid 1px #eff2f8;
  border-radius: 10px;

  a {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 1.225rem 1.5rem;

    color: inherit;
    text-decoration: none;
  }

  .content {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .content img {
    height: 19px;
    width: 19px;
  }
`;
