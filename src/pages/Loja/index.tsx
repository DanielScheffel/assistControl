import { useEffect, useState } from "react";

import type { Loja } from "../../types/Loja";
import { lojaService } from "../../services/lojaService";

import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/common/Modal";
import { LojaForm } from "../../components/common/forms/LojaForm";

import {
  Grid,
  LojaCard,
  CardHeader,
  StoreIcon,
  LojaInfo,
  Actions,
  ActionButton,
  LojaDetails,
} from "./styles";

export default function Lojas() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(true);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [lojaSelecionada, setLojaSelecionada] = useState<Loja | null>(null);

  async function carregarLojas() {
    try {
      const response = await lojaService.listar();
      setLojas(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar lojas.");
    } finally {
      setLoading(false);
    }
  }

  async function excluirLoja(id: number) {
    const confirmar = window.confirm("Deseja realmente excluir esta loja?");

    if (!confirmar) return;

    try {
      await lojaService.deletar(id);

      setLojas((lojasAtuais) =>
        lojasAtuais.filter((loja) => loja.id_loja !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir loja.");
    }
  }

  function abrirModalEdicao(loja: Loja) {
    setLojaSelecionada(loja);
    setOpenEditModal(true);
  }

  function fecharModalEdicao() {
    setLojaSelecionada(null);
    setOpenEditModal(false);
  }

  useEffect(() => {
    void carregarLojas();
  }, []);

  if (loading) {
    return <h2>Carregando lojas...</h2>;
  }

  return (
    <>
      <PageHeader
        title="Lojas"
        subtitle="Gerenciamento das lojas da empresa."
      >
        <Button fullWidth={false} onClick={() => setOpenCreateModal(true)}>
          Nova Loja
        </Button>
      </PageHeader>

      <Grid>
        {lojas.map((loja) => (
          <LojaCard key={loja.id_loja}>
            <CardHeader>
              <StoreIcon>{loja.sigla}</StoreIcon>

              <LojaInfo>
                <h3>{loja.loja_nome}</h3>
                <span>{loja.sigla}</span>
              </LojaInfo>

              <Actions>
                <ActionButton onClick={() => abrirModalEdicao(loja)}>
                  Editar
                </ActionButton>

                <ActionButton onClick={() => excluirLoja(loja.id_loja)}>
                  Excluir
                </ActionButton>
              </Actions>
            </CardHeader>

            <LojaDetails>
              <p>
                <strong>Cidade:</strong> {loja.cidade}/{loja.uf}
              </p>

              <p>
                <strong>CNPJ:</strong> {loja.cnpj}
              </p>
            </LojaDetails>
          </LojaCard>
        ))}
      </Grid>

      <Modal
        open={openCreateModal}
        title="Nova Loja"
        onClose={() => setOpenCreateModal(false)}
      >
        <LojaForm
          mode="create"
          onCancel={() => setOpenCreateModal(false)}
          onSuccess={async () => {
            setOpenCreateModal(false);
            await carregarLojas();
          }}
        />
      </Modal>

      <Modal
        open={openEditModal}
        title={`Editar ${lojaSelecionada?.loja_nome ?? "Loja"}`}
        onClose={fecharModalEdicao}
      >
        {lojaSelecionada && (
          <LojaForm
            mode="edit"
            loja={lojaSelecionada}
            onCancel={fecharModalEdicao}
            onSuccess={async () => {
              fecharModalEdicao();
              await carregarLojas();
            }}
          />
        )}
      </Modal>
    </>
  );
}