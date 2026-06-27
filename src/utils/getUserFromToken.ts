import { jwtDecode } from "jwt-decode";


export interface UserToken {
    id_usuario: number;
    nome: string;
    email: string;
    tipo_usuario: string;
    iat: number;
    exp: number;
}

export function getUserFromToken() {
    const token = localStorage.getItem("token");

    if(!token) {
        return null;
    }

    try {
        const user = jwtDecode<UserToken>(token);
        return user;
    } catch {
        localStorage.removeItem("token");
        return null;
    }
}