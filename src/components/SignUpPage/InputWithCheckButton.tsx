import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import InputField from "../common/Input/Input";
import GrayButton from "../common/Button/GrayButton";

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
    <div className="join-form-container">
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
    </div>
  );
};

export default InputWithCheckButton;
