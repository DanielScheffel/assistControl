import { useState } from "react";

import type { Loja } from "../../../../types/Loja";
import { lojaService } from "../../../../services/lojaService";

import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";

import { Form, Field, Actions } from "./styles";

interface LojaFormProps {
  mode: "create" | "edit";
  loja?: Loja;
  onSuccess: () => void;
  onCancel: () => void;
}

export function LojaForm({ mode, loja, onSuccess, onCancel }: LojaFormProps) {
  const [lojaNome, setLojaNome] = useState(loja?.loja_nome ?? "");
  const [cidade, setCidade] = useState(loja?.cidade ?? "");
  const [uf, setUf] = useState(loja?.uf ?? "");
  const [sigla, setSigla] = useState(loja?.sigla ?? "");
  const [cnpj, setCnpj] = useState(loja?.cnpj ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        loja_nome: lojaNome,
        cidade,
        uf,
        sigla,
        cnpj,
      };

      if (mode === "create") {
        await lojaService.cadastrar(data);
      }

      if (mode === "edit" && loja) {
        await lojaService.atualizar(loja.id_loja, data);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar loja.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <label>Nome da loja</label>
        <Input value={lojaNome} onChange={(e) => setLojaNome(e.target.value)} />
      </Field>

      <Field>
        <label>Cidade</label>
        <Input value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </Field>

      <Field>
        <label>UF</label>
        <Input value={uf} onChange={(e) => setUf(e.target.value)} />
      </Field>

      <Field>
        <label>Sigla</label>
        <Input value={sigla} onChange={(e) => setSigla(e.target.value)} />
      </Field>

      <Field>
        <label>CNPJ</label>
        <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
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