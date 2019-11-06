import { Usuarios } from "../usuarios/usuarios";
import { Cursos } from "../cursos/cursos";

export class Alunos {
    id: number;
    raaluno: string;
    nome: string;
    acertos: number;
    idusuario: Usuarios = new Usuarios();
    idcurso: Cursos = new Cursos()
}