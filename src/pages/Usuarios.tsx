import { useEffect, useState } from "react";
import type { Usuario } from "../types/Usuario";
import { usuarioService } from "../services/usuarioService";
import { Link } from "react-router-dom";


export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

        async function excluirUsuario(id: number) {
            const confirmar = window.confirm(
                "Deseja realmente excluir este usuário?"
            );

            if(!confirmar) return;

            try {
                await usuarioService.deletar(id);

                setUsuarios((usuariosAtuais) => 
                    usuariosAtuais.filter(
                        (usuario) => usuario.id_usuario !== id
                    )
                )

                alert("Usuário excluído com sucesso!")
            } catch (error) {
                console.error(error);
                alert("Erro ao excluir usuário");
            }
        }

    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const response = await usuarioService.listar();
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao carregar usuários: ", error)
            } finally {
                setLoading(false);
            }
        }

        carregarUsuarios();
    }, []);

    if(loading) {
        return <h2>Carregando usuários....</h2>
    }

    return (
        <div>
            <h1>Usuários</h1>

            <table>
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
                    {usuarios.map((usuario) =>(
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.tipo_usuario}</td>
                            <td>{usuario.status}</td>
                            <td>
                                <Link to={`/usuarios/editar/${usuario.id_usuario}`}>
                                    Editar
                                </Link>

                                <button onClick={() => excluirUsuario(usuario.id_usuario)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}