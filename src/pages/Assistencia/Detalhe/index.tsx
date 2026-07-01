import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { assistenciaService } from "../../../services/assistenciaService";
import { Button } from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";

import {
  Container,
  HeaderActions,
  Title,
  Card,
  CardTitle,
  InfoGrid,
  InfoItem,
  ImageGrid,
  ImagePreview,
  StatusArea,
} from "./styles";

type Imagem = {
  id_imagem: number;
  nome_arquivo: string;
  url_arquivo: string;
};

type AssistenciaDetalhes = {
  id_assistencia: number;
  codigo_interno: string | null;
  defeito: string;
  numero_peca: string;
  descricao_peca: string;
  data_solicitada: string;
  data_finalizada: string | null;
  loja_nome: string;
  usuario_nome: string;
  sku: string;
  produto_descricao: string;
  categoria: string;
  marca: string;
  representante: string;
  fornecedor_email: string;
  status: string;
  imagens: Imagem[];
};

const statusOptions = [
  { id: 1, label: "Aberto" },
  { id: 2, label: "Em análise" },
  { id: 3, label: "Aguradando peça" },
  { id: 4, label: "Concluída" },
  { id: 5, label: "Cancelada" },
];

export default function DetalhesAssistencia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assistencia, setAssistencia] = useState<AssistenciaDetalhes | null>(
    null
  );
  const [statusId, setStatusId] = useState("");
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarAssistencia() {
    if (!id) return;

    try {
      const response = await assistenciaService.buscarPorId(Number(id));
      setAssistencia(response.data.assistencia);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar assistência.");
    } finally {
      setLoading(false);
    }
  }

  async function atualizarStatus() {
    if (!id || !statusId) return;

    try {
      setSalvando(true);

        console.log("ID:", id);
console.log("Status:", statusId);
console.log("Token:", localStorage.getItem("token"));

      await assistenciaService.atualizarStatus(Number(id), Number(statusId));

      await carregarAssistencia();

      alert("Status atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar status.");
    } finally {
      setSalvando(false);
    }
  }

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  function montarUrlImagem(url: string) {
    return `http://localhost:3000/${url.replaceAll("\\", "/")}`;
  }

  useEffect(() => {
    void carregarAssistencia();
  }, [id]);

  if (loading) {
    return <h2>Carregando assistência...</h2>;
  }

  if (!assistencia) {
    return <h2>Assistência não encontrada.</h2>;
  }

  return (
  <Container>
    <HeaderActions>
      <Button
        type="button"
        variant="secondary"
        fullWidth={false}
        onClick={() => navigate("/assistencias")}
      >
        Voltar
      </Button>
    </HeaderActions>

    <Title>
      <h1>
        Assistência {assistencia.codigo_interno ?? assistencia.id_assistencia}
      </h1>
      <p>Visualize os dados e atualize o status da assistência.</p>
    </Title>

    <Card>
      <CardTitle>Informações da Assistência</CardTitle>

      <InfoGrid>
        <InfoItem>
          <span>Código</span>
          <strong>{assistencia.codigo_interno ?? "-"}</strong>
        </InfoItem>

        <InfoItem>
          <span>Status</span>
          <strong>{assistencia.status}</strong>
        </InfoItem>

        <InfoItem>
          <span>Loja</span>
          <strong>{assistencia.loja_nome}</strong>
        </InfoItem>

        <InfoItem>
          <span>Solicitado por</span>
          <strong>{assistencia.usuario_nome}</strong>
        </InfoItem>

        <InfoItem>
          <span>Data solicitada</span>
          <strong>{formatarData(assistencia.data_solicitada)}</strong>
        </InfoItem>

        <InfoItem>
          <span>Data finalizada</span>
          <strong>
            {assistencia.data_finalizada
              ? formatarData(assistencia.data_finalizada)
              : "-"}
          </strong>
        </InfoItem>
      </InfoGrid>
    </Card>

    <Card>
      <CardTitle>Produto</CardTitle>

      <InfoGrid>
        <InfoItem>
          <span>SKU</span>
          <strong>{assistencia.sku}</strong>
        </InfoItem>

        <InfoItem>
          <span>Produto</span>
          <strong>{assistencia.produto_descricao}</strong>
        </InfoItem>

        <InfoItem>
          <span>Categoria</span>
          <strong>{assistencia.categoria}</strong>
        </InfoItem>

        <InfoItem>
          <span>Fornecedor</span>
          <strong>{assistencia.marca}</strong>
        </InfoItem>

        <InfoItem>
          <span>Representante</span>
          <strong>{assistencia.representante}</strong>
        </InfoItem>

        <InfoItem>
          <span>E-mail do fornecedor</span>
          <strong>{assistencia.fornecedor_email}</strong>
        </InfoItem>
      </InfoGrid>
    </Card>

    <Card>
      <CardTitle>Problema</CardTitle>

      <InfoGrid>
        <InfoItem>
          <span>Defeito</span>
          <strong>{assistencia.defeito}</strong>
        </InfoItem>

        <InfoItem>
          <span>Número da peça</span>
          <strong>{assistencia.numero_peca}</strong>
        </InfoItem>

        <InfoItem>
          <span>Descrição da peça</span>
          <strong>{assistencia.descricao_peca}</strong>
        </InfoItem>
      </InfoGrid>
    </Card>

    <Card>
      <CardTitle>Imagens</CardTitle>

      {assistencia.imagens.length === 0 && (
        <InfoItem>
          <strong>Nenhuma imagem enviada.</strong>
        </InfoItem>
      )}

      <ImageGrid>
        {assistencia.imagens.map((imagem) => (
          <a
            key={imagem.id_imagem}
            href={montarUrlImagem(imagem.url_arquivo)}
            target="_blank"
          >
            <ImagePreview
              src={montarUrlImagem(imagem.url_arquivo)}
              alt={imagem.nome_arquivo}
            />
          </a>
        ))}
      </ImageGrid>
    </Card>

    <Card>
      <CardTitle>Atualizar Status</CardTitle>

      <StatusArea>
        <Select
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
        >
          <option value="">Selecione um status</option>

          {statusOptions.map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </Select>

        <Button
          type="button"
          fullWidth={false}
          disabled={salvando}
          onClick={atualizarStatus}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </Button>
      </StatusArea>
    </Card>
  </Container>
);
}