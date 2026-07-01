import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Assistencia } from "../../types/Assistencia";

import { assistenciaService } from "../../services/assistenciaService";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table } from "../../components/ui/Table";
import { PageHeader } from "../../components/common/PageHeader";

import {
  Toolbar,
  Search,
  StatusBadge,
  Actions,
  ActionButton,
} from "./styles";
import { Select } from "../../components/ui/Select";

export default function Assistencias() {
  const [assistencias, setAssistencias] = useState<Assistencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [codigoInterno, setCodigoInterno] = useState("");
const [status, setStatus] = useState("");

  const navigate = useNavigate();

async function carregarAssistencias() {
  try {
    const response = await assistenciaService.search(status, codigoInterno);
    setAssistencias(response.data);
  } catch (error) {
    console.error("Erro ao carregar assistências:", error);
  } finally {
    setLoading(false);
  }
}

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    void carregarAssistencias();
  }, [status, codigoInterno]);

  if (loading) {
    return <h2>Carregando assistências...</h2>;
  }

  return (
    <>
      <PageHeader
        title="Assistências"
        subtitle="Gerencie todas as assistências cadastradas no sistema."
      >
        <Button
          fullWidth={false}
          onClick={() => navigate("/assistencia/novo")}
        >
          Nova Assistência
        </Button>
      </PageHeader>

<Toolbar>
  <Search>
    <Input
      placeholder="Código interno..."
      value={codigoInterno}
      onChange={(e) => setCodigoInterno(e.target.value)}
    />
  </Search>

  <Search>
    <Select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">Todos os status</option>
      <option value="Aberto">Aberto</option>
      <option value="Em análise">Em análise</option>
      <option value="Aguradando peça">Aguradando peça</option>
      <option value="Concluída">Concluída</option>
      <option value="Cancelada">Cancelada</option>
    </Select>
  </Search>
</Toolbar>

      <Table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Loja</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {assistencias.map((assistencia) => (
            <tr key={assistencia.id_assistencia}>
              <td>{assistencia.codigo_interno ?? "-"}</td>
              <td>{assistencia.produto}</td>
              <td>{assistencia.loja_nome}</td>
              <td>
                <StatusBadge status={assistencia.status}>
                  {assistencia.status}
                </StatusBadge>
              </td>
              <td>{formatarData(assistencia.data_solicitada)}</td>

              <td>
                <Actions>
                  <ActionButton
                    onClick={() =>
                      navigate(`/assistencia/${assistencia.id_assistencia}`)
                    }
                  >
                    Ver
                  </ActionButton>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}