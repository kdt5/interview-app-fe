import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function LightGrayButton({ children, className }: Props) {
  return (
    <>
      <LightGrayButtonStyle className={className}>
        {children}
      </LightGrayButtonStyle>
    </>
  );
}

const LightGrayButtonStyle = styled.button<Omit<Props, "children">>`
  border: none;
  background-color: #fbfbfb;
  color: #ccc;
  border-radius: 5px;
  padding: 20px 30px;
  border: solid 1px #f2f2f2;

  &.check {
    border: solid 1px #6ea1ff;
    color: #6ea1ff;
  }
`;

export default LightGrayButton;
