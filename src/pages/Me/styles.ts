import styled from "styled-components";

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

export const Welcome = styled.div`
  margin-bottom: 32px;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 36px;
    margin-bottom: 10px;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 18px;
    margin-bottom: 8px;

    span {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
    }
  }
`;

export const WelcomeCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};

  padding: 56px 64px;

  display: grid;
  grid-template-columns: 0.9fr 1.3fr 0.9fr;
  align-items: center;
  gap: 48px;
`;

export const Illustration = styled.div`
  display: flex;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CardContent = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 26px;
    margin-bottom: 18px;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 17px;
    line-height: 1.7;
  }
`;

export const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.border};
`;

export const Profile = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  gap: 32px;
`;

export const ProfileIcon = styled.div`
  width: 58px;
  height: 58px;

  border-radius: 50%;
  background: rgba(37, 99, 235, 0.15);

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProfileInfo = styled.div`
  span {
    display: block;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 16px;
    margin-bottom: 4px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px;
  }
`;

export const ProfieContent = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;