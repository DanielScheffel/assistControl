import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

import {
    Container,
    LoginCard,
    Logo,
    Form,
    Field,
    Label,
    ErrorMessage
} from "./styles";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setErro("");
        setLoading(true);

        try {
            const response = await authService.login(email, senha);

            localStorage.setItem("token", response.data.token);

            navigate("/me");
        } catch {
            setErro("Email ou senha inválidos");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>

            <LoginCard>

                <Logo>
                    <h1>Assist<span>Control</span></h1>

                    <p>
                        Sistema de Gerenciamento de Assistências
                    </p>
                </Logo>

                <Form onSubmit={handleLogin}>

                    <Field>
                        <Label>E-mail</Label>

                        <Input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <Label>Senha</Label>

                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </Field>

                    {erro && (
                        <p style={{ color: "red", fontSize: 14 }}>
                            {ErrorMessage}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>

                </Form>

            </LoginCard>

        </Container>
    );
}