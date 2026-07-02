import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "../../../components/common/PageHeader";
import { Button } from "../../../components/ui/Button";

import { Container, Actions, InfoCard } from "./styles";

export default function EtiquetaAssistencia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const etiquetaUrl = `http://localhost:3000/etiqueta/${id}`;

  return (
    <Container>
      <PageHeader
        title="Etiqueta da Assistência"
        subtitle="Visualize e imprima a etiqueta gerada para a assistência."
      />

      <Actions>
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          onClick={() => navigate("/assistencias")}
        >
          Voltar para listagem
        </Button>

        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          onClick={() => navigate(`/assistencia/${id}`)}
        >
          Ver detalhes
        </Button>

        <Button
          type="button"
          fullWidth={false}
          onClick={() => window.open(etiquetaUrl, "_blank")}
        >
          Abrir para imprimir
        </Button>
      </Actions>

      <InfoCard>
  <h2>Etiqueta gerada com sucesso 🎉</h2>

  <p>
    A assistência foi cadastrada e a etiqueta já está disponível para
    impressão.
  </p>
</InfoCard>
    </Container>
  );
}