import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function GrayButton({ children, className }: Props) {
  return (
    <>
      <GrayButtonStyle className={className}>{children}</GrayButtonStyle>
    </>
  );
}

const GrayButtonStyle = styled.button<Omit<Props, "children">>`
  border: none;
  background-color: #f2f2f2;
  color: #888;
  border-radius: 5px;
  padding: 20px 30px;

  &.check {
    background-color: #6ea1ff;
    color: #fff;
  }
`;

export default GrayButton;
