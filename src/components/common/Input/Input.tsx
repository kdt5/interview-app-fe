import React, { useState } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type: string;
}

const InputField = ({ placeholder, type, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <InputWrapper>
      <StyledInput
        placeholder={placeholder}
        type={type === "password" && !showPassword ? "password" : "text"}
        {...rest}
      />
      {type === "password" && (
        <ToggleButton type="button" onClick={togglePasswordVisibility}>
          <img
            src={showPassword ? "../public/Eye.png" : "../public/Invisible.png"}
            alt={showPassword ? "Hide password" : "Show Password"}
          />
        </ToggleButton>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 20px 15px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #f7f7f7;
  color: #333;
  border: 1px solid transparent;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: #6ea1ff;
    background-color: #fbfbfb;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

export default InputField;
