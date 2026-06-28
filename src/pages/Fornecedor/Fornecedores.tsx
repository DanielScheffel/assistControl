import { useEffect, useState } from "react";
import { fornecedorService } from "../../services/fornecedorService";
import type { Fornecedor } from "../../types/Fornecedor";
import axios from "axios";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/ui/Button";
import { ActionButton, Actions, Search, Toolbar } from "./styles";
import { Input } from "../../components/ui/Input";
import { Table } from "../../components/ui/Table";
import { Modal } from "../../components/common/Modal";
import { FornecedorForm } from "../../components/common/forms/FornecedorForm";

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = 
    useState<Fornecedor | null>(null);


  async function carregarFornecedores() {
      try {
        const response = await fornecedorService.listar();
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    carregarFornecedores();
  }, []);

  if (loading) {
    return <h2>Carregando fornecedores...</h2>;
  }

  async function excluirFornecedor(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este fornecedor?",
    );

    if (!confirmar) return;

    try {
      await fornecedorService.deletar(id);

      setFornecedores((fornecedoresAtuais) =>
        fornecedoresAtuais.filter(
          (fornecedor) => fornecedor.id_fornecedor !== id,
        ),
      );

      alert("Fornecedor excluído com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const mensagem = error.response?.data?.message;

        if (mensagem?.includes("fk_produto_fornecedor")) {
          alert(
            "Este fornecedor possui produtos cadastrados e não pode ser excluído.",
          );
          return;
        }
      }

      alert("Erro ao excluir fornecedor.");
    }
  }

  const fornecedoresFiltrados = fornecedores.filter((fornecedor) => {
    const termo = search.toLowerCase();

    return (
      fornecedor.marca.toLowerCase().includes(termo) ||
      fornecedor.representante.toLowerCase().includes(termo) ||
      fornecedor.contato.toLowerCase().includes(termo) ||
      fornecedor.email.toLowerCase().includes(termo)
    );
  });

  function abrirModalEdicao(fornecedor: Fornecedor) {
  setFornecedorSelecionado(fornecedor);
  setOpenEditModal(true);
}

function fecharModalEdicao() {
  setFornecedorSelecionado(null);
  setOpenEditModal(false);
}

  return (
    <>
      <PageHeader
        title="Fornecedores"
        subtitle="Gerencie os fornecedores cadastrados no sistema."
      >
        <Button fullWidth={false} onClick={() => setOpenModal(true)}>
          Novo Fornecedor
        </Button>
      </PageHeader>

      <Toolbar>
        <Search>
          <Input
            placeholder="Pesquisar fornecedor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Representante</th>
            <th>Contato</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {fornecedoresFiltrados.map((fornecedor) => (
            <tr key={fornecedor.id_fornecedor}>
              <td>{fornecedor.id_fornecedor}</td>
              <td>{fornecedor.marca}</td>
              <td>{fornecedor.representante}</td>
              <td>{fornecedor.contato}</td>
              <td>{fornecedor.email}</td>

              <td>
                <Actions>
                  <ActionButton onClick={() => abrirModalEdicao(fornecedor)}>
                    Editar
                  </ActionButton>

                  <ActionButton
                    onClick={() =>
                      excluirFornecedor(fornecedor.id_fornecedor)
                    }
                  >
                    Excluir
                  </ActionButton>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        open={openModal}
        title="Novo Fornecedor"
        onClose={() => setOpenModal(false)}
      >
        <FornecedorForm
          mode="create"
          onCancel={() => setOpenEditModal(false)}
          onSuccess={async () => {
            setOpenModal(false)
            await carregarFornecedores()
          }}
        />
      </Modal>

      <Modal
        open={openEditModal}
        title={`Editar ${fornecedorSelecionado?.marca ?? "Fornecedor"}`}
        onClose={fecharModalEdicao}
      >
        {fornecedorSelecionado && (
          <FornecedorForm
            mode="edit"
            fornecedor={fornecedorSelecionado}
            onCancel={fecharModalEdicao}
            onSuccess={async () => {
              fecharModalEdicao();
              await carregarFornecedores();
            }}
          />
        )}
      </Modal>
    </>
  );
}
