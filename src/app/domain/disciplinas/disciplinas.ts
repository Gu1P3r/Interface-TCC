import { Cursos } from '../cursos/cursos';
import { Professores } from '../professores/professores';


export class Disciplinas {
    id: number;
    nome: string;
    idcurso: Cursos = new Cursos();
    idprofessor: Professores = new Professores()
}