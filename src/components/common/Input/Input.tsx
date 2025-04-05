import styled from "styled-components";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ placeholder, value, onChange }: Props) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

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

export default InputField;
