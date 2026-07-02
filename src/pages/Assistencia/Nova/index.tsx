import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Produto } from "../../../types/Produto";

import { produtoService } from "../../../services/produtoService";
import { assistenciaService } from "../../../services/assistenciaService";

import { PageHeader } from "../../../components/common/PageHeader";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";

import {
  Container,
  Form,
  Section,
  SectionTitle,
  Grid,
  Field,
  StatusInfo,
  FileInput,
  Actions,
} from "./styles";

export default function NovaAssistencia() {
  const navigate = useNavigate();

  const [defeito, setDefeito] = useState("");
  const [numeroPeca, setNumeroPeca] = useState("");
  const [descricaoPeca, setDescricaoPeca] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [imagens, setImagens] = useState<File[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const lojaId = "2";

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await produtoService.listar();
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    void carregarProdutos();
  }, []);

  const produtoSelecionado = produtos.find(
    (produto) => produto.id_produto === Number(produtoId),
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("defeito", defeito);
      formData.append("numero_peca", numeroPeca);
      formData.append("descricao_peca", descricaoPeca);
      formData.append("loja_id", lojaId);
      formData.append("produto_id", produtoId);
      //   formData.append("status_assistencia_id", "1") // Status inicial: Aberto

      imagens.forEach((imagem) => {
        formData.append("imagens", imagem);
      });

      const response = await assistenciaService.cadastrar(formData);

      const { id, codigo_interno } = response.data;

      abrirEtiqueta(id);

      alert(`Assistência ${codigo_interno} cadastrada com sucesso.`);

      navigate(`/assistencia/${id}/etiqueta`);
    } catch (error: any) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Erro ao cadastrar assistência.");
    } finally {
      setLoading(false);
    }
  }

  function abrirEtiqueta(id: number) {
  window.open(
    `http://localhost:3000/etiqueta/${id}`,
    "_blank",
    "noopener,noreferrer"
  );
}

  return (
    <Container>
      <PageHeader
        title="Nova Assistência"
        subtitle="Cadastre uma nova solicitação de assistência."
      />

      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Informações da Assistência</SectionTitle>

          <Grid>
            <Field>
              <label>Loja</label>
              <Input value="Matriz" disabled />
            </Field>

            <Field>
              <label>Produto</label>

              <Select
                value={produtoId}
                onChange={(e) => setProdutoId(e.target.value)}
              >
                <option value="">Selecione um produto</option>

                {produtos.map((produto) => (
                  <option key={produto.id_produto} value={produto.id_produto}>
                    {produto.sku} - {produto.descricao}
                  </option>
                ))}
              </Select>
            </Field>
          </Grid>
        </Section>

        {produtoSelecionado && (
          <Section>
            <SectionTitle>Informações do Produto</SectionTitle>

            <Grid>
              <Field>
                <label>SKU</label>
                <Input value={produtoSelecionado.sku} disabled />
              </Field>

              <Field>
                <label>Categoria</label>
                <Input value={produtoSelecionado.categoria} disabled />
              </Field>

              <Field>
                <label>Fornecedor</label>
                <Input value={produtoSelecionado.marca} disabled />
              </Field>

              <Field>
                <label>Representante</label>
                <Input value={produtoSelecionado.representante} disabled />
              </Field>
            </Grid>
          </Section>
        )}

        <Section>
          <SectionTitle>Problema</SectionTitle>

          <Grid>
            <Field>
              <label>Defeito</label>
              <Input
                placeholder="Ex: Lateral quebrada"
                value={defeito}
                onChange={(e) => setDefeito(e.target.value)}
              />
            </Field>

            <Field>
              <label>Número da peça</label>
              <Input
                placeholder="Ex: 3"
                value={numeroPeca}
                onChange={(e) => setNumeroPeca(e.target.value)}
              />
            </Field>

            <Field>
              <label>Descrição da peça</label>
              <Input
                placeholder="Ex: Lateral direita"
                value={descricaoPeca}
                onChange={(e) => setDescricaoPeca(e.target.value)}
              />
            </Field>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Imagens</SectionTitle>

          <Field>
            <label>Fotos da assistência</label>

            <FileInput
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                setImagens(files);
              }}
            />
          </Field>
        </Section>

        <Section>
          <SectionTitle>Status inicial</SectionTitle>

          <StatusInfo>
            Toda nova assistência será criada como <strong>Aberto</strong>.
          </StatusInfo>
        </Section>

        <Actions>
          <Button
            type="button"
            variant="secondary"
            fullWidth={false}
            onClick={() => navigate("/assistencias")}
          >
            Cancelar
          </Button>

          <Button type="submit" fullWidth={false} disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar Assistência"}
          </Button>
        </Actions>
      </Form>
    </Container>
  );
}
