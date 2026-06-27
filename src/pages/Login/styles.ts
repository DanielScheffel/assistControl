import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 420px;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};

  padding: 40px;
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 8px;

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.95rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;