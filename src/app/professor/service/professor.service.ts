import { Observable } from 'rxjs';
import { Professores } from '../../domain/professores/professores';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';;
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class ProfessorService {

  private url: string = 'http://localhost:7765/professores';

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient, private router: Router) { }


  getProfessores(): Observable<Professores[]> {
    return this.http.get<Professores[]>(this.url + "/dados");
  }

  getProfessor(id): Observable<Professores> {
    return this.http.get<Professores>(this.url + "/dados/" + id);
  }

  addProfessores(professor) {
    return this.http.post(this.url + "/adicionar", JSON.stringify(professor), this.options);
  }

  updateProfessores(professor) {
    return this.http.put(this.url + "/atualizar/" + professor.id, JSON.stringify(professor), this.options);
  }

  deleteProfessores(id) {
    return this.http.delete(this.url + "/deletar/" + id);
  }
}
