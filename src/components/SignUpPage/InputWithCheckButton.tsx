import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import InputField from "../common/Input/Input";
import GrayButton from "../common/Button/GrayButton";
import styled from "styled-components";

interface InputWithCheckButtonProps {
  label: string;
  name: string;
  placeholder: string;
  isUnique: boolean;
  onCheck: () => void;
  register: UseFormRegisterReturn;
  error?: FieldError;
  onChange: () => void;
  successMessage: string;
  maxLength?: number;
}

const InputWithCheckButton: React.FC<InputWithCheckButtonProps> = ({
  label,
  name,
  placeholder,
  isUnique,
  onCheck,
  register,
  error,
  onChange,
  successMessage,
}) => {
  return (
    <InputWithCheckButtonStyle>
      <div className={`${name}-container`}>
        <p className="title">{label}</p>
        <div className={`${name}-input-button-wrap`}>
          <InputField
            autoComplete="off"
            className={`${name}-input`}
            placeholder={placeholder}
            type="text"
            {...register}
            onChange={onChange}
          />
          <GrayButton
            width="110px"
            className={`${name}-check-button ${isUnique ? "checked" : ""}`}
            onClick={onCheck}
            type="button"
          >
            중복확인
          </GrayButton>
        </div>
      </div>
      {error && <span className="error-message">{error.message}</span>}
      {isUnique && (
        <span className="duplication-message">{successMessage}</span>
      )}
    </InputWithCheckButtonStyle>
  );
};

const InputWithCheckButtonStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 115px;
  margin-bottom: 30px;

  .title {
    color: #888888;
    margin-bottom: 10px;
  }

  .email-input-button-wrap {
    display: flex;
    justify-content: space-between;

    .email-input {
      width: 97%;
    }
  }

  .nickname-input-button-wrap {
    display: flex;
    justify-content: space-between;

    .nickname-input {
      width: 97%;
    }
  }

  .error-message {
    color: red;
    font-size: 12px;
    font-weight: 400;
    margin: 5px 0 0 5px;
  }

  .duplication-message {
    color: ${({ theme }) => theme.color.primary};
    font-size: 12px;
    font-weight: 400;
    margin-top: 5px;
  }

  .email-check-button,
  .nickname-check-button {
    height: 60px;
    font-size: 16px;
    padding: 15px 20px;

    &.checked {
      background: #6ea1ff;
      color: #ffffff;
      cursor: default;
    }
  }
`;

export default InputWithCheckButton;
