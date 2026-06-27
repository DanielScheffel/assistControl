import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;

    background: ${({ theme}) => theme.colors.background}
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Main = styled.main`
    flex: 1;
    padding: 24px;
`;