import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  height: 44px;

  padding: 0 14px;

  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  font-size: 14px;

  transition: 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;