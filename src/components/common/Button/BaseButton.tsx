import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  className?: string;
  width?: string;
}

function BaseButton({ children, className, width }: Props) {
  return (
    <BaseButtonStyle width={width} className={className}>
      {children}
    </BaseButtonStyle>
  );
}

const BaseButtonStyle = styled.button<Props>`
  width: ${({ width }) => width || "auto"};
  border: none;
  border-radius: 5px;
  padding: 20px 30px;
`;

export default BaseButton;
