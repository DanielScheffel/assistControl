import { useEffect, useState } from "react";
import type { Usuario } from "../types/Usuario";
import { usuarioService } from "../services/usuarioService";


export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}