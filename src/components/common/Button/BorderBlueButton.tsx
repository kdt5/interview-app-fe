import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function BorderBlueButton({ children, className }: Props) {
  return (
    <>
      <BorderBlueButtonStyle className={className}>
        {children}
      </BorderBlueButtonStyle>
    </>
  );
}

const BorderBlueButtonStyle = styled.button<Omit<Props, "children">>`
  border: none;
  background-color: #fff;
  color: #d4dcea;
  border-radius: 5px;
  padding: 20px 0;
  border: solid 1px #d4dcea;
  width: 100%;

  &.check {
    border: solid 1px #6ea1ff;
    color: #fff;
    background-color: #6ea1ff;
  }
`;

export default BorderBlueButton;
