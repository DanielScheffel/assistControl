export interface Produto {
    id_produto: number;
    sku: string;
    descricao: string;
    valor_produto: string;
    codigo_gtin_ean?: string | null;

    id_categoria_produto: number;
    categoria: string;

    fornecedor_id: number;
    marca: string;
    representante: string;
}