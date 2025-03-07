import { ButtonHTMLAttributes, JSX } from "react";
import styled from "styled-components";

export default CategoryButton;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
}

function CategoryButton({ text, onClick }: Props): JSX.Element {
  return (
    <CategoryButtonStyle onClick={onClick}>
      <span>{text}</span>
    </CategoryButtonStyle>
  );
}

const CategoryButtonStyle = styled.button`
  height: 30px;
  border-radius: 15px;
  padding: 5px 10px;

  color: ${({ $isSelected: isSelected }) =>
    isSelected ? "#FFFFFF" : "#D1D1D1"};
  background-color: ${({ $isSelected: isSelected }) =>
    isSelected ? "#6EA1FF" : "#FBFBFB"};
  border: solid 1px
    ${({ $isSelected: isSelected }) => (isSelected ? "#6EA1FF" : "#D1D1D1")};
`;
