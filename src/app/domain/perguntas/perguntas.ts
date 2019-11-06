import { Alunos } from './../alunos/alunos';
import { Professores } from '../professores/professores';
import { Disciplinas} from '../disciplinas/disciplinas';
import { Cursos } from '../cursos/cursos';

export class Perguntas {
    id: number;
    questao: string;
    alternativa1: string;
    alternativa2: string;
    alternativa3: string;
    alternativa4: string;
    correta: string;
    nivel: number;
    assunto: string;
    reaplicacao: number;
    anoaplicado: number;
    iddisciplina: Disciplinas = new Disciplinas();
    idprofessor: Professores = new Professores();
    idcurso: Cursos = new Cursos();
    idaluno: Alunos = new Alunos()
}