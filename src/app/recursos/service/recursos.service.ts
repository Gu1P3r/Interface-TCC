import { Recursos } from '../../domain/recursos/recursos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class RecursosService {

  private url: string = 'http://localhost:7765/recursos';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient, private router: Router) { }

  getRecursos(): Observable<Recursos[]> {
    return this.http.get<Recursos[]>(this.url + "/dados");
  }

  getRecurso(id): Observable<Recursos> {
    return this.http.get<Recursos>(this.url + "/dados/" + id);
  }

  addRecursos(recurso) {
    return this.http.post(this.url + "/adicionar", JSON.stringify(recurso), this.options);
  }

  updateRecursos(recurso) {
    return this.http.put(this.url + "/atualizar/" + recurso.id, JSON.stringify(recurso), this.options);
  }

  deleteRecursos(id) {
    return this.http.delete(this.url + "/deletar/" + id);
  }


}