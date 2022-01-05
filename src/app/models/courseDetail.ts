import { Course } from "./course";

export interface CourseDetail extends Course {
    nivel: string;
    preco_original: number;
    preco_promocional: number;
    modulos: ICourseModule[];
}

export interface ICourseModule {
    nome: string;
    carga_horaria: string;
    conteudos: ICourseModuleContent[]
}

export interface ICourseModuleContent {
    descricao: string;
}