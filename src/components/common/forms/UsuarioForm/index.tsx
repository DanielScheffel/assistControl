import { useState } from "react";

import { usuarioService } from "../../../../services/usuarioService";

import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";

import { Form, Field, Select, Actions } from "./styles";
import type { Usuario } from "../../../../types/Usuario";

interface UsuarioFormProps {
  mode: "create" | "edit";

  usuario?: Usuario;

  onSuccess: () => void;
  onCancel: () => void;
}

export function UsuarioForm({ mode, usuario, onSuccess, onCancel }: UsuarioFormProps) {
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(usuario?.tipo_usuario ?? "Funcionario");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setErro("");

      if(mode === "create") {
          await usuarioService.cadastrar({
            nome,
            email,
            senha,
            tipo_usuario: tipoUsuario,
      });

      } else if(usuario) {
        const dadosAtualizado: {
          nome?: string;
          email?: string;
          senha?: string;
          tipo_usuario?: string;
        } = {};

        if(nome !== usuario.nome) {
          dadosAtualizado.nome = nome;
        }

        if (email !== usuario.email) {
          dadosAtualizado.email = email;
        }

        if (tipoUsuario !== usuario.tipo_usuario) {
          dadosAtualizado.tipo_usuario = tipoUsuario;
        }

        if (senha.trim() !== "") {
          dadosAtualizado.senha = senha;
        }

        await usuarioService.atualizar(
          usuario.id_usuario,
          dadosAtualizado
        );
      }

      setNome("");
      setEmail("");
      setSenha("");
      setTipoUsuario("Funcionario");

      onSuccess();
    } catch (error: any) {
      console.log(error);

      const mensagem = 
        error.response?.data?.[0]?.msg || error.response?.data?.message ||
        "Erro ao cadastrar usuário."

        setErro(mensagem)

    } finally {
      setLoading(false);
    }
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setTipoUsuario("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <label>Nome</label>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </Field>

      <Field>
        <label>Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Field>
        <label>
          {mode === "create" ? "Senha" : "Nova senha"}
        </label>

        <Input
          type="password"
          placeholder={
            mode === "create"
              ? "Digite a senha"
              : "Deixe em branco para não alterar"
          }
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </Field>

      <Field>
        <label>Tipo de Usuário</label>

        <Select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
        >
          <option value="Administrador">Administrador</option>
          <option value="Gerente">Gerente</option>
          <option value="Funcionario">Funcionário</option>
        </Select>
      </Field>

      {erro && (
        <p style={{ color: "#Ef4444", fontSize: 14}}>
          {erro}
        </p>
      )}

      <Actions>
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          onClick={() => {
            limparFormulario();
            onCancel();
          }}
        >
          Cancelar
        </Button>

        <Button type="submit" fullWidth={false} disabled={loading}>
          {loading
            ? "Salvando..."
            : mode === "create"
            ? "Cadastrar"
            : "Salvar alterações"
          }
        </Button>
      </Actions>
    </Form>
  );
}
