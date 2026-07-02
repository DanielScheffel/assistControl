import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const InfoCard = styled.div`
  margin-top: 32px;
  padding: 32px;
  text-align: center;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  h2 {
    margin-bottom: 12px;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;