import { useEffect, useState } from "react";
import { fornecedorService } from "../services/fornecedorService";
import type { Fornecedor } from "../types/Fornecedor";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
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

    carregarFornecedores();
  }, []);

  if (loading) {
    return <h2>Carregando fornecedores...</h2>;
  }

  async function excluirFornecedor(id: number) {
    const confirmar = window.confirm(
        "Deseja realmente excluir este fornecedor?"
    );

    if (!confirmar) return;

    try {
        await fornecedorService.deletar(id);

        setFornecedores((fornecedoresAtuais) =>
        fornecedoresAtuais.filter(
            (fornecedor) => fornecedor.id_fornecedor !== id
        )
        );

        alert("Fornecedor excluído com sucesso!");
    } catch (error) {
  if (axios.isAxiosError(error)) {
    const mensagem = error.response?.data?.message;

    if (
      mensagem?.includes("fk_produto_fornecedor")
    ) {
      alert(
        "Este fornecedor possui produtos cadastrados e não pode ser excluído."
      );
      return;
    }
  }

  alert("Erro ao excluir fornecedor.");
}
    }

  return (
    <div>
      <h1>Fornecedores</h1>

      <table>
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
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id_fornecedor}>
              <td>{fornecedor.id_fornecedor}</td>
              <td>{fornecedor.marca}</td>
              <td>{fornecedor.representante}</td>
              <td>{fornecedor.contato}</td>
              <td>{fornecedor.email}</td>
              <td>
                <Link to={`/fornecedores/editar/${fornecedor.id_fornecedor}`}>
                    Editar
                </Link>

                <button onClick={() => excluirFornecedor(fornecedor.id_fornecedor)}>
                    Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}