import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const InputText = React.forwardRef(function InputText(
  { placeholder, type, onChange, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <InputTextStyled
      placeholder={placeholder}
      ref={ref}
      type={type}
      onChange={onChange}
      {...props}
    />
  );
});

const InputTextStyled = styled.input`
  border: 1px solid #ddd;
  background: #fff;
  padding: 15px;
  font-size: 16px;
  color: #333;
  width: 100%;
  height: 60px;
  border-radius: 8px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #6ea1ff;
  }
`;

export default InputText;
