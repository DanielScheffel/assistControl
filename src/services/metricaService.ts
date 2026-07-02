import { api } from "./api";

export const metricaService = {
  total() {
    return api.get("/metricas/total");
  },

  status() {
    return api.get("/metricas/status");
  },

  lojas() {
    return api.get("/metricas/lojas");
  },

  fornecedores() {
    return api.get("/metricas/fornecedores");
  },

  tempoMedio() {
    return api.get("/metricas/tempo-medio");
  },

  valorParado() {
    return api.get("/metricas/valor-parado");
  },
};