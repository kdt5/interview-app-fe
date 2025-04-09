import styled from "styled-components";
import BaseButton from "./BaseButton";

function LightGrayButton({
  children,
  className,
  width,
}: React.ComponentProps<typeof BaseButton>) {
  return (
    <>
      <LightGrayButtonStyle width={width} className={className}>
        {children}
      </LightGrayButtonStyle>
    </>
  );
}

const LightGrayButtonStyle = styled(BaseButton)`
  background-color: #fbfbfb;
  color: #ccc;
  border: solid 1px #f2f2f2;

  &.check {
    border: solid 1px #6ea1ff;
    color: #6ea1ff;
  }
`;

export default LightGrayButton;
