import styled from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
}

function BaseButton({ children, className, width, ...rest }: Props) {
  return (
    <BaseButtonStyle width={width} className={className} {...rest}>
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
