import styled from "styled-components";

export const Container = styled.header`
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  background: ${({ theme }) => theme.colors.header};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.div`
  h1 {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
  }
`;