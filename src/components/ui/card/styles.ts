import styled from "styled-components";

interface StyledCardProps {
  padding: string;
}

export const StyledCard = styled.div<StyledCardProps>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  padding: ${({ padding }) => padding};
`;