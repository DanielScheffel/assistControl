import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
`;

export const Info = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 28px;
    font-weight: 700;
  }

  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 15px;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
`;