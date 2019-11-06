import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'disciplinaFilter'})
export class DisciplinaFilterPipe implements PipeTransform{
    transform(value: any[], term: string): any[]{
        return value.filter((x:any) => x.nome.toLowerCase().startsWith(term.toLowerCase()))
    }
}