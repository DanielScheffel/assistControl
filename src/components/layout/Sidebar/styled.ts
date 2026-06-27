import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Aside = styled.aside`
  width: 240px;
  min-height: 100vh;

  background: ${({ theme }) => theme.colors.sidebar};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  svg {
    color: ${({ theme }) => theme.colors.primary}
  }

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 22px;
    font-weight: 700;

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Nav = styled.nav`
  flex: 1;
  padding: 16px;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 14px;
  font-weight: 500;

  transition: .2s;

  &:hover{
    background:${({theme}) => theme.colors.surface};
    color:${({theme}) => theme.colors.text};
  }

  &.active{
    background:${({theme}) => theme.colors.primary};
    color:white;
  }
`;

export const Footer = styled.footer`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  display: flex;
  align-items: center;
  gap: 12px;
`;


export const Avatar = styled.div`
width: 42px;
  height: 42px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 16px;
  font-weight: 700;

  flex-shrink: 0;
`;


export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h4 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
    font-weight: 600;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 13px;
  }
`;