import { Alunos } from '../alunos/alunos';

export class Recursos {
    id: number;
    tipoprova: string;
    professormateria: string;
    numeroquestao: number;
    fundamento: string;
    curso: string;
    solicitacao: string;
    data: Date;
    nome: string;
    idaluno: Alunos = new Alunos()
}