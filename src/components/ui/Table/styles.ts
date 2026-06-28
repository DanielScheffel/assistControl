import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;

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