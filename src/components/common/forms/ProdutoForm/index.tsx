import { useEffect, useState } from "react";

import type { Produto } from "../../../../types/Produto";
import type { Categoria } from "../../../../types/Categoria";
import type { Fornecedor } from "../../../../types/Fornecedor";

import { produtoService } from "../../../../services/produtoService";
import { categoriaService } from "../../../../services/categoriaService";
import { fornecedorService } from "../../../../services/fornecedorService";

import { Input } from "../../../ui/Input";
import { Select } from "../../../ui/Select";
import { Button } from "../../../ui/Button";

import { Form, Field, Actions } from "./styles";

interface ProdutoFormProps {
  mode: "create" | "edit";
  produto?: Produto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProdutoForm({
  mode,
  produto,
  onSuccess,
  onCancel,
}: ProdutoFormProps) {
  const [sku, setSku] = useState(produto?.sku ?? "");
  const [descricao, setDescricao] = useState(produto?.descricao ?? "");
  const [valorProduto, setValorProduto] = useState(
    produto?.valor_produto?.toString() ?? ""
  );
  const [codigoGtinEan, setCodigoGtinEan] = useState(
    produto?.codigo_gtin_ean ?? ""
  );

  const [categoriaId, setCategoriaId] = useState(
    produto?.categoria_id?.toString() ?? ""
  );
  const [fornecedorId, setFornecedorId] = useState(
    produto?.fornecedor_id?.toString() ?? ""
  );

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [categoriasResponse, fornecedoresResponse] =
          await Promise.all([
            categoriaService.listar(),
            fornecedorService.listar(),
          ]);

        setCategorias(categoriasResponse.data);
        setFornecedores(fornecedoresResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    void carregarDados();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        sku,
        descricao,
        valor_produto: Number(valorProduto),
        codigo_gtin_ean: codigoGtinEan,
        categoria_id: Number(categoriaId),
        fornecedor_id: Number(fornecedorId),
      };

      if (mode === "create") {
        await produtoService.cadastrar(data);
      }

      if (mode === "edit" && produto) {
        await produtoService.atualizar(produto.id_produto, data);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <label>SKU</label>
        <Input value={sku} onChange={(e) => setSku(e.target.value)} />
      </Field>

      <Field>
        <label>Descrição</label>
        <Input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </Field>

      <Field>
        <label>Valor</label>
        <Input
          type="number"
          step="0.01"
          value={valorProduto}
          onChange={(e) => setValorProduto(e.target.value)}
        />
      </Field>

      <Field>
        <label>Código GTIN/EAN</label>
        <Input
          value={codigoGtinEan}
          onChange={(e) => setCodigoGtinEan(e.target.value)}
        />
      </Field>

      <Field>
        <label>Categoria</label>
        <Select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>

          {categorias.map((categoria) => (
            <option
              key={categoria.id_categoria_produto}
              value={categoria.id_categoria_produto}
            >
              {categoria.categoria}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <label>Fornecedor</label>
        <Select
          value={fornecedorId}
          onChange={(e) => setFornecedorId(e.target.value)}
        >
          <option value="">Selecione um fornecedor</option>

          {fornecedores.map((fornecedor) => (
            <option
              key={fornecedor.id_fornecedor}
              value={fornecedor.id_fornecedor}
            >
              {fornecedor.marca}
            </option>
          ))}
        </Select>
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