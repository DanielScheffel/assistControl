import styled from "styled-components";

export const StyledSelect = styled.select`
  width: 100%;

  height: 44px;

  padding: 0 14px;

  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  font-size: 14px;

  transition: 0.2s;

  &:focus {
    outline: none;

    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;