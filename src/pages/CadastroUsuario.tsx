import { useState } from "react";
import { usuarioService } from "../services/usuarioService";


export default function CadastroUsuario() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("Funcionario");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setLoading(true);

            await usuarioService.cadastrar({
                nome,
                email,
                senha,
                tipo_usuario: tipoUsuario,
            });

            alert("Usuário cadastrado com sucesso!");

            setNome("");
            setEmail("");
            setSenha("");
            setTipoUsuario("Funcionario")
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar usuário");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
      <h1>Novo Usuário</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div>
          <label>Tipo de Usuário</label>

          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="Administrador">
              Administrador
            </option>

            <option value="Gerente">
                Gerente
            </option>

            <option value="Funcionario">
              Funcionário
            </option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
    )
}