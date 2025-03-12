import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
  width: string;
  height: string;
}

export type ModalType = "confirm" | "alert";

function Modal({ children, width, height }: ModalProps) {
  return createPortal(
    <ModalStyle>
      <div className="modal-background">
        <div className="modal-content" style={{ width, height }}>
          {children}
        </div>
      </div>
    </ModalStyle>,
    document.body
  );
}

const ModalStyle = styled.div`
  .modal-background {
    width: 100%;
    max-width: 380px;
    height: 100dvh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Modal;
