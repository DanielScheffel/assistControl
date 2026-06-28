import { useEffect, useState } from "react";
import type { Usuario } from "../../types/Usuario";
import { usuarioService } from "../../services/usuarioService";
import { Link } from "react-router-dom";
import {
  ActionButton,
  ActionLink,
  Actions,
  Search,
  StatusBadge,
  Toolbar,
} from "./styles";
import { Button } from "../../components/ui/Button";
import { Table } from "../../components/ui/Table";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/common/Modal";
import { UsuarioForm } from "../../components/common/forms/UsuarioForm";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termo = search.toLowerCase();

    return (
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.email.toLowerCase().includes(termo) ||
      usuario.tipo_usuario.toLowerCase().includes(termo) ||
      usuario.status.toLowerCase().includes(termo)
    );
  });

  async function excluirUsuario(id: number) {
    const confirmar = window.confirm("Deseja realmente excluir este usuário?");

    if (!confirmar) return;

    try {
      await usuarioService.deletar(id);

      setUsuarios((usuariosAtuais) =>
        usuariosAtuais.filter((usuario) => usuario.id_usuario !== id),
      );

      alert("Usuário excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir usuário");
    }
  }

  async function alterarStatus(id: number, statusAtual: string) {
    const novoStatus = statusAtual === "Ativo" ? "Inativo" : "Ativo";

    try {
      await usuarioService.alterarStatus(id, novoStatus);

      setUsuarios((usuariosAtuais) =>
        usuariosAtuais.map((usuario) =>
          usuario.id_usuario === id
            ? { ...usuario, status: novoStatus }
            : usuario,
        ),
      );

      alert("Status atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar status.");
    }
  }

    async function carregarUsuarios() {
      try {
        const response = await usuarioService.listar();
        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    void carregarUsuarios();
  }, []);

  if (loading) {
    return <h2>Carregando usuários....</h2>;
  }

  return (
    <>
      <PageHeader
        title="Usuários"
        subtitle="Gerencie os usuários cadastrados no sistema."
      >
        {/* <Link to="/usuarios/novo"> */}
        <Button fullWidth={false} onClick={() => setOpenModal(true)}>
          Novo usuário
        </Button>
        {/* </Link> */}
      </PageHeader>

      <Toolbar>
        <Search>
          <Input
            placeholder="Pesquisar por nome, email, tipo ou status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.tipo_usuario}</td>
              <td>
                <StatusBadge status={usuario.status}>
                  {usuario.status}
                </StatusBadge>
              </td>
              <td>
                <Actions>
                  <ActionLink
                    as={Link}
                    to={`/usuarios/editar/${usuario.id_usuario}`}
                  >
                    Editar
                  </ActionLink>

                  <ActionButton
                    onClick={() => excluirUsuario(usuario.id_usuario)}
                  >
                    Excluir
                  </ActionButton>

                  <ActionButton
                    onClick={() =>
                      alterarStatus(usuario.id_usuario, usuario.status)
                    }
                  >
                    {usuario.status === "Ativo" ? "Inativar" : "Ativar"}
                  </ActionButton>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        open={openModal}
        title="Novo Usuário"
        onClose={() => setOpenModal(false)}
      >
        <UsuarioForm
          onCancel={() => setOpenModal(false)}
          onSuccess={async () => {
            setOpenModal(false);

            await carregarUsuarios();
          }}
        />
      </Modal>
    </>
  );
}
