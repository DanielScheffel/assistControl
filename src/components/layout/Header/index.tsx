import { Container } from "../Container";
import { Title } from "./styled";


export function Header() {
    return (
        <Container>
            <Title>
                <h1>Bem-vindo</h1>
                <p>Sistema de Gerenciamento de Assistência</p>
            </Title>
        </Container>
    )
}