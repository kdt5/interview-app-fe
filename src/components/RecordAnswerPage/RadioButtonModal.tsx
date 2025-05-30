import styled from "styled-components";

type VisibilityOption = "공개" | "비공개";

interface Props {
  visibility: VisibilityOption | null;
  onClose?: () => void;
  onChange?: (value: VisibilityOption) => void;
}

function RadioButtonModal({ visibility, onClose, onChange }: Props) {
  const handleOptionChange = (value: VisibilityOption) => {
    onChange?.(value);
    onClose?.();
  };

  return (
    <>
      <BackDrop onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <div className="radio-group">
            <label className="radio-label">
              <input
                name="visibility"
                type="radio"
                value="공개"
                checked={visibility === "공개"}
                onChange={() => handleOptionChange("공개")}
              />
              답변 공개
            </label>
            <label className="radio-label">
              <input
                name="visibility"
                type="radio"
                value="비공개"
                checked={visibility === "비공개"}
                onChange={() => handleOptionChange("비공개")}
              />
              답변 비공개
            </label>
            <p className="info-text">
              * 답변 공개 여부는 추후 수정이 불가능합니다.
            </p>
          </div>
        </ModalContainer>
      </BackDrop>
    </>
  );
}

const BackDrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  max-width: 380px;
  margin: 0 auto;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  min-height: 200px;
  display: flex;
  align-items: center;

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .radio-label {
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    input[type="radio"] {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 1px solid #333;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      cursor: pointer;

      &:checked {
        background: #fff;
        border: 1px solid #333;
      }

      &:checked::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid #6ea1ff;
        background-color: #6ea1ff;
        transform: translate(-50%, -50%);
      }
    }
  }

  .info-text {
    font-size: 12px;
    color: #888888;
    font-weight: 400;
  }
`;

export default RadioButtonModal;
