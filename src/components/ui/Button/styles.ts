import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "danger";

interface StyledButtonProps {
  variant: ButtonVariant;
  fullWidth: boolean;
}

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;

    &:hover:not(:disable) {
      background: ${({ theme }) => theme.colors.primaryHover}
    }
  `,

  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,

  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #ffffff;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: 44px;

  padding: 0 18px;
  border-radius: ${({ theme }) => theme.radius.md};

  font-size: 15px;
  font-weight: 600;

  transition: 0.2s;

  ${({ variant }) => variants[variant]}

  &:disable {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;