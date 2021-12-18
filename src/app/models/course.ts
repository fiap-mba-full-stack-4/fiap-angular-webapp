export interface Course {
    id: number;
    nome: string;
    descricao: string;
    porc_desconto?: number;
    url_imagem?: string;
}