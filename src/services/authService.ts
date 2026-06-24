import { api } from "./api";
import type { LoginResponse } from "../types/Auth";

export const authService = {
    login(email: string, senha: string) {
        return api.post<LoginResponse>("/login", {
            email, senha
        })
    },

    me() {
        return api.get("/");
    },

    logout() {
        localStorage.removeItem("token");
    },

    isAuthenticated() {
        return !!localStorage.getItem("token");
    }
}