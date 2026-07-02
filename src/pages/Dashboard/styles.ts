import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 22px;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
  }

  strong {
    display: block;
    margin-top: 12px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 28px;
  }
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin-bottom: 18px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.background};

  span {
    color: ${({ theme }) => theme.colors.text};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;