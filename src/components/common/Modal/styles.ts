import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  background: rgba(0, 0, 0, 0.65);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 520px;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};

  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 24px;
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;