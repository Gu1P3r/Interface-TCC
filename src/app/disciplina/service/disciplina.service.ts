import { Disciplinas } from '../../domain/disciplinas/disciplinas';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class DisciplinaService {

  private url: string = 'http://localhost:7765/disciplinas';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient, private router: Router) { }

  getDisciplinas(): Observable<Disciplinas[]> {
    return this.http.get<Disciplinas[]>(this.url + "/dados");
  }

  getDisciplina(id): Observable<Disciplinas> {
    return this.http.get<Disciplinas>(this.url + "/dados/" + id);
  }

  addDisciplinas(disciplina) {
    return this.http.post(this.url + "/adicionar", JSON.stringify(disciplina), this.options);
  }

  updateDisciplinas(disciplina) {
    return this.http.put(this.url + "/atualizar/" + disciplina.id, JSON.stringify(disciplina), this.options);
  }

  deleteDisciplinas(id) {
    return this.http.delete(this.url + "/deletar/" + id);
  }
  
}
