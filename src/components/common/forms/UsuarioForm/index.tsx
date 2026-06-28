import { useState } from "react";

import { usuarioService } from "../../../../services/usuarioService";

import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";

import { Form, Field, Select, Actions } from "./styles";

interface UsuarioFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function UsuarioForm({ onSuccess, onCancel }: UsuarioFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("Funcionario");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await usuarioService.cadastrar({
        nome,
        email,
        senha,
        tipo_usuario: tipoUsuario,
      });

      setNome("");
      setEmail("");
      setSenha("");
      setTipoUsuario("");

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
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
        <label>Senha</label>
        <Input
          type="password"
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
          {loading ? "Salvando..." : "Cadastrar"}
        </Button>
      </Actions>
    </Form>
  );
}
