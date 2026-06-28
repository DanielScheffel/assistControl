import { type ReactNode } from "react";

import {
  Overlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalBody,
} from "./styles";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ open, title, children, onClose }: ModalProps) {

  if (!open) {
    return null;
  }

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <h2>{title}</h2>

          <CloseButton type="button" onClick={onClose}>
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Overlay>
  );
}