import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'usuarioFilter'})
export class UsuarioFilterPipe implements PipeTransform{
    transform(value: any[], term: string): any[]{
        return value.filter((x:any) => x.email.toLowerCase().startsWith(term.toLowerCase()))
    }
}