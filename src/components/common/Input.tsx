import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: "text" | "email" | "password";
}

const InputText = React.forwardRef(
  (
    { placeholder, inputType, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyled
        placeholder={placeholder}
        ref={ref}
        type={inputType}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const InputTextStyled = styled.input`
  border: none;
  background: none;
  padding: 15px;
  font-size: 16px;
  color: #ffffff;
  width: 100%;
  height: 60px;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export default InputText;
