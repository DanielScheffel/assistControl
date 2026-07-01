import { useEffect, useState } from "react";

import type { Produto } from "../../types/Produto";

import { produtoService } from "../../services/produtoService";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table } from "../../components/ui/Table";
import { PageHeader } from "../../components/common/PageHeader";
import { Modal } from "../../components/common/Modal";
import { ProdutoForm } from "../../components/common/forms/ProdutoForm";

import { Toolbar, Search, Actions, ActionButton } from "./styles";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<Produto | null>(null);

  async function carregarProdutos() {
    try {
      const response = await produtoService.listar();
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  function abrirModalEdicao(produto: Produto) {
    setProdutoSelecionado(produto);
    setOpenEditModal(true);
  }

  function fecharModalEdicao() {
    setProdutoSelecionado(null);
    setOpenEditModal(false);
  }

  function formatarMoeda(valor: string) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  useEffect(() => {
    void carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((produto) => {
    const termo = search.toLowerCase();

    return (
      produto.sku.toLowerCase().includes(termo) ||
      produto.descricao.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo) ||
      produto.marca.toLowerCase().includes(termo) ||
      produto.codigo_gtin_ean?.toLowerCase().includes(termo)
    );
  });

  async function excluirProduto(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if(!confirmar) return;

    try {
    await produtoService.deletar(id);

    setProdutos((produtosAtuais) =>
      produtosAtuais.filter(
        (produto) => produto.id_produto !== id
      )
    );

    alert("Produto excluído com sucesso!");
  } catch (error: any) {
    const mensagem =
      error.response?.data?.message ||
      "Erro ao excluir produto.";

    alert(mensagem);
  }
  }

  if (loading) {
    return <h2>Carregando produtos...</h2>;
  }

  return (
    <>
      <PageHeader
        title="Produtos"
        subtitle="Gerencie os produtos cadastrados no sistema."
      >
        <Button fullWidth={false} onClick={() => setOpenCreateModal(true)}>
          Novo produto
        </Button>
      </PageHeader>

      <Toolbar>
        <Search>
          <Input
            placeholder="Pesquisar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Fornecedor</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtosFiltrados.map((produto) => (
            <tr key={produto.id_produto}>
              <td>{produto.sku}</td>
              <td>{produto.descricao}</td>
              <td>{produto.categoria}</td>
              <td>{produto.marca}</td>
              <td>{formatarMoeda(produto.valor_produto)}</td>

              <td>
                <Actions>
                  <ActionButton onClick={() => abrirModalEdicao(produto)}>
                    Editar
                  </ActionButton>

                  <ActionButton onClick={() => excluirProduto(produto.id_produto)}>
                    Excluir
                  </ActionButton>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        open={openCreateModal}
        title="Novo Produto"
        onClose={() => setOpenCreateModal(false)}
      >
        <ProdutoForm
          mode="create"
          onCancel={() => setOpenCreateModal(false)}
          onSuccess={async () => {
            setOpenCreateModal(false);
            await carregarProdutos();
          }}
        />
      </Modal>

      <Modal
        open={openEditModal}
        title={`Editar ${produtoSelecionado?.descricao ?? "Produto"}`}
        onClose={fecharModalEdicao}
      >
        {produtoSelecionado && (
          <ProdutoForm
            mode="edit"
            produto={produtoSelecionado}
            onCancel={fecharModalEdicao}
            onSuccess={async () => {
              fecharModalEdicao();
              await carregarProdutos();
            }}
          />
        )}
      </Modal>
    </>
  );
}