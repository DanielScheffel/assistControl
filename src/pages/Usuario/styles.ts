import styled from "styled-components";

export const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 16px;

    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
    font-weight: 600;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 16px;

    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 10px;
  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  color: ${({ status, theme }) =>
    status === "Ativo" ? theme.colors.success : theme.colors.danger};

  background: ${({ status }) =>
    status === "Ativo"
      ? "rgba(34, 197, 94, 0.12)"
      : "rgba(239, 68, 68, 0.12)"};
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ActionButton = styled.button`
  padding: 8px 10px;

  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 13px;

  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ActionLink = styled.a`
  padding: 8px 10px;

  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};

  font-size: 13px;

  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

export const Search = styled.div`
  widht: 350px;
`;