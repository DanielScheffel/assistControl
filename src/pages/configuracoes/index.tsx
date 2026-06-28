import {
  Container,
  Card,
  Title,
  Description,
  CategoryList,
  CategoryItem,
  AddCategory,
} from "./styles";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useEffect, useState } from "react";
import type { Categoria } from "../../types/Categoria";
import { categoriaService } from "../../services/categoriaService";

export default function Configuracoes() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  async function carregarCategorias() {
    try {
      const response = await categoriaService.listar();
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function adicionarCategoria(e: React.FormEvent) {
    e.preventDefault();

    if(!novaCategoria.trim()) {
      return;
    }

    try {
      await categoriaService.cadastrar({
        categoria: novaCategoria,
      });

      setNovaCategoria("");

      await carregarCategorias();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar categoria.")
    }
  }

  async function excluirCategoria(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta categoria?"
    );

    if(!confirmar) return;

    try {
      await categoriaService.deletar(id);

      setCategorias((categoriasAtuais) => 
        categoriasAtuais.filter(
          (categoria) =>
            categoria.id_categoria_produto !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir categoria.")
    }
  }

  useEffect(() => {
    void carregarCategorias();
  }, []);

  if(loading) {
    <p>Carregando....</p>
  }

  return (
    <Container>
      <Card>
        <Title>Gerenciar Categorias</Title>

        <Description>
          Cadastre e organize as categorias dos produtos.
        </Description>

        <CategoryList>
          {categorias.map((categoria) => (
            <CategoryItem key={categoria.id_categoria_produto}>
              <span>{categoria.categoria}</span>

              <Button
                variant="secondary"
                fullWidth={false}
                onClick={() =>
                  excluirCategoria(categoria.id_categoria_produto)
                }
              >
                Remover
              </Button>
            </CategoryItem>
          ))}
        </CategoryList>

        <form onSubmit={adicionarCategoria}>
          <AddCategory>
            <Input
              placeholder="Nova categoria..."
              value={novaCategoria}
              onChange={(e) =>
                setNovaCategoria(e.target.value)
              }
            />

            <Button type="submit" fullWidth={false}>
              Adicionar
            </Button>
          </AddCategory>
        </form>
      </Card>
    </Container>
  );
}
