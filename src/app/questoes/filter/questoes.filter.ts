import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'questoesFilter'})
export class QuestoesFilterPipe implements PipeTransform{
    transform(value: any[], term: string): any[]{
        return value.filter((x:any) => x.assunto.toLowerCase().startsWith(term.toLowerCase()))
    }
}