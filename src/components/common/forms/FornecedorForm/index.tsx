import { useState } from "react";

import type { Fornecedor } from "../../../../types/Fornecedor";

import { fornecedorService } from "../../../../services/fornecedorService";

import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";

import { Form, Field, Actions } from "./styles";

interface FornecedorFormProps {
  mode: "create" | "edit";
  fornecedor?: Fornecedor;
  onSuccess: () => void;
  onCancel: () => void;
}

export function FornecedorForm({
  mode,
  fornecedor,
  onSuccess,
  onCancel,
}: FornecedorFormProps) {
  const [marca, setMarca] = useState(fornecedor?.marca ?? "");
  const [representante, setRepresentante] = useState(
    fornecedor?.representante ?? ""
  );
  const [contato, setContato] = useState(fornecedor?.contato ?? "");
  const [email, setEmail] = useState(fornecedor?.email ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === "create") {
        await fornecedorService.cadastrar({
          marca,
          representante,
          contato,
          email,
        });
      }

      if (mode === "edit" && fornecedor) {
        await fornecedorService.atualizar(fornecedor.id_fornecedor, {
          marca,
          representante,
          contato,
          email,
        });
      }

      setMarca("");
      setRepresentante("");
      setContato("");
      setEmail("");

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar fornecedor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <label>Marca</label>
        <Input value={marca} onChange={(e) => setMarca(e.target.value)} />
      </Field>

      <Field>
        <label>Representante</label>
        <Input
          value={representante}
          onChange={(e) => setRepresentante(e.target.value)}
        />
      </Field>

      <Field>
        <label>Contato</label>
        <Input value={contato} onChange={(e) => setContato(e.target.value)} />
      </Field>

      <Field>
        <label>E-mail</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Actions>
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          onClick={onCancel}
        >
          Cancelar
        </Button>

        <Button type="submit" fullWidth={false} disabled={loading}>
          {loading
            ? "Salvando..."
            : mode === "create"
            ? "Cadastrar"
            : "Salvar alterações"}
        </Button>
      </Actions>
    </Form>
  );
}