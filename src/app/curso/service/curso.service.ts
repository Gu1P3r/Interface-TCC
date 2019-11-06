import { Cursos } from './../../domain/cursos/cursos';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class CursoService {

  private url: string = 'http://localhost:7765/cursos';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient, private router: Router) { }

  getCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.url + "/dados");
  }

  getCurso(id): Observable<Cursos> {
    return this.http.get<Cursos>(this.url + "/dados/" + id);
  }

  addCursos(curso) {
    return this.http.post(this.url + "/adicionar", JSON.stringify(curso), this.options);
  }

  updateCursos(curso) {
    return this.http.put(this.url + "/atualizar/" + curso.id, JSON.stringify(curso), this.options);
  }

  deleteCursos(id) {
    return this.http.delete(this.url + "/deletar/" + id);
  }
}