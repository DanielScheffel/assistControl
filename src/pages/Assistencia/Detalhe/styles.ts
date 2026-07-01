import styled from "styled-components";

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const HeaderActions = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.div`
  margin-bottom: 24px;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 30px;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 6px;
  }
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
  margin-bottom: 20px;
`;

export const CardTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin-bottom: 20px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
  }
`;

export const ImageGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ImagePreview = styled.img`
  width: 170px;
  height: 120px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StatusArea = styled.div`
  display: flex;
  gap: 12px;
  align-items: end;
  max-width: 420px;
`;