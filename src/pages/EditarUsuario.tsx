import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usuarioService } from "../services/usuarioService";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarUsuario() {
        try {
            const response = await usuarioService.buscarId(Number(id));

            const usuario = response.data;

            setNome(usuario.nome);
            setEmail(usuario.email);
            setTipoUsuario(usuario.tipo_usuario);
        } catch (error) {
            console.error(error)
        }
    }

    carregarUsuario();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const dados: {
        nome?: string;
        email?: string;
        senha?: string;
        tipo_usuario?: string;
      } = {};

      if (nome.trim()) dados.nome = nome;
      if (email.trim()) dados.email = email;
      if (senha.trim()) dados.senha = senha;
      if (tipoUsuario.trim()) dados.tipo_usuario = tipoUsuario;

      await usuarioService.atualizar(Number(id), dados);

      alert("Usuário atualizado com sucesso!");

      navigate("/usuarios");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Editar Usuário</h1>

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
          <label>Nova Senha</label>
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
            <option value="">Selecione</option>
            <option value="Administrador">
              Administrador
            </option>
            <option value="Funcionario">
              Funcionário
            </option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}