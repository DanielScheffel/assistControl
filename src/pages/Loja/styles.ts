import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
`;

export const LojaCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 22px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

export const StoreIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-weight: 700;
`;

export const LojaInfo = styled.div`
  flex: 1;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
  }

  span {
    display: inline-block;
    margin-top: 6px;
    padding: 4px 8px;
    border-radius: 6px;
    background: rgba(37, 99, 235, 0.15);
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 700;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LojaDetails = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;