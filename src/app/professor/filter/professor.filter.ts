import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'professorFilter'})
export class ProfessorFilterPipe implements PipeTransform{
    transform(value: any[], term: string): any[]{
        return value.filter((x:any) => x.nome.toLowerCase().startsWith(term.toLowerCase()))
    }
}