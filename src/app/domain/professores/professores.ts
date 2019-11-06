import { Usuarios } from "../usuarios/usuarios";

export class Professores {
    id: number;
    nome: string;
    grandearea: string;
    idusuario: Usuarios = new Usuarios()
}