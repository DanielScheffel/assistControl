import { Outlet } from "react-router-dom";
import { Content, Main, Wrapper } from "./styles";
import { Sidebar } from "../../components/layout/Sidebar";
import { Header } from "../../components/layout/Header";


export default function MainLayout() {
    return (
        <Wrapper>
            <Sidebar />

            <Content>
                <Header />
                <Main>
                    <Outlet />
                </Main>
            </Content>
        </Wrapper>
    );
}