import { useEffect, useState } from "react";

import { PageHeader } from "../../components/common/PageHeader";
import { metricaService } from "../../services/metricaService";

import {
  Container,
  CardsGrid,
  MetricCard,
  Section,
  SectionTitle,
  List,
  ListItem,
} from "./styles";

type StatusMetrica = {
  status: string;
  total: string;
};

type LojaMetrica = {
  loja_nome: string;
  total: number;
};

type FornecedorMetrica = {
  marca: string;
  total: number;
};

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<StatusMetrica[]>([]);
  const [lojas, setLojas] = useState<LojaMetrica[]>([]);
  const [fornecedores, setFornecedores] = useState<FornecedorMetrica[]>([]);
  const [tempoMedio, setTempoMedio] = useState(0);
  const [valorParado, setValorParado] = useState(0);
  const [loading, setLoading] = useState(true);

  async function carregarMetricas() {
    try {
      const [
        totalResponse,
        statusResponse,
        lojasResponse,
        fornecedoresResponse,
        tempoMedioResponse,
        valorParadoResponse,
      ] = await Promise.all([
        metricaService.total(),
        metricaService.status(),
        metricaService.lojas(),
        metricaService.fornecedores(),
        metricaService.tempoMedio(),
        metricaService.valorParado(),
      ]);

      setTotal(totalResponse.data.total);
      setStatus(statusResponse.data);
      setLojas(lojasResponse.data);
      setFornecedores(fornecedoresResponse.data);
      setTempoMedio(tempoMedioResponse.data.media_dias);
      setValorParado(valorParadoResponse.data.valor_total);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar métricas.");
    } finally {
      setLoading(false);
    }
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  useEffect(() => {
    void carregarMetricas();
  }, []);

  const fornecedorMaior = fornecedores[0];

  if (loading) {
    return <h2>Carregando dashboard...</h2>;
  }

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        subtitle="Acompanhe os principais indicadores do AssistControl."
      />

      <CardsGrid>
        <MetricCard>
          <span>Total de Assistências</span>
          <strong>{total}</strong>
        </MetricCard>

        <MetricCard>
          <span>Valor Parado</span>
          <strong>{formatarMoeda(valorParado)}</strong>
        </MetricCard>

        <MetricCard>
          <span>Tempo Médio</span>
          <strong>{tempoMedio} dia(s)</strong>
        </MetricCard>

        <MetricCard>
          <span>Fornecedor com mais assistências</span>
          <strong>{fornecedorMaior?.marca ?? "-"}</strong>
        </MetricCard>
      </CardsGrid>

      <Section>
        <SectionTitle>Assistências por Status</SectionTitle>

        <List>
          {status.map((item) => (
            <ListItem key={item.status}>
              <span>{item.status}</span>
              <strong>{item.total}</strong>
            </ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <SectionTitle>Assistências por Loja</SectionTitle>

        <List>
          {lojas.map((loja) => (
            <ListItem key={loja.loja_nome}>
              <span>{loja.loja_nome}</span>
              <strong>{loja.total}</strong>
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
}