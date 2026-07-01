import styled from "styled-components";

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

export const Search = styled.div`
  width: 350px;
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 10px;
  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  color: ${({ status }) => {
    if (status === "Aberto") return "#22C55E";
    if (status === "Em análise") return "#F59E0B";
    if (status === "Aguradando peça") return "#F97316";
    if (status === "Concluída") return "#3B82F6";
    if (status === "Cancelada") return "#EF4444";
    return "#94A3B8";
  }};

  background: ${({ status }) => {
    if (status === "Aberto") return "rgba(34, 197, 94, 0.12)";
    if (status === "Em análise") return "rgba(245, 158, 11, 0.12)";
    if (status === "Aguradando peça") return "rgba(249, 115, 22, 0.12)";
    if (status === "Concluída") return "rgba(59, 130, 246, 0.12)";
    if (status === "Cancelada") return "rgba(239, 68, 68, 0.12)";
    return "rgba(148, 163, 184, 0.12)";
  }};
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
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