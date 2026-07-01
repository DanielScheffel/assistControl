export interface Assistencia {
  id_assistencia: number;
  codigo_interno: string | null;
  defeito: string;
  numero_peca: string;
  descricao_peca: string;
  data_solicitada: string;
  data_finalizada: string | null;
  loja_nome: string;
  sku: string;
  produto: string;
  status: string;
}