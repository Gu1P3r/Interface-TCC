import { Professores } from '../professores/professores';

export class Noticias {
    id: number;
    noticias: string;
    idprofessor: Professores = new Professores();
}