import styled from "styled-components";
import BaseButton from "./BaseButton";

function GrayButton({
  children,
  className,
  width,
}: React.ComponentProps<typeof BaseButton>) {
  return (
    <GrayButtonStyle width={width} className={className}>
      {children}
    </GrayButtonStyle>
  );
}

const GrayButtonStyle = styled(BaseButton)`
  background-color: #f2f2f2;
  color: #888;

  &.check {
    background-color: #6ea1ff;
    color: #fff;
  }
`;

export default GrayButton;
