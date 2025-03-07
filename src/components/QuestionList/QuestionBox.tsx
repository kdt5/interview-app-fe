import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { Question } from "../../models/Question.model";
import { Link } from "react-router-dom";

export default QuestionBox;

interface Props {
  question: Question;
}

function QuestionBox({ question }: Props) {
  return (
    <ContentBoxStyle className="question">
      <Link className="question-link" to={`/question/${question.id}`}>
        <div className="content">
          <img src={`/assets/categories/${question.categoryId}.img`} />
          <span>{question.title}</span>
        </div>
        <SlArrowRight className="icon-goto" />
      </Link>
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

  .question-link {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 1.225rem 1.5rem;

    color: inherit;
    text-decoration: none;

    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: row;

    padding-right: 1rem;

    gap: 1rem;
  }

  .icon-goto {
    width: 15px;
    height: 15px;
    min-width: 15px;
    min-height: 15px;
  }
`;
