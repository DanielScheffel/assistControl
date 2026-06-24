import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setErro("")
        setLoading(true);

        try {
            const response = await authService.login(email, senha);

            localStorage.setItem("token", response.data.token);

            navigate("/me")
        } catch (err: any) {
            setErro("Email ou senha inválidos");
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleLogin} >
            <h2>Login</h2>

            {erro && <p>{erro}</p>}

            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
    )
}