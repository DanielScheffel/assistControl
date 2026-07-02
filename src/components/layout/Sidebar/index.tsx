import { LuBuilding, LuHouse, LuPackage, LuSettings, LuShieldCheck, LuUsers, LuWrench } from "react-icons/lu";
import { Aside, Avatar, Footer, Logo, Nav, NavItem, UserInfo } from "./styled";
import { getUserFromToken } from "../../../utils/getUserFromToken";


export function Sidebar() {

    const user = getUserFromToken();

    return (
        <Aside>
            <Logo>
                <LuShieldCheck size={28} />
                <h2>
                    Assist<span>Control</span>
                </h2>
            </Logo>

            <Nav>
                <NavItem to="/me">
                    <LuHouse size={18} />
                    <span>Início</span>
                </NavItem>
                <NavItem to="/assistencias" >
                    <LuWrench size={18} />
                    <span>Assistências</span>
                </NavItem>
                <NavItem to="/usuarios">
                    <LuUsers size={18} />
                    <span>Usuários</span>
                </NavItem>
                <NavItem to="/fornecedores">
                    <LuBuilding size={18} />
                    <span>Fornecedores</span>
                </NavItem>
                <NavItem to="/assistencia/novo">
                    <LuWrench size={18} />
                    <span>Nova Assistência</span>
                </NavItem>
                <NavItem to="/produtos">
                    <LuPackage size={18} />
                    <span>Produtos</span>
                </NavItem>
                <NavItem to="/configuracoes">
                    <LuSettings size={18} />
                    <span>Configurações</span>
                </NavItem>
                <NavItem to="/lojas">
                    <LuBuilding size={18} />
                    <span>Lojas</span>
                </NavItem>
            </Nav>

            <Footer>
                <Avatar>
                    {user?.nome?.charAt(0).toUpperCase() ?? "U"}
                </Avatar>

                <UserInfo>
                    <h4>{user?.nome ?? "Usuário"}</h4>
                    <span>{user?.tipo_usuario ?? "Perfil"}</span>
                </UserInfo>
            </Footer>
        </Aside>
    )
}