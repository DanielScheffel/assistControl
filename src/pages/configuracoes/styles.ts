import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.lg};

  padding: 24px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};

  font-size: 24px;
`;

export const Description = styled.p`
  margin-top: 6px;
  margin-bottom: 30px;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-bottom: 30px;
`;

export const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 14px 18px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.background};

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const AddCategory = styled.div`
  display: flex;
  gap: 16px;
  align-items: end;
`;